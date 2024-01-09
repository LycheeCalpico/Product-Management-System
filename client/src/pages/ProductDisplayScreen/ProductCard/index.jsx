import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ProductCardItem from "./ProductCardItem";
import "./card.css";
import PaginationBasic from "./PaginationBasic";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAllProducts } from "../../../services/productService";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = () => {
  const products = useSelector((state) => state.productList);
  const [sort, setSort] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = sort
    ? sortedProducts.slice(startIndex, endIndex)
    : products.slice(startIndex, endIndex);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAccess =
    localStorage.getItem("user") == null
      ? null
      : JSON.parse(localStorage.getItem("user")).others.role;

  useEffect(() => fetchAllProducts(dispatch), []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const updateSortedProducts = (sortingFunction) => {
    const sorted = [...products].sort(sortingFunction);
    setSortedProducts(sorted);
    setSort(true);
  };

  const sortLastAdded = () => {
    updateSortedProducts((a, b) => {
      if (a._id < b._id) return 1;
      if (a._id > b._id) return -1;
      return 0;
    });
  };
  const sortLowToHigh = () => {
    updateSortedProducts((a, b) => a.price - b.price);
  };

  const sortHighToLow = () => {
    updateSortedProducts((a, b) => b.price - a.price);
  };

  return (
    <div className="flex flex-col m-20 mb-auto">
      <div className="grid grid-rows-1 grid-cols-2 xs:grid-rows-2 xs:grid-cols-1 md:grid-rows-1 md:grid-cols-2 mb-4 gap-y-3">
        <p className="flex text-3xl font-bold xs:justify-center md:justify-start">
          Products
        </p>
        <div className="flex justify-end xs:row-start-2 xs:justify-center md:row-start-1 md:col-start-2 md:justify-end space-x-4">
          <div>
            <DropdownButton title="Sort By" variant="light">
              <Dropdown.Item onClick={sortLastAdded}>Last added</Dropdown.Item>
              <Dropdown.Item onClick={sortLowToHigh}>
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={sortHighToLow}>
                Price: High to Low
              </Dropdown.Item>
            </DropdownButton>
          </div>

          {userAccess === "admin" && (
            <div>
              <button
                className="lg:hidden px-4 py-2 text-base bg-chuwa-blue hover:bg-gray-500 text-white justify-center items-center rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/create-product")}
              >
                Add
              </button>
              <button
                className="hidden lg:inline px-4 py-2 text-base bg-chuwa-blue hover:bg-gray-500 text-white justify-center items-center rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/create-product")}
              >
                Add Product
              </button>{" "}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col rounded">
        <div className=" bg-white p-6 grid grid-flow-row gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {displayedProducts.map((product) => {
            return <ProductCardItem key={product._id} product={product} />;
          })}
        </div>
        <div className="flex justify-end xs:justify-center md:justify-end my-6">
          <PaginationBasic onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
