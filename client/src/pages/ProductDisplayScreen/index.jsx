import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Layout } from "antd";
const { Content } = Layout;
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { fetchCart } from "../../redux/cart.slice";
import { useDispatch } from "react-redux";

const ProductDisplayScreen = () => {
  const userInfo =
    localStorage.getItem("user") == null
      ? null
      : JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(userInfo.others._id);
    if (userInfo) dispatch(fetchCart(userInfo.others._id));
  }, []);
  return (
    <Layout className="min-h-screen justify-between">
      <Header userInfo={userInfo} />
      <ProductCard />
      <Footer />
    </Layout>
  );
};

export default ProductDisplayScreen;
