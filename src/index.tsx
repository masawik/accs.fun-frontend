import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./redux/rootReducer";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom'
import 'normalize.css'
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root')
);
