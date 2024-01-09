import { Layout } from "antd";
const { Content } = Layout;
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ProductCard from "./ProductDisplayScreen/ProductCard";
import ProductCardItem from "./ProductDisplayScreen/ProductCard/ProductCardItem";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import PaginationBasic from "./ProductDisplayScreen/ProductCard/PaginationBasic";
import { useNavigate } from "react-router-dom";

const SearchResultPage = () => {
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  async function fetchResults() {
    const searchKey = searchParams.get("searchKey");
    try {
      await axios.get(`/api/product/search/${searchKey}`).then((response) => {
        //console.log(response.data);
        setProducts(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
  const setLastAdded = () => {
    const sortedProducts = products.sort((a, b) => {
      if (a._id < b._id) return 1;
      if (a._id > b._id) return -1;
      return 0;
    });
    setProducts([...sortedProducts]);
  };

  const setLowToHigh = () => {
    const sortedProducts = products.sort((a, b) => a.price - b.price);
    setProducts([...sortedProducts]);
  };

  const setHighToLow = () => {
    const sortedProducts = products.sort((a, b) => b.price - a.price);
    setProducts([...sortedProducts]);
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <Header userInfo={userInfo} />

      <div className="flex flex-col w-full h-screen p-5 min-h-[75dvh]">
        <div className="grid grid-rows-1 grid-cols-2 xs:grid-rows-2 xs:grid-cols-1 md:grid-rows-1 md:grid-cols-2 mb-4 gap-y-3">
          <p className="flex text-3xl font-bold xs:justify-center md:justify-start">
            Products
          </p>
          <div className="flex justify-end xs:row-start-2 xs:justify-center md:row-start-1 md:col-start-2 md:justify-end space-x-4">
            <div>
              <DropdownButton title="Sort By" variant="light">
                <Dropdown.Item onClick={setLastAdded}>Last added</Dropdown.Item>
                <Dropdown.Item onClick={setLowToHigh}>
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={setHighToLow}>
                  Price: High to Low
                </Dropdown.Item>
              </DropdownButton>
            </div>
            <div>
              <button
                className="hidden md:inline px-4 py-2 text-base bg-chuwa-blue hover:bg-gray-500 text-white justify-center items-center rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/create-product")}
              >
                Add Product
              </button>

              <button
                className="md:hidden px-4 py-2 font-bold text-base bg-chuwa-blue hover:bg-gray-500 text-white justify-center items-center rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/create-product")}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full  justify-between bg-white rounded p-4">
          <div className="grid grid-flow-row gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products &&
              products.slice(startIndex, endIndex).map((product) => (
                <ProductCardItem key={product._id} product={product} />
              ))}
          </div>
          <div className="flex justify-content-end">
            <PaginationBasic onPageChange={handlePageChange}/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default SearchResultPage;
