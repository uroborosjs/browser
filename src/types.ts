import
{ Stream
} from 'xstream'
import
{ DOMSource as DOMSourceUnit
, VNode
} from '@cycle/dom'
import
{ HTTPSource as HTTPSourceUnit
, RequestInput
} from '@cycle/http'
import
{ StateSource as StateSourceUnit
, Reducer as Reducer
} from '@cycle/state'
import
{ RouterSource as RouterSourceUnit
, RouterSink as RouterSinkUnit
} from 'cyclic-router';

type DOMSource =
  { DOM: DOMSourceUnit }
type HTTPSource =
  { HTTP: HTTPSourceUnit }
type RouterSource =
  { router: RouterSourceUnit }
type StateSource<T> =
  { state: StateSourceUnit<T> }

type DOMSink =
  { DOM: Stream<VNode> }
type HTTPSink =
  { HTTP: Stream<RequestInput> }
type RouterSink =
  { router: RouterSinkUnit }
type StateSink<T> =
  { state: Stream<Reducer<T>> }

type MaybeDOMSink =
  { DOM?: Stream<VNode> }
type MaybeHTTPSink =
  { HTTP?: Stream<RequestInput> }
type MaybeRouterSink =
  { router?: RouterSinkUnit }
type MaybeStateSink<T> =
  { state?: Stream<Reducer<T>> }

type Component <T, R> = (sources: T) => R

export
{ DOMSource
, HTTPSource
, RouterSource
, StateSource
, DOMSink
, MaybeDOMSink
, HTTPSink
, MaybeHTTPSink
, RouterSink
, MaybeRouterSink
, StateSink
, MaybeStateSink
, Component
}
