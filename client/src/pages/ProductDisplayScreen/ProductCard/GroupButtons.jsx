import React, { useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart_,
  removeFromCart_,
  selectCart,
} from "../../../redux/cart.slice";
import axios from "axios";
import { updateCurrentProduct } from "../../../services/productService";

const GroupButtons = ({productData}) => {
  console.log("product", productData);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const count = cart.find(
    (item) => item.product._id === productData._id
  )
    ? cart.find((item) => item.product._id ===productData._id)
        .quantity
    : 0;
  const userID =
    localStorage.getItem("user") == null
      ? null
      : JSON.parse(localStorage.getItem("user")).others._id;

  async function handleIncrement() {
    dispatch(addToCart_());
    //dispatch(updateCurrentProduct(data));
    try {
      await axios
        .post("/api/cart/add", {
          product: productData,
          quantity: 1,
          userID: userID,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDecrement = async () => {
    if (count > 0) {
      // setCount(count - 1);
      dispatch(removeFromCart_());
      try {
        await axios
          .post("/api/cart/remove", {
            product: productData,
            userID: userID,
          })
          .then((response) => {
            console.log(response);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const displayCount = count > 0;

  return (
    <div className="flex w-1/2">
      {userID && (
        <Button.Group className="w-full">
          {displayCount && (
            <Button
              className="border-none flex justify-center items-center focus:outline-none focus:shadow-outline text-white text-base bg-chuwa-blue transition-colors duration-300 hover:bg-gray-300"
              onClick={() => handleDecrement()}
              disabled={count === 0}
            >
              -
            </Button>
          )}
          {displayCount && (
            <div className="w-1/2 bg-chuwa-blue flex items-center justify-center text-white">
              {count}
            </div>
          )}
          {displayCount && (
            <Button
              className="flex justify-center items-center border-none focus:outline-none focus:shadow-outline text-white text-base bg-chuwa-blue transition-colors duration-300 hover:bg-gray-300"
              onClick={() => handleIncrement()}
              disabled={count >= productData.stockQuantity}
            >
              +
            </Button>
          )}
          {!displayCount && (
            <Button
              className="flex w-full justify-center items-center border-none focus:outline-none focus:shadow-outline text-white text-base bg-chuwa-blue transition-colors duration-300 hover:bg-gray-300 "
              onClick={() => handleIncrement()}
              disabled={productData.stockQuantity === 0}
            >
              Add
            </Button>
          )}
        </Button.Group>
      )}
    </div>
  );
};

export default GroupButtons;
