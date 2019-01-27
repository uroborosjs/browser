import xs from 'xstream'

import
{ HTTPSink
, RequestOptions
} from './types'

type toHTTP =
  () => HTTPSink
const toHTTP: toHTTP =
  () => {
    const requestCats$ =
      xs.of<RequestOptions>
         ( { url: 'https://www.reddit.com/r/catpictures.json'
           , method: 'GET'
           , category: 'cats'
           }
         )

    return requestCats$
  }

export
{ toHTTP
}
