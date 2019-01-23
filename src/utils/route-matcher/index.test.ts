import test from 'ava'

import { neoSwitchPath } from '.'

type Param = string | undefined

const routes =
  { '/': (...params: Param[]) => params
  , '*': (...params: Param[]) => params
  }

test
( 'Get correct root level path'
, t => {
    const {} = neoSwitchPath('/', routes)
    t.is()
  }
)
