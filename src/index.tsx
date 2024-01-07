import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//引用react-router-dom 来实现页面的切换，实现在main目录
import { BrowserRouter } from 'react-router-dom';

import store from '@/redux/store';

import App from './App';

if (module?.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
