import { run } from '@cycle/run'
import { makeHTMLDriver } from '@cycle/html'
import { withState } from '@cycle/state'
import { makeHistoryDriver } from '@cycle/history'
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

const SSRMain =
  (main: any) =>
    (sources: any) => {
      const mainSinks = main(sources)

      return (
        { ...mainSinks
        , DOM: mainSinks.DOM.take(1)
        }
      )
    }


const ComposedMain =
  withState
  ( <any>SSRMain(Main)
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
// `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1">

//       <meta name="theme-color" content="#dab" />
//       <title> Usoboros-ssr cycling with snakes can be fun! </title>

//       <link rel="icon" type="image/png" href="./assets/icons/favicon.ico">
//       <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/beon" type="text/css"/> 
//       <link rel="manifest" href="./manifest.webmanifest">

//       <style id="styles">
//         ${CSS}
//       </style>
//     </head>

//     <body>
//       <div id="app">
//         ${DOM}
//       </div>

//       <script>
//         if ( 'serviceWorker' in navigator ) {
//           window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js')})
//         }
//       </script>
//       <script src="${bundleName}"></script>
//     </body>
//   </html>
//   `

const makePageHtml =
  (sourceHtml: string) =>
    (domId: string, cssId: string) =>
      (route: string) =>
        new Promise((res, rej) => {
          try {
            const CSS = getStyles()

            run
            ( ComposedMain
            , { ...drivers
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
