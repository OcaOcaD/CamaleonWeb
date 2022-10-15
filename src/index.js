import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import Coverage from "./components/Coverage";


import "./style/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "coverage",
    element: <Coverage></Coverage>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);