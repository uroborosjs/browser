import { Stream } from 'xstream'
import { DOMSource, VNode } from "@cycle/dom";
import
{ StateSource as MakeStateSource
, Reducer
} from '@cycle/state'

type State =
  { title: string
  }

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
}
