import { style } from 'typestyle'
import
{ horizontal
, vertical
} from 'csstips'

import { font } from 'styles'

const wrapper =
  style
  ( { backgroundColor: '#123'
    , height: '100vh'
    , width: '100vw'
    , overflowY: 'scroll'
    , overflowX: 'hidden'
    , padding: '2em'
    , margin: 0
    }
  , vertical
  )

const wrapperContent =
  style
  ( { justifyContent: 'center'
    }
  , horizontal
  )

const logo =
  style
  ( { height: '60vmin'
    , width: '60vmin'
    }
  )

const title =
  style
  ( { color: 'white'
    , fontSize: '3em'
    }
  , font.head
  )

const styles =
  { wrapper
  , wrapperContent
  , logo
  , title
  }

export
{ styles
}
