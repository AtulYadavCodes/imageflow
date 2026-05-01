import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from "react-router-dom";
import { router } from './components/Router/Router';

function App() {
  return <><RouterProvider router={router} />
  <ToastContainer />
  </>;
}

export default App