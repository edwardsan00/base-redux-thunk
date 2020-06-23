import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import RouterMain from './routers'
import CssGlobal from 'utils/CssGlobal'
import generateStore from 'reducers'
import { history } from 'reducers/config'
import theme from 'utils/Theme'

const store = generateStore()

const App: FunctionComponent = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CssGlobal />
        <ConnectedRouter history={history}>
          <RouterMain />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App