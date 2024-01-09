import { useDispatch } from "react-redux";
import {
  addToCart_,
  removeFromCart_,
  removeOneProductFromCart_,
} from "../redux/cart.slice";

import axios from "axios";

export default function CartItem({ product, quantity }) {
  const {
    Date,
    _id,
    description,
    category,
    image,
    name,
    price,
    stockQuantity,
  } = product;
  const dispatch = useDispatch();
  
  async function handleIncrement(data) {
    const userID = JSON.parse(localStorage.getItem("user")).others._id;
    dispatch(addToCart_(data));
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
    const userID = JSON.parse(localStorage.getItem("user")).others._id;
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
  };
  const handleRemove = async (data) => {
    const userID = JSON.parse(localStorage.getItem("user")).others._id;
    dispatch(removeOneProductFromCart_(data));
    try {
      await axios
        .post("/api/cart/removeOne", {
          product: data,
          userID: userID,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-24 flex flex-row pb-6">
      <div className="w-[20%] h-full bg-white">
        <img src={image} />
      </div>
      <div className="relative w-[80%]">
        <h3 className="absolute top-0 left-2 font-bold">{name}</h3>
        <div className="absolute top-0 right-2 text-indigo-600">{`$${price.toFixed(
          2
        )}`}</div>
        <div className="absolute bottom-0 left-2 w-12 h-4 flex border border-grey-500">
          <div className="flex items-center justify-center w-[33%] h-full cursor-pointer">
            <div
              className="font-light text-sm text-grey-500"
              onClick={(e) => {
                return handleDecrement({
                  productID: _id,
                  productDate: Date,
                  productPrice: price,
                  productQuantity: stockQuantity,
                  productTitle: name,
                  productImage: image,
                  productDescription: description,
                  productCategory: category,
                });
              }}
            >
              -
            </div>
          </div>
          <div className="flex items-center justify-center w-[33%] h-full border-left border-grey-500">
            <div className="font-light text-xs text-grey-500 border-x pl-1 pr-1">
              {quantity}
            </div>
          </div>
          <div className="flex items-center justify-center w-[33%] h-full cursor-pointer">
            <div
              className="font-light text-sm text-grey-500"
              onClick={(e) => {
                if (quantity < stockQuantity)
                  return handleIncrement({
                    productID: _id,
                    productDate: Date,
                    productPrice: price,
                    productQuantity: stockQuantity,
                    productTitle: name,
                    productImage: image,
                    productDescription: description,
                    productCategory: category,
                  });
              }}
            >
              +
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 right-2 text-sm text-gray-600 underline cursor-pointer"
          onClick={(e) => {
            return handleRemove({
              productID: _id,
              productDate: Date,
              productPrice: price,
              productQuantity: stockQuantity,
              productTitle: name,
              productImage: image,
              productDescription: description,
              productCategory: category,
            });
          }}
        >
          Remove
        </div>
      </div>
    </div>
  );
}
