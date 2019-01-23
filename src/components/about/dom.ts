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

type WrapContent = (vNode: VNode) => VNode
const wrapContent: WrapContent = (vNode) => div(`.${styles.wrapperContent}`, vNode)

type ViewArg =
  [ State
  , VNode
  ]
type View = (viewArg: ViewArg) => VNode
const view: View =
  ( [ {}
    , nav
    ]
  ) =>
    div
    ( `.${styles.wrapper}`
    , map
      ( wrapContent
      , [ nav
        , div('Fill in with some usefull information about using this starter "flavor."')
        ]
      )
    )

type ToDOM = (state$: State$, nav$: DOMSink) => DOMSink
const toDOM: ToDOM =
  ( state$, nav$ ) =>
    xs.combine(state$, nav$)
      .map(view)

export
{ toDOM
}
