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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CssGlobal />
        <RouterMain />
      </ThemeProvider>
    </Provider>
  )
}

export default App