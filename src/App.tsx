import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import RouterMain from './routers'
import CssGlobal from 'utils/CssGlobal'
import generateStore from 'reducers'
import theme from 'utils/Theme'

const store = generateStore()

const App: FunctionComponent = (): JSX.Element => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CssGlobal />
      <Provider store={store}>
        <RouterMain />
      </Provider>
    </ThemeProvider>
    </>
  )
}

export default App