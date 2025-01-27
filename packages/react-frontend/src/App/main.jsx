import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);