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

type State =
  { activeRoute: string }

type State$ = Stream<State>

type DOMSink = Stream<VNode>
type StateSource = MakeStateSource<State>
type StateReducer = Reducer<State>
type StateSink = Stream<StateReducer>

type Sources =
  { DOM: DOMSource
  , state: StateSource
  }

type Sinks =
  { DOM: DOMSink
  , state: StateSink
  , router: RouterSink
  }

type Component = (sources: Sources) => Sinks

export
{ Component
, VNode
, DOMSource
, DOMSink
, State
, State$
, StateSource
, StateSink
, StateReducer
, RouterSink
}
