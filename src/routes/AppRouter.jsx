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
const Terms = React.lazy(() => import("../pages/Terms/Terms"));

const HowToSell = React.lazy(() => import("../pages/HowToSell/HowToSell"));
const HowToBeASeller = React.lazy(() =>
  import("../pages/HowToBeASeller/HowToBeASeller")
);
const HowDoesItWork = React.lazy(() =>
  import("../pages/HowDoesItWork/HowDoesItWork")
);
const Advantages = React.lazy(() => import("../pages/Advantages/Advantages"));

const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword")
);
const AddProduct = React.lazy(() => import("../pages/AddProduct/AddProduct"));
const ChatPage = React.lazy(() => import("../pages/ChatPage/ChatPage"));
const PaymentPage = React.lazy(() =>
  import("../pages/PaymentPage/PaymentPage")
);
const Profile = React.lazy(() => import("../pages/Profile/Profile"));

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
      { path: "request", element: <RequestConsultation /> },
      { path: "process-outsource", element: <ProcessOutSource /> },
      {
        path: "process-outsource/service",
        element: (
          <ProtectedRoute>
            <ProcessOutsourceService />
          </ProtectedRoute>
        ),
      },
      { path: "terms", element: <Terms /> },
      // { path: "how-to-sell", element: <HowToSell /> },
      // { path: "how-to-be-a-seller", element: <HowToBeASeller /> },
      // { path: "how-does-it-work", element: <HowDoesItWork /> },
      // { path: "advantages", element: <Advantages /> },
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
        path: "chat/:id",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <PaymentPage />
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
