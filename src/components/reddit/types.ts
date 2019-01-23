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
import { HTTPSource, RequestOptions } from '@cycle/http';

type IMAGE_URL = string
type Cat =
  { thumbnail: IMAGE_URL
  , url: IMAGE_URL
  , title: string
  }
type State =
  { title: string
  , catList: Cat[]
  , nav: NavState
  }

type DOMSink = Stream<VNode>

type StateSource = MakeStateSource<State>
type StateReducer = Reducer<State>
type StateSink = Stream<StateReducer>

type HTTPSink = Stream<RequestOptions>

type Sources =
  { DOM: DOMSource
  , state: StateSource
  , HTTP: HTTPSource
  }

type Sinks =
  { DOM: DOMSink
  , state: StateSink
  , HTTP: HTTPSink
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
, HTTPSource
, HTTPSink
, RequestOptions
, Cat
}
