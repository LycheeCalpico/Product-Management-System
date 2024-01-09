import {createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        decrementOne: (state, action) => {
            state.items.push(action.payload);
        }
       
      
    },
    });

export const { addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;