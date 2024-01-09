import axios from "axios";
import { addToCart, removeFromCart } from "../redux/cartSlice";

const CART_API = "http://localhost:4000/api/cart";

export const addItemToCart = (productID, dispatch) => {
    axios.post(`${CART_API}/add`, { productID }).then((res) => {
        dispatch(addToCart(res.data));
    });
    }