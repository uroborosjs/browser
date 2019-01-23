import { Stream } from 'xstream'
import { DOMSource, VNode } from '@cycle/dom'
import { HTTPSource, RequestInput } from '@cycle/http'
import
{ StateSource
, Reducer
} from '@cycle/state'
import
{ RouterSource
, RouterSink
} from 'cyclic-router';

type Sources =
  { DOM: DOMSource
  , HTTP: HTTPSource
  , router: RouterSource
  , state: StateSource<any>
  }

type Sinks =
  { DOM?: Stream<VNode>
  , HTTP?: Stream<RequestInput>
  , router?: RouterSink
  , state: Stream<Reducer<any>>
  }

type Component =
  (sources: Sources) => Sinks

export
{ Component
}
