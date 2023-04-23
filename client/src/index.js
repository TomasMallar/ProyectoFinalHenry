import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux"; //provider in order to make redux interact with the App. It provides the store to all components
import store from "./Redux/Store/Store.js"

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
