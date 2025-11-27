import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";
import PublicRoute from "../components/ProtectedRoutes/PublicRoute";
import ProtectedRoute from "../components/ProtectedRoutes/ProtectedRoute";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Categories = React.lazy(() => import("../pages/Categories/Categories"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const AboutUS = React.lazy(() => import("../pages/AboutUS/AboutUS"));
const ContactUs = React.lazy(() => import("../pages/ContactUS/ContactUS"));
const RequestConsultation = React.lazy(() =>
  import("../pages/RequestConsultation/RequestConsultation")
);
const ProcessOutSource = React.lazy(() =>
  import("../pages/ProcessOutSource/ProcessOutSource")
);
const ProcessOutsourceService = React.lazy(() =>
  import("../pages/ProcessOutsourceService/ProcessOutsourceService")
);
const ProcessOutSourceProducts = React.lazy(() =>
  import("../pages/ProcessOutSourceProducts/ProcessOutSourceProducts")
);
const Terms = React.lazy(() => import("../pages/Terms/Terms"));

const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword")
);
const AddProduct = React.lazy(() => import("../pages/AddProduct/AddProduct"));
const ChatPage = React.lazy(() => import("../pages/ChatPage/ChatPage"));
const SubscriptionPackages = React.lazy(() =>
  import("../pages/Subscription/SubscriptionPackages")
);
const SubscriptionDetails = React.lazy(() =>
  import("../pages/Subscription/SubscriptionDetails")
);

const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const MyProducts = React.lazy(() => import("../pages/MyProducts/MyProducts"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories/:id", element: <Categories /> },
      { path: "product/:id", element: <Product /> },
      { path: "about-us", element: <AboutUS /> },
      { path: "contact-us", element: <ContactUs /> },
      {
        path: "request",
        element: (
          <ProtectedRoute>
            <RequestConsultation />
          </ProtectedRoute>
        ),
      },
      { path: "process-outsource", element: <ProcessOutSource /> },
      {
        path: "process-outsource/service",
        element: (
          <ProtectedRoute>
            <ProcessOutsourceService />
          </ProtectedRoute>
        ),
      },
      {
        path: "process-outsource/products",
        element: (
          // <ProtectedRoute>
          <ProcessOutSourceProducts />
          // </ProtectedRoute>
        ),
      },
      // { path: "terms", element: <Terms /> },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat/:id?",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscription-packages",
        element: (
          <ProtectedRoute>
            <SubscriptionPackages />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscription-details",
        element: (
          <ProtectedRoute>
            <SubscriptionDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
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
