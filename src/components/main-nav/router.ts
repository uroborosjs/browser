import xs from 'xstream'

import { path } from 'rambda'

import
{ DOMSource
, RouterSink
} from './types'
import { HistoryInput } from 'cyclic-router';

type ToRouter = (DOM: DOMSource) => RouterSink
const toRouter: ToRouter =
  (DOM) => {
    const nav$ =
      DOM
        .select('div[data-nav="true"]')
        .events('click')
        .map<HistoryInput>(path('target.dataset.to'))

    return nav$
  }

export
{ toRouter
}
