import { extractSinks } from 'cyclejs-utils'
import
{ DOMSource
, HTTPSource
, RouterSource
, StateSource
, MaybeDOMSink
, MaybeHTTPSink
, MaybeRouterSink
, MaybeStateSink
, Component
} from './types'

import { routes } from './routes'
import { driverNames } from './drivers'

type Sources =
  DOMSource
  & HTTPSource
  & RouterSource
  & StateSource<any>

type Sinks =
  MaybeDOMSink
  & MaybeHTTPSink
  & MaybeRouterSink
  & MaybeStateSink<any>

const Main: Component<Sources, Sinks> =
  (sources) => {
    const routedComponentSinks$ =
      sources
        .router
        .routedComponent (routes) (sources)


    return (
      { ...extractSinks
           ( routedComponentSinks$
           , driverNames
           )
      }
    )
  }

export
  { Main
  }
