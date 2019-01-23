import { style } from 'typestyle'
import
{ horizontal
, padding
, horizontallySpaced
} from 'csstips'

import { colors } from 'styles'

const wrapper =
  style
  ( padding('.4em')
  , horizontallySpaced('.4em')
  , horizontal
  , { fontSize: 'calc(2vw + 1em)'
    }
  )

const navItem =
  style
  ( padding('.4em')
  , { backgroundColor: colors.button.sub.toHexString()
    , borderRadius: '.2em'
    , color: 'white'
    , transition: 'background-color .2s'
    }
  )

const navItemHover =
  style
  ( { cursor: 'pointer'
    , $nest:
      { '&:hover':
        { backgroundColor: colors.button.sub.lighten(.1).toHexString()
        }
      }
    }
  )

const active =
  style
  ( { backgroundColor: colors.button.sub.darken(.2).toHexString()
    , cursor: 'normal'
    }
  )

const styles =
  { wrapper
  , navItem
  , navItemHover
  , active
  }

export
{ styles
}
