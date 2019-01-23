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

const styles =
  { wrapper
  , wrapperContent
  }

export
{ styles
}
