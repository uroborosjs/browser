import xs, { Stream } from 'xstream'
import
{ VNode
, div
} from '@cycle/dom' 

import
{ map
} from 'rambda'

import
{ State$
, State
} from './intent'

import { styles } from './styles'

type WrapContent = (vNode: VNode) => VNode
const wrapContent: WrapContent = (vNode) => div(`.${styles.wrapperContent}`, vNode)

type ViewArg =
  [ State
  , VNode
  , VNode
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

type ComponentNames =
  'nav$'
  | 'catList$'
type Components = Record<ComponentNames, Stream<VNode>>
type Sources =
  State$
  & Components
type ToDOM = ( sources: Sources) => Stream<VNode>
const toDOM: ToDOM =
  ({ state$, nav$, catList$ }) =>
    xs.combine(state$, nav$.debug('nav?'), catList$ )
      .map(view)

export
{ toDOM
}
