import xs, { Stream } from 'xstream'
import
{ DOMSource
, StateSource
} from 'types'

type State =
  { title?: string
  , thumbnail?: string
  , url?: string
  , open?: boolean
  }

type Sources =
  DOMSource
  & StateSource<State>

type State$ = Record<'state$', Stream<State>>
type Open$ = Record<'open$', Stream<null>>
type Close$ = Record<'close$', Stream<null>>

type Actions =
  State$
  & Open$
  & Close$

type Intent =
  (sources: Sources) => Actions
const intent: Intent =
  ( { DOM
    , state
    }
  ) => {
    const state$ = state.stream

    const open$ =
      DOM
        .select('div[data-open]')
        .events('click')
        .mapTo(null)

    const close$ =
      DOM
        .select('div[data-close]')
        .events('click')
        .mapTo(null)

    return (
      { state$
      , open$
      , close$
      }
    )
  }

export
{ Sources
, State$
, Open$
, Close$
, State
, intent
}
