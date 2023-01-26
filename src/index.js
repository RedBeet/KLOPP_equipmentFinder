import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from "./fb";
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'

console.log(firebase)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
