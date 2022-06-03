import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from "react-redux";
import App from './App';
import rootReducer from './reducer';
import reportWebVitals from './reportWebVitals';
import thunk from "redux-thunk";
import "./style.css";
import { ThemeProvider } from '@material-ui/core';
import { lightTheme,darkTheme } from './Theme/theme';



const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <App/>
        </ThemeProvider>
    </BrowserRouter>
    </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
