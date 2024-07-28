import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Make sure the path to your store is correct

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  // Wrap your App component with the Provider
      <App />
    </Provider>
  </React.StrictMode>,
);
