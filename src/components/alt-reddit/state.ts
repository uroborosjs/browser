import xs, { Stream } from 'xstream'
import { Reducer } from '@cycle/state'
import
{ State as NavState
} from 'components/main-nav'
import
{ State as CatListState
} from 'components/main-nav'

import
{ path
, pick
, tail
, map
} from 'rambda'

import
{ State
, Cats$
} from './intent'

// type NavState$ = Record<'navState$', Stream<Reducer<NavState>>>
// type CatListState$ = Record<'catListState$', Stream<Reducer<CatListState>>>

type ComponentNames =
  'nav$'
  | 'redditList$'
type Components = Record<ComponentNames, Stream<Reducer<any>>>
type Sources =
  Cats$
  & Components

type ToState = ( sources: Sources ) => Stream<Reducer<State>>
const toState: ToState =
  ( { cats$
    , nav$
    , redditList$
    }
  ) => {
    const init$ =
      xs.of <Reducer<State>>
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

    const catList$ =
      cats$
        .map <Reducer<State>>
         ( (cats) =>
             (prev: State) => (
               { ...prev
               , catList: cats
               }
             )
         )

    const reducers$ =
      xs.merge <Reducer<any>>
         ( init$
         , catList$
         , nav$
         , redditList$
         )

    return reducers$
  }

export
{ toState
}
