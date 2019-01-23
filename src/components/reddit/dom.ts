import xs from 'xstream'
import
{ div
, svg
} from '@cycle/dom' 
import logoSvg from 'assets/uroboros-logo.svg'

import
{ map
, values
} from 'rambda'

import
{ State$
, State
, DOMSink
, VNode
} from './types'

import { styles } from './styles'

type WrapContent = (vNode: VNode) => VNode
const wrapContent: WrapContent = (vNode) => div(`.${styles.wrapperContent}`, vNode)

type ViewArg =
  [ State
  , VNode
  , VNode[]
  ]
type View = (viewArg: ViewArg) => VNode
const view: View =
  ( [ {}
    , nav
    , catList
    ]
  ) =>
    div
    ( `.${styles.wrapper}`
    , map
      ( wrapContent
      , [ nav
        , div(`.${styles.catList}`, catList)
        ]
      )
    )

type ToDOM =
  ( state$: State$
  , nav$: DOMSink
  , catList$: DOMSink
  ) => DOMSink
const toDOM: ToDOM =
  ( state$, nav$, catList$ ) =>
    xs.combine(state$, nav$.debug('nav?'), catList$ )
      .map(view)

export
{ toDOM
}
