import React, { FunctionComponent } from 'react'
import { CssBaseline } from '@material-ui/core'
import RouterMain from './routers'
import CssGlobal from 'utils/CssGlobal'


const App: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <CssGlobal />
      <RouterMain />
    </>
  )
}

export default App