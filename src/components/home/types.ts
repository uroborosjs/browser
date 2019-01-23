import { Stream } from 'xstream'
import { DOMSource, VNode } from "@cycle/dom";
import
{ StateSource as MakeStateSource
, Reducer
} from '@cycle/state'
import
{ RouterSource
, RouterSink
} from 'cyclic-router'

import { State as NavState } from 'components/main-nav'

type State =
  { title: string
  , nav: NavState
  }

type DOMSink = Stream<VNode>
type StateSource = MakeStateSource<State>
type StateReducer = Reducer<State>
type StateSink = Stream<StateReducer>

type Sources =
  { DOM: DOMSource
  , state: StateSource
  // , router: RouterSource
  }

type Sinks =
  { DOM: DOMSink
  , state: StateSink
  , router: RouterSink
  }

type Component = (sources: Sources) => Sinks

type State$ = Stream<State>

export
{ Component
, VNode
, DOMSource
, DOMSink
, StateSource
, StateReducer
, StateSink
, State
, State$
, RouterSource
, RouterSink
}
