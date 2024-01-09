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

const GroupButtons = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const count = cart.find(
    (item) => item.product._id === props.productData.productID
  )
    ? cart.find((item) => item.product._id === props.productData.productID)
        .quantity
    : 0;
  const userID =
    localStorage.getItem("user") == null
      ? null
      : JSON.parse(localStorage.getItem("user")).others._id;

  async function handleIncrement(data) {
    dispatch(addToCart_(data));
    //dispatch(updateCurrentProduct(data));
    try {
      await axios
        .post("/api/cart/add", {
          product: data,
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

  const handleDecrement = async (data) => {
    if (count > 0) {
      // setCount(count - 1);
      dispatch(removeFromCart_(data));
      try {
        await axios
          .post("/api/cart/remove", {
            product: data,
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
              onClick={() => handleDecrement(props.productData)}
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
              onClick={() => handleIncrement(props.productData)}
              disabled={count >= props.productData.productQuantity}
            >
              +
            </Button>
          )}
          {!displayCount && (
            <Button
              className="flex w-full justify-center items-center border-none focus:outline-none focus:shadow-outline text-white text-base bg-chuwa-blue transition-colors duration-300 hover:bg-gray-300 "
              onClick={() => handleIncrement(props.productData)}
              disabled={props.productData.productQuantity === 0}
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
