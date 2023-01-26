import { ChakraProvider } from "@chakra-ui/react";
import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import MainChat from "./routes/MainChat";
import Register from "./routes/Register";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root children={undefined} />,
    children: [{ path: "/", element: <MainChat />, index: true }],
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
