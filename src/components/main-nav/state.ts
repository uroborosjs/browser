import { StateSink, StateReducer } from './types'
import xs from 'xstream'

type ToState = () => StateSink
const toState: ToState =
  () => {
    const init$ =
      xs.of <StateReducer>
         ( (prev) => (
             { activeRoute: ''
             , ...prev
             }
           )
         )

    return (
      xs.merge
         ( init$
         )
    )
  }

export
{ toState
}
