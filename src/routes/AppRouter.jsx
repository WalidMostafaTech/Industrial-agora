import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Categories = React.lazy(() => import("../pages/Categories/Categories"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const AboutUS = React.lazy(() => import("../pages/AboutUS/AboutUS"));
const ContactUs = React.lazy(() => import("../pages/ContactUS/ContactUS"));
const Request = React.lazy(() => import("../pages/Request/Request"));
const Terms = React.lazy(() => import("../pages/Terms/Terms"));
const HowToSell = React.lazy(() => import("../pages/HowToSell/HowToSell"));
const HowToBeASeller = React.lazy(() => import("../pages/HowToBeASeller/HowToBeASeller"));
const HowDoesItWork = React.lazy(() => import("../pages/HowDoesItWork/HowDoesItWork"));
const Advantages = React.lazy(() => import("../pages/Advantages/Advantages"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "categories/:slug", element: <Categories /> },
      { path: "product/:id", element: <Product /> },
      { path: "about-us", element: <AboutUS /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "request", element: <Request /> },
      { path: "terms", element: <Terms /> },
      { path: "how-to-sell", element: <HowToSell /> },
      { path: "how-to-be-a-seller", element: <HowToBeASeller /> },
      { path: "how-does-it-work", element: <HowDoesItWork /> },
      { path: "advantages", element: <Advantages /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
