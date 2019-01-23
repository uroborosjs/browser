import
{ State
, Component
} from './types'

import { toDOM } from './dom'
import { toState } from './state'
import { toRouter } from './router'

import xs from 'xstream'

const mainNav: Component =
  ({ DOM, state }) => {
    const dom$ = toDOM(state.stream)
    const state$ = toState()
    const router$ = toRouter(DOM)

    return (
      { DOM: dom$
      , state: state$
      , router: router$
      }
    )
  }

export
{ State
, mainNav
}
