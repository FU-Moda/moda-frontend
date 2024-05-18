import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Shop from "../pages/Shop";
import ShopProductList from "../pages/ProductShop/ShopProductList";
import ManagementLayOut from "../layouts/management-layout/ManagementLayOut";
import ManagementProduct from "../pages/Management/Shop/ManagementProduct";
import LoginPage from "../pages/Common/LoginPage";
import { ManagementShop } from "../pages/Management/Admin/ManagementShop";
import { AdminDashboard } from "../pages/Management/Admin/AdminDashboard";
import { ShopDetail } from "../pages/Management/Admin/ShopDetail/ShopDetail";
import { decode } from "../utils/jwtUtil";
import { toast } from "react-toastify";
import { ManagementOrder } from "../pages/Management/Shop/ManagementOrder";
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
      path: "/",
      children: [{ path: "/login", element: <LoginPage /> }],
    },
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/shop", element: <Shop /> },
        { path: "/shop/:id", element: <Product /> },
        { path: "/shop-detail/:id", element: <ShopProductList /> },
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
        { path: "dashboard", element: <AdminDashboard /> },
        {
          path: "product",
          element: (
            <ProtectedRouteShop>
              <ManagementProduct />
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
  ]);
  return routing;
}
export default Routers;
