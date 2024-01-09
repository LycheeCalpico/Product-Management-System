import React, { useState } from "react";
import CartItem from "../CartItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../redux/cart.slice";
import { useNavigate } from "react-router-dom";

const mockCartItems = [
  // {
  //   productName: "Apple Macbook Pro",
  //   price: 1599,
  //   quantity: 1,
  //   _id: 123,
  // },
  // {
  //   productName: "Apple Watch",
  //   price: 299,
  //   quantity: 3,
  //   _id: 345,
  // },
];

const coupons = {
  GIMME20OFF: -20,
  TENDOZENS: -120,
  FIFTYONME: -50,
};

const ShoppingCart = ({ handleCartClick }) => {
  // Redux persist cart
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");

  const handleCouponAdd = (e) => {
    e.preventDefault();
    if (coupons[coupon]) {
      setDiscount(coupons[coupon]);
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <>
      <div className="absolute top-0 right-0 sm:w-full md:w-1/3 bg-indigo-600 z-50">
        <div className="flex justify-between">
          <h2 className="mt-4 mb-4 ml-8 text-2xl font-bold text-white flex items-center">
            Cart
            <span className="text-sm ml-2 font-normal">{`(${cart.reduce(
              (accumulator, item) => {
                return accumulator + item.quantity;
              },
              0
            )})`}</span>
          </h2>
          <div className="mt-6 mr-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              className="h-6 w-6 cursor-pointer"
              onClick={handleCartClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="w-full pl-[5%] pr-[5%] pt-6 bg-white flex flex-col justify-center items-center border-b border-stone-300">
          {cart.map((product, index) => {
            return (
              <CartItem
                product={product.product}
                key={index}
                quantity={product.quantity}
              />
            );
          })}
          <div className="w-full pb-10">
            <p className="text-xs text-stone-500 mt-4">Apply Discount Code</p>
            <div className="flex justify-between">
              <input
                placeholder="NEWYEAR2024"
                type="text"
                className="w-full p-2 mt-3 mr-6 border border-stone-300 py-2 rounded"
                value={coupon}
                onChange={(e) => {
                  return setCoupon(e.target.value);
                }}
              />
              <button
                className="bg-indigo-600 text-white text-sm px-5 py-3 mt-3 rounded"
                onClick={handleCouponAdd}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-white pl-[5%] pr-[5%] flex flex-col">
          <ul>
            <li className="flex justify-between mt-4">
              <p className="font-bold">Subtotal</p>
              <p className="font-bold">{`$${cart
                .reduce((accumulator, item) => {
                  return (
                    accumulator + item.quantity * parseInt(item.product.price)
                  );
                }, 0)
                .toFixed(2)}`}</p>
            </li>
            <li className="flex justify-between mt-4">
              <p className="font-bold">Tax</p>
              <p className="font-bold">{`$${(
                cart.reduce((accumulator, item) => {
                  return (
                    accumulator + item.quantity * parseInt(item.product.price)
                  );
                }, 0) * 0.1
              ).toFixed(2)}`}</p>
            </li>
            <li className="flex justify-between mt-4">
              <p className="font-bold">Discount</p>
              <p className="font-bold">{`${discount < 0 ? "-" : ""}$${Math.abs(
                discount
              ).toFixed(2)}`}</p>
            </li>
            <li className="flex justify-between mt-4 mb-4">
              <p className="font-bold">Estimated total</p>
              <p className="font-bold">{`$${(
                cart.reduce((accumulator, item) => {
                  return (
                    accumulator + item.quantity * parseInt(item.product.price)
                  );
                }, 0) *
                  1.1 +
                discount
              ).toFixed(2)}`}</p>
            </li>
          </ul>
          <button
            className="bg-indigo-600 text-white text-sm px-5 py-3 rounded mb-4"
            onClick={(e) => Navigate("/checkout")}
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
