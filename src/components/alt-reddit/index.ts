import isolate from '@cycle/isolate'
import { makeCollection } from '@cycle/state';
import { div } from '@cycle/dom'

import xs from 'xstream'

import
{ Component
, HTTPSink
, DOMSink
, StateSink
, RouterSink
} from 'types'
import
{ Sources
, State
, intent
} from './intent'
import { toDOM } from './dom'
import { toState } from './state'
import { styles } from './styles'
import { toHTTP } from './http'

import { mainNav } from 'components/main-nav'
// import { RedditItem } from 'components/reddit-item'
import { RedditItem } from 'components/alt-reddit-item'

type Sinks =
  DOMSink
  & HTTPSink
  & RouterSink
  & StateSink<State>

const Reddit: Component<Sources, Sinks> =
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

    const { state$
          , cats$
          } = intent({DOM, HTTP, state})

    const domSink$ =
      toDOM
      ( { state$
        , nav$: nav.DOM
        , catList$: redditList.DOM
        }
      )

    const stateSink$ =
      toState
      ( { cats$
        , nav$: nav.state
        , redditList$: redditList.state
        }
      )

    const httpSink$ =
      toHTTP()

    return (
      { DOM: domSink$
      , state: stateSink$
      , HTTP: httpSink$
      , router: nav.router
      , ssr: xs.periodic(10000).mapTo(null).debug('ssr').drop(1).take(1)
      }
    )
  }

export
{ State
, Reddit
}
