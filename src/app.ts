import { run } from '@cycle/run'
import { withState } from '@cycle/state'
import { makeHistoryDriver } from '@cycle/history'
import { routerify } from 'cyclic-router'
import { setStylesTarget } from 'typestyle'

import { Main } from './main'
import { drivers } from './drivers'
import { routeMatcher } from './utils/route-matcher'

const ComposedMain = routerify(withState(<any>Main), routeMatcher)

if (process.env.NODE_ENV === 'production') {
  setStylesTarget(<Element>document.getElementById('typestyle'))

  run
  ( ComposedMain
  , { ...drivers
    , history: makeHistoryDriver()
    }
  )
}  else {
  type ModuleHot = NodeModule & { hot?: any }

  const hmr: ModuleHot = module
  let dispose =
    run
    ( ComposedMain
    , { ...drivers
      , history: makeHistoryDriver()
      }
    )

  setStylesTarget(<Element>document.getElementById('typestyle'))

  if (hmr.hot) {
    hmr
      .hot
      .dispose
       ( () => {
           dispose()
         }
       )
  }
}
