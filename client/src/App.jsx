import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/AuthenticationScreen/HomePage";
import LoginPage from "./pages/AuthenticationScreen/LoginPage";
import SignUpPage from "./pages/AuthenticationScreen/SignUpPage";
import ForgotPasswordPage from "./pages/AuthenticationScreen/ForgotPasswordPage";
import ErrorPage from "./pages/ErrorPage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrivateRoute } from "./PrivateRoute";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductCreateScreen from "./pages/ProductCreateScreen";
import ProductDisplayScreen from "./pages/ProductDisplayScreen";
import SearchResultPage from "./pages/SearchResultPage";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Dummy from "./pages/Dummy";
import store from "./redux/store";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  var isLoggedIn = localStorage.getItem("user");
  var persistor = persistStore(configureStore);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Routes>
        {/* <Route
          index
          element={isLoggedIn ? <ProductDisplayScreen /> : <HomePage />}
        /> */}
        <Route index element={<ProductDisplayScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<ProductCreateScreen />} />
        <Route path="/edit-product/:id" element={<ProductCreateScreen />} />
       
        <Route
          path="/display-product"
          element={
            //<PrivateRoute isAuth={isLoggedIn}>
            <ProductDisplayScreen />
            ///* </PrivateRoute> */
          }
        />

        <Route path="/checkout" element={<Dummy />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
