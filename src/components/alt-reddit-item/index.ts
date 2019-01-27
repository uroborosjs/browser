import isolate from '@cycle/isolate'

import
{ DOMSink
, StateSink
, Component
} from 'types'

import
{ Sources
, State
, intent
} from './intent' 
import { toDOM } from './dom'
import { toState } from './state'

type Sinks =
  DOMSink
  & StateSink<State>

const RedditItem: Component<Sources, Sinks> =
  ({DOM, state }) => {
    const { state$
          , open$
          , close$
          } = intent({ DOM, state })

    const domSink$ =
      toDOM(state$)

    const stateSink$ =
      toState
      ( { open$
        , close$
        }
      )

    return (
      { DOM: domSink$
      , state: stateSink$
      }
    )
  }

export
{ State
, RedditItem
}
