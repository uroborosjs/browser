import { style } from 'typestyle'
import
{ horizontal
, content
, vertical
, verticallySpaced
} from 'csstips'

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
  ( content
  , horizontal
  , { justifyContent: 'center'
    }
  )

const catList =
  style
  ( vertical
  , content
  , verticallySpaced('.4em')
  , { maxWidth: '40ch'
    , width: '100%'
    }
  )

const styles =
  { wrapper
  , wrapperContent
  , catList
  }

export
{ styles
}
