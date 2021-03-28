import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const app = (
  //StrictMode is simply used for better debugging and delivers warnings and error messages
  <React.StrictMode>
      {/* BrowserRouter is part of the react-router-dom and uses parts HTML5-API to sync the UI with the URL simply said*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>

)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
