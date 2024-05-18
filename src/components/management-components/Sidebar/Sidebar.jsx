import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/features/sidebarSlice";
import { NavLink, useLocation } from "react-router-dom";
import { decode } from "../../../utils/jwtUtil";

const SideBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar?.isOpen);
  const { user } = useSelector((state) => state.user);
  const [roleName, setRoleName] = useState(null);

  const location = useLocation();

  const menuShopItems = [
    {
      name: "Thống kê",
      icon: <i className="fa-solid fa-chart-line"></i>,
      path: "dashboard",
    },
    {
      name: "Sản phẩm",
      icon: <i className="fa-solid fa-shirt"></i>,
      path: "product",
    },
    {
      name: "Đơn hàng",
      icon: <i className="fa-solid fa-list"></i>,
      path: "orders",
    },
    {
      name: "Kho",
      icon: <i className="fa-solid fa-warehouse"></i>,
      path: "warehouse",
    },
    {
      name: "Quản lí giá",
      icon: <i className="fa-solid fa-money-bill"></i>,
      path: "pricing",
    },
  ];

  const menuAdminItems = [
    {
      name: "Thống kê",
      icon: <i className="fa-solid fa-chart-line"></i>,
      path: "dashboard",
    },
    {
      name: "Đối tác",
      icon: <i className="fa-solid fa-handshake-simple"></i>,
      path: "shop",
    },
    {
      name: "Cấu hình hệ thống",
      icon: <i className="fa-solid fa-money-bill"></i>,
      path: "pricing",
    },
  ];
  const menuStaffItems = [
    {
      name: "Thống kê",
      icon: <i className="fa-solid fa-chart-line"></i>,
      path: "dashboard",
    },
    {
      name: "Đối tác",
      icon: <i className="fa-solid fa-shirt"></i>,
      path: "shop",
    },
    {
      name: "Cấu hình hệ thống",
      icon: <i className="fa-solid fa-money-bill"></i>,
      path: "pricing",
    },
  ];

  useEffect(() => {
    var token = localStorage.getItem("accessToken");

    if (token) {
      setRoleName(decode(token).role);
    }
  }, [user, roleName]);
  return (
    <>
      <div className="flex">
        <div
          className={`bg-white text-text-color my-4 shadow-lg rounded-lg transition-all duration-300 ${
            isOpen ? "w-64" : "w-20"
          }`}
        >
          <ul className={`menu p-4 w-full text-base-content`}>
            {roleName === "isShop"
              ? menuShopItems.map((item, index) => (
                  <NavLink to={`${item.path}`}>
                    <li
                      key={index}
                      className="hover:bg-primary rounded-md hover:text-white my-1"
                    >
                      <a
                        className={`flex items-center ${
                          location.pathname?.includes(item.path)
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        {item.icon}
                        <span
                          className={`${
                            isOpen ? "inline" : "hidden"
                          } ml-2 text-md`}
                        >
                          {item.name}
                        </span>
                      </a>
                    </li>
                  </NavLink>
                ))
              : roleName === "isAdmin"
              ? menuAdminItems.map((item, index) => (
                  <NavLink to={`${item.path}`}>
                    <li
                      key={index}
                      className="hover:bg-primary rounded-md hover:text-white my-1"
                    >
                      <a
                        className={`flex items-center ${
                          location.pathname?.includes(item.path)
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        {item.icon}
                        <span
                          className={`${
                            isOpen ? "inline" : "hidden"
                          } ml-2 text-md`}
                        >
                          {item.name}
                        </span>
                      </a>
                    </li>
                  </NavLink>
                ))
              : roleName === "isStaff"
              ? menuStaffItems.map((item, index) => (
                  <NavLink to={`${item.path}`}>
                    <li
                      key={index}
                      className="hover:bg-primary rounded-md hover:text-white my-1"
                    >
                      <a
                        className={`flex items-center ${
                          location.pathname?.includes(item.path)
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        {item.icon}
                        <span
                          className={`${
                            isOpen ? "inline" : "hidden"
                          } ml-2 text-md`}
                        >
                          {item.name}
                        </span>
                      </a>
                    </li>
                  </NavLink>
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
