import xs, { Stream } from 'xstream'
import
{ Reducer
} from '@cycle/state'

import
{ StateSink
} from 'types'
import
{ State
, Open$
, Close$
} from './intent'

type Actions =
  Open$
  & Close$

type ToState = (actions: Actions) => Stream<Reducer<State>>
const toState: ToState =
  ({ open$, close$ }) => {
    const init$ =
      xs.of <Reducer<State>>
         ( (prev) => (
             { open: false
             , ...prev
             }
           )
         )

    const openend$  =
      open$
        .mapTo <Reducer<State>>
         ( (prev) => (
             { ...prev
             , open: true
             }
           )
         )

    const closed$ =
      close$
        .mapTo <Reducer<State>>
         ( (prev) => (
             { ...prev
             , open: false
             }
           )
         )

    const reducers$ =
      xs.merge <Reducer<State>>
         ( init$
         , openend$
         , closed$
         )

    return reducers$
  }

export
{ toState
}
