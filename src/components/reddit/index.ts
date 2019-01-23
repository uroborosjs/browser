import isolate from '@cycle/isolate'
import { makeCollection } from '@cycle/state';
import { div } from '@cycle/dom'

import
{ State
, Component
} from './types'

import { toDOM } from './dom'
import { toState } from './state'
import { styles } from './styles'
import { toHTTP } from './http'

import { mainNav } from 'components/main-nav'
import { RedditItem } from 'components/reddit-item'

const Reddit: Component =
  ({ DOM, state, HTTP }) => {
    const nav =
      isolate
      ( mainNav
      , 'nav'
      )
      ({ DOM, state })

    const redditListComponent =
      makeCollection
      ( { item: RedditItem
        , itemKey: (childState, index) => String(index)
        , itemScope: (key) => key
        , collectSinks:
            (instances) => (
              { DOM: instances
                       .pickCombine('DOM')
                       .map((cats) => div(`.${styles.catList}`, cats))
              , state: instances.pickMerge('state')
              }
            )
        }
      )

    const redditList =
      isolate
      ( redditListComponent
      , 'catList'
      )
      ({ DOM, state })

    const dom$ =
      toDOM
      ( state.stream
      , nav.DOM
      , redditList.DOM
      )

    const state$ =
      toState
      ( HTTP
      , nav.state
      , redditList.state
      )

    const http$ =
      toHTTP()

    return (
      { DOM: dom$
      , state: state$
      , HTTP: http$
      , router: nav.router
      }
    )
  }

export
{ State
, Reddit
}
