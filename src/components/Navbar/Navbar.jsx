import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div
      className={`w-full  transition-all duration-300 z-10 ${
        isFixed ? "bg-white shadow-xl py-2 " : "bg-white shadow-md py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 no-underline text-primary"
        >
          {/* <ion-icon name="bag" className="text-2xl"></ion-icon> */}
          <span className="text-2xl font-medium">MODA</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/"
            className="text-base font-semibold hover:text-gray-500 no-underline text-primary"
            onClick={() => setExpand(false)}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/shop"
            className="text-base font-semibold hover:text-gray-500 no-underline text-primary"
            onClick={() => setExpand(false)}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to="/cart"
            className="text-base font-semibold hover:text-gray-500 no-underline text-primary"
            onClick={() => setExpand(false)}
          >
            Giỏ hàng
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none "
              onClick={() => setExpand(!expand)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <Link to="/cart" className=" no-underline text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
        </div>
      </div>

      {expand && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setExpand(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setExpand(false)}
            >
              Sản phẩm
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setExpand(false)}
            >
              Giỏ hàng
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
