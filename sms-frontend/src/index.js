import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import './index.css';
import App from './App';
import Messages from './Components/Messages';
import Contacts from './Components/Contacts';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Renders elements according to their paths
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
