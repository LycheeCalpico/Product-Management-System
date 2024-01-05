import { React, useState } from "react";
import { useNavigate, createSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_, logout_, selectUser } from "../../redux/auth.slice";
import ShoppingCart from "./ShoppingCart";
import axios from "axios";

const Header = ({ userInfo }) => {
  const user = useSelector(selectUser);
  const userID = JSON.parse(localStorage.getItem("user")).others._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
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
          console.log(response.data);
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
        <form onSubmit={handleSubmit}>
          <div className="xs:row-start-2 xs:col-span-2 md:row-start-1 md:col-span-1 md:col-start-2 flex w-full items-center bg-white rounded-md">
            <input
              className="text-base w-full text-gray-400 outline-none px-2 py-2 rounded-md"
              type="search"
              name="search"
              placeholder="Search"
              required={true}
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
            <div className="absolute bottom-4 left-5 bg-red-500 rounded-full w-6 h-6 flex justify-center items-center text-white">{`${mockCartItems.reduce(
              (accumulator, item) => {
                return accumulator + item.quantity;
              },
              0
            )}`}</div>
          </div>
          <span className="font-bold text-white text-base caret-transparent hover:text-gray-300 transition-colors duration-300">
            {`$${mockCartItems
              .reduce((accumulator, item) => {
                return accumulator + item.quantity * item.price;
              }, 0)
              .toFixed(2)}`}
          </span>
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
