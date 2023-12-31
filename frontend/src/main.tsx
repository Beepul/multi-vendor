// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { autoLoginAsync } from './redux/actions/user.ts';
import { autoShopLoginAsync } from './redux/actions/shop.ts';
import { getAllProductsAsync } from './redux/actions/product.ts';

store.dispatch(autoLoginAsync())
store.dispatch(autoShopLoginAsync())
store.dispatch(getAllProductsAsync())

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
)
