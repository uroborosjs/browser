import { createServer } from 'http'
import
{ reduce
, anyPass
, map
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

const STATIC_PATH =
  (process.env.NODE_ENV === 'production'
    ? './build'
    : './dev') + '/static'

console.log(process.env.NODE_ENV)

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

const prefix =
  (prefixStr: string) =>
    (srcStr: string) =>
      `${prefixStr}/${srcStr}`

const frontAssets =
  readdirSync(STATIC_PATH) 

console.log(frontAssets)

const appHtml =
  readFileSync(`${STATIC_PATH}/index.html`, 'utf8')

const genSsrHtml =
  makePageHtml (appHtml) ('app', 'typestyle')
// console.log(frontAssets)

const reqFrontAsset =
  async (path: string) =>
    contains<string> (path) (frontAssets)
      ? readFile
        ( `${STATIC_PATH}/${path}`
        , anyPass
          ( [ (p: string) => p.endsWith('.png')
            , (p: string) => p.endsWith('.ico')
            // , (p: string) => p.endsWith('.js')
            ] 
          )
          ( path )
            ? null
            : 'utf8'
        )
      // ? readFile(`build/static/${path}`, 'utf8')
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

const handleRequest =
  (req: any, res: any) => {
    handleCorsePreflightRequest(req, res)

    console.log(req.url)
    const preparedUrl = stringTail ( req.url )
    console.log(preparedUrl)

    reqFrontAsset( preparedUrl )
      .then(LY)
      .then
       ( (contents) => contents || genSsrHtml (preparedUrl)
       )
      .then
       ( (contents) => contents || 'Nothing'
       )
      .then
       ( (mess) => {
         let contentType = {}
         if (req.url.endsWith('.png')){
           contentType =
             { 'Content-Type': 'image/png'
             }
         }
         if (req.url.endsWith('.svg')){
           contentType =
             { 'Content-Type': 'image/svg+xml'
             }
         }
         if (req.url.endsWith('.ico')){
           contentType =
             { 'Content-Type': 'image/x-icon'
             }
         }
         if (req.url.endsWith('.js')) {
           contentType =
             { 'Content-Type': 'application/javascript'
             }
         }
         return (
           { status: 200
           , head: { ...contentType, ...corsHeaders }
           , message: mess
           }
         )
       })
      .then
       ( ({ status, head, message }) => {
           res.writeHead(status, head)
           res.write(message)
         }
       )
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

console.log(`Static Path: ${STATIC_PATH}`)
