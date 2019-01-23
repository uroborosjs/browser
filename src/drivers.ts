import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { keys } from 'rambda'

const baseDrivers =
  { DOM: makeDOMDriver('#app')
  , HTTP: makeHTTPDriver()
  }

const extendedDrivers =
  {
  }

const drivers =
  { ...baseDrivers
  , ...extendedDrivers
  }

const driverNames =
  [ ...keys(drivers)
  , 'state'
  , 'router'
  ]

export
  { drivers
  , driverNames

  }
