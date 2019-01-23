import { div } from '@cycle/dom' 
import logoSvg from '../../assets/uroboros-logo'
// import * as logoSvg from ''
// import { routeMatcher } from ''

import
{ State$
, State
, DOMSink
, VNode
} from './types'

import { styles } from './styles'

console.log(logoSvg)

type View = (state: State) => VNode
const view: View =
  ({ title }) =>
    div
    ( `.${styles.wrapper}`
    , [ div(title)
      , div(`.${styles.logo}`, { props: { innerHTML: logoSvg } })
      ]
    )

type ToDOM = (state$: State$) => DOMSink
const toDOM: ToDOM =
  ( state$ ) =>
    state$.map(view)

export
{ toDOM
}
