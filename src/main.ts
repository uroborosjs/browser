import { extractSinks } from 'cyclejs-utils'
import { Component } from './types'

import { routes } from './routes'
import { driverNames } from './drivers'

const Main : Component =
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
