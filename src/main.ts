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

import { cssRaw, cssRule } from 'typestyle'
import sanitize from 'sanitize.css/sanitize.css'
// remove
import { Home } from 'components/home'
import { About } from 'components/about'
import { Reddit } from 'components/alt-reddit'

import xs from 'xstream'
//

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

// console.log(sanitize)
cssRaw(sanitize)

const Main: Component<Sources, Sinks> =
  (sources) => {
    const routedComponentSinks$ =
      sources
        .router
        .routedComponent (routes) (sources)
    // const routedComponentSinks$ =
    //   <any>Reddit (sources)
      // routes.$nest['/home'] !== undefined
      //   ? routes.$nest['/home'] (sources)
      //   : (sources) => {}
    // console.log(routedComponentSinks$)


    return (
      // { ...routedComponentSinks$
      // }
      { ssr: xs.periodic(2000).drop(1).take(1)
      // , ...routedComponentSinks$

      , ...extractSinks
           ( routedComponentSinks$
           , driverNames
           )
      }
    )
  }

export
  { Main
  }
