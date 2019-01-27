import { style } from 'typestyle'
import
{ content
, vertical
} from 'csstips'

import { font } from 'styles'
import
{ NestedCSSProperties
, CSSProperties
} from 'typestyle/lib/types';

const wrapper =
  style
  ( vertical
  , content
  , { backgroundColor: '#123'
    , width: '100%'
    , fontSize: 'calc(2vmin + 1em)'
    , padding: '2em'
    , margin: 0
    , boxShadow: '0 .2em .4em rgba(255, 255, 255, .05)'
    , borderRadius: '.4rem'
    , alignContent: 'center'
    }
  )

const wrapperContent =
  style
  ( vertical
  , { justifyContent: 'center'
    }
  )

const title =
  style
  ( { fontSize: '1em'
    , color: 'white'
    }
  )

type Unit =
  'px'
  | 'em'
  | 'rem'
  | 'ch'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
type MakeBox = (num: number, unit?: Unit) => CSSProperties
const makeBox: MakeBox =
  (num, unit = 'px') => (
    { width: `${num}${unit}`
    , height:  `${num}${unit}`
    }
  )

const makeThumbnail =
  (url: string) =>
    style
    ( makeBox(10, 'ch')
    , content
    , { backgroundImage: `url(${url})`
      , backgroundSize: '100% 100%'
      , borderRadius: '50%'
      , alignSelf: 'center'
      , cursor: 'pointer'
      , transition: 'box-shadow 0.5s'
      , $nest:
        { '&:hover':
          { boxShadow: '0 0 4em rgba(255, 255, 255, 0.1)'
          }
        }
      }
    )

const fixedMargin =
  (padNum: number): NestedCSSProperties => (
    { position: 'fixed'
    , top: `${padNum}vh`
    , left: `${padNum}vw`
    , bottom: `${padNum}vh`
    , right: `${padNum}vw`
    }
  )

const makeBigCat =
  (url: string) =>
    style
    ( fixedMargin(5)
    , { boxShadow: '0 0 10em rgba(0, 0, 0, 0.8)'
      , backgroundImage: `url(${url})`
      , backgroundSize: 'contain'
      , backgroundRepeat: 'no-repeat'
      , backgroundPosition: 'center'
      , backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }
    )

const hidden =
  style
  ( { display: 'none'
    }
  )

const cross =
  style
  ( font.head
  , { fontSize: '4rem'
    , color: 'white'
    , marginLeft: 'auto'
    , width: '1ch'
    , cursor: 'pointer'
    , $nest:
      { '&:hover':
        { textShadow: '0 0 .6rem rgba(255, 255, 255, 0.8)'
        }
      }
    }
  )

const styles =
  { wrapper
  , wrapperContent
  , title
  , makeThumbnail
  , makeBigCat
  , hidden
  , cross
  }

export
{ styles
}
