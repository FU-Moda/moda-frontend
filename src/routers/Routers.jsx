import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import ManagementLayOut from "../layouts/management-layout/ManagementLayOut";
import { decode } from "../utils/jwtUtil";
import { toast } from "react-toastify";

const Cart = lazy(() => import("../pages/Cart"));
const Home = lazy(() => import("../pages/Home"));
const Product = lazy(() => import("../pages/Product"));
const Shop = lazy(() => import("../pages/Shop"));
const ShopProductList = lazy(() =>
  import("../pages/ProductShop/ShopProductList")
);
const ManagementProduct = lazy(() =>
  import("../pages/Management/Shop/ManagementProduct")
);
const LoginPage = lazy(() => import("../pages/Common/LoginPage"));
const ManagementShop = lazy(() =>
  import("../pages/Management/Admin/ManagementShop")
);
const AdminDashboard = lazy(() =>
  import("../pages/Management/Admin/AdminDashboard")
);
const ShopDetail = lazy(() =>
  import("../pages/Management/Admin/ShopDetail/ShopDetail")
);
const ManagementOrder = lazy(() =>
  import("../pages/Management/Shop/ManagementOrder")
);
const Ship = lazy(() => import("../pages/Order/Ship"));
const ProductForm = lazy(() =>
  import("../pages/Management/Shop/Modal/ProductForm")
);
const PersonalInformation = lazy(() =>
  import("../pages/Common/PersonalInformation")
);
const ShopDashboard = lazy(() =>
  import("../pages/Management/Shop/ShopDashboard")
);
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
const VerifyPayment = lazy(() => import("../pages/Common/VerifyPayment"));
const SignUpShop = lazy(() => import("../pages/Management/Shop/SignUpShop"));
const PricingOptions = lazy(() =>
  import("../pages/Management/Shop/PricingOptions")
);

const ProtectedRouteAuth = ({ children }) => {
  const role = decode(localStorage.getItem("accessToken"));
  if (role !== "isStaff" && role != "isAdmin") {
    alertFail("Bạn cần phải đăng nhập để thực hiện thao tác này!!");
    return <Navigate to="/login" replace />;
  }
  return children;
};
const ProtectedRouteCustomer = ({ children }) => {
  const role = decode(localStorage.getItem("accessToken"));
  if (role.role !== "isUser") {
    alertFail("Bạn không có quyền truy cập");
    return <Navigate to="/go-pro" replace />;
  }
  return children;
};
const ProtectedRouteStaff = ({ children }) => {
  const role = decode(localStorage.getItem("accessToken"));
  if (role.role !== "isStaff") {
    alertFail("Bạn không có quyền truy cập");
    return <Navigate to="/" replace />;
  }
  return children;
};
const ProtectedRouteAdmin = ({ children }) => {
  const role = decode(localStorage.getItem("accessToken"));
  if (role.role !== "isAdmin") {
    toast.error("Bạn không có quyền truy cập");
    return <Navigate to="/" replace />;
  }
  return children;
};
const ProtectedRouteShop = ({ children }) => {
  const role = decode(localStorage.getItem("accessToken"));
  console.log(role);
  if (role.role !== "isShop") {
    toast.error("Bạn không có quyền truy cập");
    return <Navigate to="/" replace />;
  }
  return children;
};
function Routers() {
  const routing = useRoutes([
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <LoginPage /> },
        { path: "sign-up-shop", element: <SignUpShop /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <Shop /> },
        { path: "shop/:id", element: <Product /> },
        { path: "shop-detail/:id", element: <ShopProductList /> },
        { path: "personal-information", element: <PersonalInformation /> },
        { path: "verify-payment/*", element: <VerifyPayment /> },
        { path: "price-option", element: <PricingOptions /> },
      ],
    },
    {
      path: "admin",
      element: (
        <ProtectedRouteAdmin>
          <ManagementLayOut />
        </ProtectedRouteAdmin>
      ),
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        {
          path: "dashboard",
          element: (
            <ProtectedRouteAdmin>
              <AdminDashboard />
            </ProtectedRouteAdmin>
          ),
        },
        {
          path: "shop",
          element: (
            <ProtectedRouteAdmin>
              <ManagementShop />
            </ProtectedRouteAdmin>
          ),
        },
        {
          path: "shop/:id",
          element: (
            <ProtectedRouteAdmin>
              <ShopDetail />
            </ProtectedRouteAdmin>
          ),
        },
        {
          path: "settings",
          element: <ProtectedRouteAdmin></ProtectedRouteAdmin>,
        },
      ],
    },
    {
      path: "management-shop",
      element: (
        <ProtectedRouteShop>
          <ManagementLayOut />
        </ProtectedRouteShop>
      ),
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },

        { path: "dashboard", element: <ShopDashboard /> },
        {
          path: "product",
          element: (
            <ProtectedRouteShop>
              <ManagementProduct />
            </ProtectedRouteShop>
          ),
        },
        {
          path: "product/create",
          element: (
            <ProtectedRouteShop>
              <ProductForm />
            </ProtectedRouteShop>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRouteShop>
              <ManagementOrder />
            </ProtectedRouteShop>
          ),
        },
      ],
    },
    {
      path: "ship",
      element: <ManagementLayOut />,
      children: [{ path: "order/:id", element: <Ship /> }],
    },
  ]);
  return routing;
}
export default Routers;
