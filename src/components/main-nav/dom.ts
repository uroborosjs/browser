import
{ div
} from '@cycle/dom' 

import
{ State$
, State
, DOMSink
, VNode
} from './types'

import { styles } from './styles'

type View = (state: State) => VNode
const view: View =
  ({ activeRoute }) =>
    div
    ( `.${styles.wrapper}`
    , [ div
        ( { dataset:
            { nav: activeRoute !== 'home'
            , to: '/home'
            }
          , class:
            { [styles.navItem]: true
            , [styles.navItemHover]: activeRoute !== 'home'
            , [styles.active]: activeRoute === 'home'
            }
          }
        , 'home'
        )
      , div
        ( { dataset:
            { nav: activeRoute !== 'about'
            , to: '/about'
            }
          , class:
            { [styles.navItem]: true
            , [styles.navItemHover]: activeRoute !== 'about'
            , [styles.active]: activeRoute === 'about'
            }
          }
        , 'about'
        )
        , div
        ( { dataset:
            { nav: activeRoute !== 'reddit'
            , to: '/reddit'
            }
            , class:
            { [styles.navItem]: true
            , [styles.navItemHover]: activeRoute !== 'reddit'
            , [styles.active]: activeRoute === 'reddit'
            }
          }
        , 'reddit'
        )
      ]
    )


type ToDOM = (state$: State$) => DOMSink
const toDOM: ToDOM =
  (state$) =>
    state$
      .map(view)

export
{ toDOM
}
