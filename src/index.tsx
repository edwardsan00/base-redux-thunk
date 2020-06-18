import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  components: __dirname + "/componenets",
  containers: __dirname + "/containers",
  reducers: __dirname + "/reducers",
  utils: __dirname + "/utils",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);