import { createServer } from 'http'
import
{ reduce
, compose
, join
, split
, contains
, tail
} from 'rambda'
import
{ readdirSync
, promises
, readFileSync
} from 'fs'
import { makePageHtml } from './ssr'

const { readFile } = promises

// const sendStatic =
//   (filePath: string, encoding: string | null = 'utf8') =>
//     async () =>
//       readFile( filePath, encoding)
//         .catch
//           ( (err) => {
//               throw new Error(`Couldn't retrieve file`)
//             }
//           )

// const FRONT_BUILD_PATH = `${__dirname}/../../build`

// const sendFrontFile =
//   (fileName: string, encoding: string | null = 'utf8') => (
//     { GET: sendStatic(`${FRONT_BUILD_PATH}/${fileName}`, encoding)
//     }
//   )

const corsHeaders =
  { 'Access-Control-Allow-Origin': '*'
  , 'Access-Control-Allow-Credentials': true
  , 'Access-Control-Allow-Methods': 'GET, POST'
  }

const handleCorsePreflightRequest =
  (req:any, res:any) => {
    if(req.method === 'OPTIONS') {
      res.writeHead(200, corsHeaders)
    }
  }

const frontAssets =
  readdirSync('./build/static')

const appHtml =
  readFileSync('./build/static/index.html', 'utf8')

const genSsrHtml =
  makePageHtml (appHtml) ('app', 'typestyle')
// console.log(frontAssets)

const reqFrontAsset =
  async (path: string) =>
    contains<string> (path) (frontAssets)
      // ? readFile(`build/${path}`, path.endsWith('.png') ? null : undefined )
      ? readFile(`build/static/${path}`, 'utf8')
      : null

const LY = (v: any) => {console.log(v); return v}

const stringTail =
  compose
  ( join('')
  , <any>tail
  , split('')
  )

const frontRoutes =
  [ ''
  , 'home'
  , 'about'
  , 'reddit'
  ]

const toIndexPath =
  (path: string) =>
    contains<string> (path) (frontRoutes)
      ? `path.html`
      : path

// const preparePath =
//   compose
//   ( toIndexPath
//   , stringTail
//   )

const handleRequest =
  (req: any, res: any) => {
    handleCorsePreflightRequest(req, res)

    console.log(req.url)
    const preparedUrl = stringTail ( req.url )

    reqFrontAsset( preparedUrl )
      .then
       ( (contents) => contents || genSsrHtml ('')
      .then
       ( (contents) => contents || 'Nothing'
       )
      .then(LY)
      .then
       ( (mess) => {
         if (req.url.endsWith('.png')){
           res.writeHead
               ( 200
               , { 'Content-Type': 'image/png'
                 }
               )
         }
         if (req.url.endsWith('.svg')){
           res.writeHead
               ( 200
               , { 'Content-Type': 'image/svg+xml'
                 }
               )
         }
         res.write(mess)
       })
      .catch
       ( (err) => {
           console.error(err)
           res.write(err.toString())
         }
       )
      .finally
       ( () => {
           res.end()
         }
       )
  }


let server = createServer(handleRequest)
server.listen(9999)
