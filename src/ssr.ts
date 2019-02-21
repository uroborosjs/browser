import { run } from '@cycle/run'
import { makeHTMLDriver } from '@cycle/html'
import { withState } from '@cycle/state'
import
{ makeHistoryDriver
, makeServerHistoryDriver
} from '@cycle/history'
import { routerify } from 'cyclic-router'
import { getStyles } from 'typestyle'
import
{ compose
, takeLast
, reduce
, split
, dropLast
} from 'rambda'
// import
// { setupPage
// , normalize
// } from 'csstips'
import { Main } from './main'
import { drivers } from './drivers'
import { routeMatcher } from './utils/route-matcher'

import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import delay from 'xstream/extra/delay'

const endInOn =
  (source$: any) =>
    (stop$: any) =>
      stop$
        .compose(sampleCombine(source$))
        .map(([a, b]) => b)
      // xs.merge(source$, xs.never())
      //   .endWhen(stop$)

const SsrMain =
  (route: string) =>
    (main: any) =>
      (sources: any) => {
        const mainSinks = main(sources)
        console.log(mainSinks.ssr)
        console.log('route: ', route)

        return (
          { ...mainSinks
          , router: xs.of(route)
          // , router: xs.of(`/${route}`)
          // , router: xs.of(route)
          , DOM: endInOn (mainSinks.DOM) (mainSinks.ssr)
          // , DOM: mainSinks.DOM.endWhen(mainSinks.ssr.debug('end'))
          // , DOM: mainSinks.DOM.endWhen(mainSinks.ssr.debug('onendStream').take(1)).debug('here?')
          }
        )
      }


const SsrComposedMain =
  (route:string) =>
    routerify
    ( withState
      ( <any>SsrMain (route) (Main)
      )
    , routeMatcher
    )

  // routerify
  // ( withState
  //   ( <any>SSRMain(Main)
  //   )
  // , routeMatcher
  // )
const splitElements =
  // (htmlSource: string) =>
  compose
  ( reduce
    ( (acc: string[], curr: string) =>
        curr === '<'
          ? [ ...acc, curr ]
          : [ ...dropLast(1, acc)
            , `${takeLast(1, acc)}${curr}`
            ]
    , ['']
    )
  , split ('')
  )

const insertInElementById =
  (id: string) =>
    (toInsert: string) =>
      compose
      ( reduce<string, string>
        ( (acc: string, curr: string) =>
            curr.includes(`id="${id}"`)
              ? `${acc}${curr}${toInsert}`
              : `${acc}${curr}`
        , ''
        )
      , splitElements
      )

const genHtml =
  (sourceHtml: string) =>
    (domId: string, cssId: string) =>
      (DOM: string, CSS: string): string =>
        compose
        ( insertInElementById
          (cssId)
          (CSS)
        , insertInElementById
          (domId)
          (DOM)
        )
        (sourceHtml)

const makePageHtml =
  (sourceHtml: string) =>
    (domId: string, cssId: string) =>
      (route: string) =>
        new Promise((res, rej) => {
          try {
            const CSS = getStyles()

            console.log(route)
            run
            ( SsrComposedMain (route)
            , { ...drivers
              , history:
                  makeServerHistoryDriver()
                  // ( { initialEntries: [ route ]
                  //   , initialIndex: 0
                  //   }
                  // )
              , DOM: 
                  makeHTMLDriver
                  ( (appDOM:string) => {
                      const HTML: string = genHtml (sourceHtml) (domId, cssId) (appDOM, CSS)
                      res(HTML)
                    }
                  )
              }
            )
          } catch (e) {
            rej(e)
          }
        })

export
{ makePageHtml
}
