import xs from 'xstream'
import
{ div
, svg
} from '@cycle/dom' 
import logoSvg from 'assets/uroboros-logo.svg'

import { map } from 'rambda'

import
{ State$
, State
, DOMSink
, VNode
} from './types'

import { styles } from './styles'

type View = (state: State) => VNode
const view: View =
  ( { title
    , thumbnail
    , url
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
        , div
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

type ToDOM = (state$: State$) => DOMSink
const toDOM: ToDOM =
  ( state$ ) =>
    state$
      .map(view)

export
{ toDOM
}
