import xs from 'xstream'

import
{ HTTPSink
// , RequestOptions
} from 'types'

type toHTTP =
  () => HTTPSink
const toHTTP: any =
  () => {
    const requestCats$ =
      xs.of<any>
         ( { url: 'https://www.reddit.com/r/catpictures.json'
           , method: 'GET'
           , category: 'cats'
           }
         )
         // .debug('came here')

    return (
      requestCats$
    )
  }

export
{ toHTTP
}
