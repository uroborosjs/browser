import xs from 'xstream'
import
{ div
, svg
} from '@cycle/dom' 
import logoSvg from 'assets/logo.svg'
// const logoSvg = ''

import { map } from 'rambda'

import
{ State$
, State
, DOMSink
, VNode
} from './types'

import { styles } from './styles'

// const logo =
//   () =>
//     svg
//     ( `.${styles.logo}`
//     , { props: { innerHTML: logoSvg } }
//     )

const wrapSvgLogo =
  (svgString: string) =>
    svg
    ( `.${styles.logo}`
    , { key: 'logo', props: { innerHTML: svgString } }
    )

type WrapContent = (vNode: VNode) => VNode
const wrapContent: WrapContent = (vNode) => div(`.${styles.wrapperContent}`, vNode)

type ViewArg =
  [ State
  , VNode
  ]
type View = (viewArg: ViewArg) => VNode
const view: View =
  ( [ { title }
    , nav
    ]
  ) =>
    div
    ( `.${styles.wrapper}`
    , map
      ( wrapContent
      , [ wrapSvgLogo(logoSvg)
        , div(`.${styles.title}`, title)
        , nav
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
