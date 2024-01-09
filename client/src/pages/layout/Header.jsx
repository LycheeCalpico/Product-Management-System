import { React, useEffect, useState } from "react";
import { useNavigate, createSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_, logout_, selectUser } from "../../redux/auth.slice";
import { clearCart_, selectCart } from "../../redux/cart.slice";
import ShoppingCart from "./ShoppingCart";
import axios from "axios";

const Header = ({ userInfo }) => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const userID = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).others._id
    : null;
  const userAccess = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).others.role
    : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(clearCart_());
    dispatch(logout_(null));
    console.log("Logged out");
    navigate("/");
  };

  async function handleCartClick() {
    setIsCartOpen(!isCartOpen);
    try {
      await axios
        .get("/api/cart", {
          params: {
            userID: userID,
          },
        })
        .then((response) => {
          console.log("cart", response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  // TODO: remove when redux all set up
  const mockCartItems = [
    {
      productName: "Apple Macbook Pro",
      price: 1599,
      quantity: 1,
      _id: 123,
    },
    {
      productName: "Apple Watch",
      price: 299,
      quantity: 3,
      _id: 345,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `${createSearchParams({
        searchKey: `${searchKey}`,
      })}`,
    });
    setSearchKey("");
  };

  var icon = null;
  switch (userAccess) {
    case "admin":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
      );
      break;
    case "customer":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      );
      break;
  }

  return (
    <header className="bg-black w-full px-4 py-3">
      <div className="grid gap-y-4 grid-rows-1 xs:grid-rows-2 md:grid-rows-1 grid-cols-3 xs:grid-cols-2 md:grid-cols-3">
        <div className="flex pl-14 xs:pl-0 md:pl-14 justify-start">
          <a href="/" className="w-full">
            <p className="md:space-x-3">
              <span className="hidden text-white text-3xl font-bold md:inline overflow-hidden">
                Management
              </span>
              <span className="text-white text-3xl font-bold md:hidden">M</span>
              <span className="text-white text-sm font-bold ">Chuwa</span>
            </p>
          </a>
        </div>
        <form
          className="xs:row-start-2 xs:col-span-2 md:row-start-1 md:col-span-1 md:col-start-2 "
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-center bg-white rounded-md">
            <input
              className="text-base w-full text-gray-400 outline-none p-2 px-3 rounded-md"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <div className=" items-center px-2 space-x-4 mx-auto">
              <button type="submit" className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-end pr-14 xs:pr-0 md:pr-14 space-x-8">
          {userInfo && (
            <div
              to="/"
              onClick={(e) => handleLogout(e)}
              className="flex items-center space-x-3"
            >
              {icon}
              <p className="font-bold text-white text-base caret-transparent hover:text-gray-300 transition-colors duration-300 hidden md:block">
                Sign out
              </p>
            </div>
          )}
          {!userInfo && (
            <Link to="/login" className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <p className="font-bold text-white text-base caret-transparent hover:text-gray-300 transition-colors duration-300 hidden md:block">
                Sign In
              </p>
            </Link>
          )}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8 cursor-pointer"
                onClick={handleCartClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <div className="absolute bottom-4 left-5 bg-red-500 rounded-full w-6 h-6 flex justify-center items-center text-white">{`${cart.reduce(
                (accumulator, item) => {
                  return accumulator + item.quantity;
                },
                0
              )}`}</div>
            </div>

            <span className="font-bold text-white text-base caret-transparent hover:text-gray-300 transition-colors duration-300">
              {`$${cart
                .reduce((accumulator, item) => {
                  return accumulator + item.quantity * item.product.price;
                }, 0)
                .toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 md:z-30"></div>
          <ShoppingCart handleCartClick={handleCartClick} />
        </>
      )}
    </header>
  );
};

export default Header;
