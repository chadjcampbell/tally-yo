import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./provider/AuthProvider";
import Login from "./routes/Login";
import MainChat from "./routes/MainChat";
import Register from "./routes/Register";
import Root from "./routes/Root";
import { ChatProvider } from "./provider/ChatProvider";
import Contact from "./routes/Contact";
import Portfolio from "./routes/Portfolio";
import BuySellTrade from "./routes/BuySellTrade";
import Buy from "./components/Buy";
import Sell from "./components/Sell";

const AuthenticatedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  if (user === undefined || loading) {
    return <Loading />; // or loading spinner, etc...
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const ContextProviderLayout = () => (
  <AuthProvider>
    <ChatProvider>
      <Outlet />
    </ChatProvider>
  </AuthProvider>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ContextProviderLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <AuthenticatedRoute />,
          children: [
            {
              element: <Root />,
              children: [
                { element: <MainChat />, index: true },
                {
                  path: "/buySellTrade",
                  element: <BuySellTrade />,
                  children: [
                    {
                      path: "/buySellTrade/buy",
                      element: <Buy />,
                      index: true,
                    },
                    { path: "/buySellTrade/sell", element: <Sell /> },
                  ],
                },
                { path: "/contact", element: <Contact /> },
                { path: "/portfolio", element: <Portfolio /> },
              ],
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ],
  { basename: "/tally-yo" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
