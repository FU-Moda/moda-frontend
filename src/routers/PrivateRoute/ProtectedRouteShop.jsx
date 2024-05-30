import { toast } from "react-toastify";
import { decode } from "../../utils/jwtUtil";
import { Navigate } from "react-router-dom";

const ProtectedRouteShop = ({ children }) => {
  const role = decode(localStorage.getItem("accessToken"));
  console.log(role);
  if (role.role !== "isShop") {
    toast.error("Bạn không có quyền truy cập");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRouteShop;
