import { StateSink, StateReducer } from './types'
import xs from 'xstream'

type ToState = () => StateSink
const toState: ToState =
  () => {
    const init$ =
      xs.of <StateReducer>
         ( (prev) => (
             { ...prev
             , title: 'Hi this is the Uroborosjs starter project: Browser'
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
