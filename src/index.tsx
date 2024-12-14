import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
//normalize.css是一个现代化的 CSS 重置库，用于确保不同浏览器在渲染网页元素时保持一致的样式。
import 'normalize.css'
import './assets/css/index.less'
import { HashRouter } from 'react-router-dom'
import store from './store/index'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
