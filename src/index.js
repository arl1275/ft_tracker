import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import './assets/dist/css/tabler.min.css';//../assets/dist/css/tabler.min.css
import './assets/dist/css/tabler-flags.min.css';
import './assets/dist/css/tabler-payments.min.css';
import './assets/dist/css/tabler-vendors.min.css';
import './assets/dist/css/demo.min.css';
import './assets/dist/js/tabler.min.js';
import './assets/dist/libs/bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

{/* <script>
  document.body.style.display = "block"
</script> */}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
