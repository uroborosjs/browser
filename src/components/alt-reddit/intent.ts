import xs, { Stream, MemoryStream } from 'xstream'
import
{ path
, tail
, map
, pick
} from 'rambda'
import
{ DOMSource
, HTTPSource
, StateSource
} from 'types'

type Cat =
  { title: string
  , thumbnail: string
  , url: string
  }

type State =
  { catList: Cat[]
  }
  | undefined

type Sources =
  DOMSource
  & { HTTP: any }
  // & HTTPSource
  & StateSource<State>

type State$ = Record<'state$', Stream<State>>
type Cats$ = Record<'cats$', Stream<Cat[]>>

type Actions =
  State$
  & Cats$

type Intent = (sources: Sources) => Actions
const intent: Intent =
  ( { DOM
    , HTTP
    , state
    }
  ) => {
    const state$ = state.stream

    const cats$: any =
      HTTP
        .select('cats')
        // .debug('1')
        .flatten()
        // .debug('2')
        // .remember()
        .map(path('body.data.children'))
        .map(tail)
        .map(map(path('data')))
        .map(map(pick('title,thumbnail,url')))

    return (
      { state$
      , cats$
      }
    )
  }

export
{ Sources
, Cats$
, State$
, State
, intent
}
