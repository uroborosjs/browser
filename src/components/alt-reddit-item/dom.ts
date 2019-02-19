import xs, { Stream } from 'xstream'
import
{ VNode
, div
, svg
} from '@cycle/dom' 

import
{ State
, State$
} from './intent'
import { map } from 'rambda'

import { styles } from './styles'

type View = (state: State) => VNode
const view: View =
  ( { title
    , thumbnail = ''
    , url = ''
    , open
    }
  ) =>
    div
    ( `.${styles.wrapper}`
    , [ div(`.${styles.title}`, title)
      , div
        ( { dataset:
            { open: true
            }
          , class:
            { [styles.makeThumbnail(thumbnail)]: true
            }
          }
        )
      , div
        ( { class:
            { [styles.makeBigCat(url)]: true
            , [styles.hidden]: !open
            }
          }
        , <any>div
          ( { dataset:
              { close: true
              }
            , class:
              { [styles.cross]: true
              }
            }
          , 'X'
          )
        )
      ]
    )

type ToDOM = (state$: Stream<State>) => Stream<VNode>
const toDOM: ToDOM =
  ( state$ ) =>
    state$
      .map(view)

export
{ toDOM
}
