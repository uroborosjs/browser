import
{ filter
, split
} from 'rambda'

type Param = string
type Value = (...params: Param[]) => any
type Step = string
type Path = string

type Route =
  { '/'?: Value
  , '*'?: Value
  , $nest?:
    { '**'?: Route
    , [step: string]: Route
    }
  } | undefined
type Routes = Exclude<Route, undefined>

type TakeNextStep = (step: Step, route: Route) => [ Route, Param | undefined ]
const takeNextStep: TakeNextStep =
  ( step
  , route
  ) =>
    [ typeof step === 'string'
      && typeof route === 'object'
      && typeof route.$nest === 'object'
        ? route.$nest[step] || route.$nest['**']
        : undefined
    , typeof step === 'string'
      && typeof route === 'object'
      && typeof route.$nest === 'object'
      && typeof route.$nest[step] === 'undefined'
      && typeof route.$nest['**'] === 'object'
        ? step
        : undefined
    ]

type Walk =
  ( steps: Step[]
  , route: Route
  , params?: Param[]
  , value?: Value
  ) => (...args: any) => Value
const walk: Walk =
  ( [ nextStep, ...restSteps ]
  , route
  , params = []
  , value = () => null
  ) => {
    if ( route === undefined ) {
      return value(...params)
    } else if (nextStep === undefined) {
      const bestRoute = route['/'] || route['*'] || value
      return bestRoute(...params)
    } else {
      const [ nextRoute, param ] = takeNextStep(nextStep, route)
      return walk
             ( restSteps
             , nextRoute
             , param !== undefined ? [ ...params, param ] : params
             , route['*'] || value
             )
    }
  }

type RouteMatcher =
  (path: Path, route: Routes) =>
    { path: Path
    , value: Value
    }

const notEmpty =
  (val: string) => val !== ''

const routeMatcher: RouteMatcher =
  (path: Path, routes: Routes) => {
    const routeList = filter(notEmpty, split('/', path))
    const value = walk(routeList, routes)

    return (
      { value: value
      , path: path
      }
    )
  }

export
{ Routes
, routeMatcher
}
