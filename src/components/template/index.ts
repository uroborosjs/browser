import
{ State
, Component
} from './types'

import { toDOM } from './dom'
import { toState } from './state'

const Home: Component =
  ({ state }) => {
    const dom$ = toDOM(state.stream)
    const state$ = toState()

    return (
      { DOM: dom$
      , state: state$
      }
    )
  }

export
{ State
, Home
}
