import xs from 'xstream'

import
{ StateSink
, StateReducer
} from './types'

type ToState = (navState$: StateSink) => StateSink
const toState: ToState =
  (navState$) => {
    const init$ =
      xs.of <StateReducer>
         ( (prev) => (
             { title: 'Uroborosjs starter project'
             , ...prev
             , nav:
               { activeRoute: 'home'
               }
             }
           )
         )

    return (
      xs.merge
         ( init$
         , navState$
         )
    )
  }

export
{ toState
}
