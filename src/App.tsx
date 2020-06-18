import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import RouterMain from './routers'
import CssGlobal from 'utils/CssGlobal'
import generateStore from 'reducers'

const store = generateStore()

const App: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <CssGlobal />
      <Provider store={store}>
        <RouterMain />
      </Provider>
    </>
  )
}

export default App