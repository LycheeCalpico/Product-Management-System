import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Layout } from "antd";
const { Content } = Layout;
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { fetchCart } from "../../redux/cart.slice";
import { useDispatch } from "react-redux";

const ProductDisplayScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(userInfo.others._id);
    dispatch(fetchCart(userInfo.others._id));
  }, []);
  return (
    <Layout>
      <Header userInfo={userInfo} />
      <Content>
        <ProductCard/>
      </Content>
      <Footer />
    </Layout>
  );
};

export default ProductDisplayScreen;
