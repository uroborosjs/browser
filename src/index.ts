import { run } from '@cycle/run'
import { withState } from '@cycle/state'
import { makeHistoryDriver } from '@cycle/history'
import { routerify } from 'cyclic-router'
import
{ setupPage
, normalize
} from 'csstips'

import { Main } from './main'
import { drivers } from './drivers'
import { routeMatcher } from './utils/route-matcher'

const ComposedMain = routerify(withState(Main), routeMatcher)

if (process.env.NODE_ENV === 'production') {
  setupPage('#app')
  normalize()

  run
  ( ComposedMain
  , { ...drivers
    , history: makeHistoryDriver()
    }
  )
}  else {
  type ModuleHot = NodeModule & { hot?: any }

  const hmr:ModuleHot = module
  let dispose =
    run
    ( ComposedMain
    , { ...drivers
      , history: makeHistoryDriver()
      }
    )

  if (document.head.getElementsByTagName('style').length === 0) {
    setupPage('#app')
    normalize()
  }

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
