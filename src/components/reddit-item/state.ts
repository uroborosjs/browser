import xs from 'xstream'

import
{ StateSink
, StateReducer
, DOMSource
} from './types'

type ToState = (DOM: DOMSource) => StateSink
const toState: ToState =
  (DOM) => {
    const init$ =
      xs.of <StateReducer>
         ( (prev) => (
             { open: false
             , title: ''
             , url: ''
             , thumbnail: ''
             , ...prev
             }
           )
         )

    const open$ =
      DOM
        .select('div[data-open]')
        .events('click')
        .mapTo <StateReducer>
         ( (prev) => (
             { ...prev
             , open: true
             }
           )
         )

    const close$ =
      DOM
        .select('div[data-close]')
        .events('click')
        .mapTo <StateReducer>
         ( (prev) => (
             { ...prev
             , open: false
             }
           )
         )

    return (
      xs.merge
         ( init$
         , open$
         , close$
         )
    )
  }

export
{ toState
}
