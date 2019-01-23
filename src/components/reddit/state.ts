import xs from 'xstream'

import
{ path
, pick
, tail
, map
} from 'rambda'

import
{ StateSink
, StateReducer
, HTTPSource
, State
, Cat
} from './types'

type ToState =
  ( HTTP: HTTPSource
  , navState$: StateSink
  , catListState$: StateSink
  ) => StateSink
const toState: ToState =
  ( HTTP
  , navState$
  , catListState$
  ) => {
    const init$ =
      xs.of <StateReducer>
         ( (prev) => (
             { title: 'Uroborosjs starter project'
             , catList:
               [ { title: 'title'
                 , url: 'https://i.redd.it/jk3fe52e6sb21.jpg'
                 , thumbnail: 'https://b.thumbs.redditmedia.com/RVlY8b6iP9Leep89KAgfZXUvTDmSnVXLeHLZ61EJo6c.jpg'
                 }
               ]
             , ...prev
             , nav:
               { activeRoute: 'reddit'
               }
             }
           )
         )

    const cats$ =
      HTTP
        .select('cats')
        .flatten()
        .map(path('body.data.children'))
        .map(tail)
        .map(map(path('data')))
        .map(map(pick('title,thumbnail,url')))
        .debug('well?')
        .map <StateReducer>
         ( (cats: Cat[]) =>
             (prev: State) => (
               { ...prev
               , catList: cats
               }
             )
         )

    return (
      xs.merge
         ( init$
         , cats$
         , navState$
         , catListState$
         )
    )
  }

export
{ toState
}
