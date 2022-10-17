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
import Upload from "./components/Upload";


import "./style/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from "./error-page";
import Camaleon from "./components/Camaleon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>

  },
  {
    path: "coverage",
    element: <Coverage></Coverage>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "camaleon/:camId",
    element: <Camaleon />,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "upload",
    element: <Upload />,
    errorElement: <ErrorPage></ErrorPage>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);