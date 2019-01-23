import isolate from '@cycle/isolate'

import
{ State
, Component
} from './types'

import { toDOM } from './dom'
import { toState } from './state'

import { mainNav } from 'components/main-nav'

const RedditItem: Component =
  ({ DOM, state }) => {
    const nav =
      isolate
      ( mainNav
      , 'nav'
      )({ DOM, state })

    const dom$ =
      toDOM
      ( state.stream
      )
    const state$ =
      toState(DOM)

    return (
      { DOM: dom$
      , state: state$
      , router: nav.router
      }
    )
  }

export
{ State
, RedditItem
}
