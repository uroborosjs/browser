import { Routes } from './utils/route-matcher'

import { Home } from 'components/home'
import { About } from 'components/about'
import { Reddit } from 'components/reddit'

const routes: Routes =
  { '/': () => Home
  , '*': () => { console.log(); return Home }
  , $nest:
    { 'home':
      { '/': () => Home
      }
    , 'about':
      { '/': () => About
      }
    , 'reddit':
      { '/': () => Reddit
      }
    }
  }

export
{ routes
}
