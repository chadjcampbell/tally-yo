import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Collection from "./routes/Collection";
import Login from "./routes/Login";
import MainChat from "./routes/MainChat";
import Register from "./routes/Register";
import Root from "./routes/Root";
import Settings from "./routes/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { element: <MainChat />, index: true },
      { path: "collection", element: <Collection /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
