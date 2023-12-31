import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import productListReducer from "../redux/productListSlice";
import cartReducer from "./cart.slice";
import storage from "redux-persist/lib/storage";
import editReducer from "../redux/editSlice";
import productItemReducer from "../redux/productItemSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = {
  auth: authReducer,
  productList: productListReducer,
  productItem: productItemReducer,
  cart: cartReducer,
  edit: editReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// const appReducer = combineReducers({
//   auth: authReducer,
//   product: productReducer,
//   cart: cartReducer,
// });

// const rootReducer = (state, action) => {
//   if (action.type === "auth/logout_") {
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// //export default store;
// export default configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

export default store;
