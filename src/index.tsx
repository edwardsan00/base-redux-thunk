import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moduleAlias from 'module-alias'
import { AppContainer } from 'react-hot-loader'
import { loadableReady } from '@loadable/component'

moduleAlias.addAliases({
  components: __dirname + "/componenets",
  containers: __dirname + "/containers",
  reducers: __dirname + "/reducers",
  utils: __dirname + "/utils",
});

type MoodRender = 'render' | 'hydrate'


const render = (Component: React.FunctionComponent, type: MoodRender = 'render') => {
  ReactDOM.render(
    <React.StrictMode>
      <AppContainer>
        <Component />
      </AppContainer>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (process.env.NODE_ENV === 'production')
  loadableReady(() => {
    render(App, 'hydrate')
  })
else render(App)



if (module.hot)
  module.hot.accept('./App', () => {
    render(require('./App').default)
  })
