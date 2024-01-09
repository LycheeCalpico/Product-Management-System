import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { FileImageOutlined } from "@ant-design/icons";
import "./product.css";
import { createProduct } from "../../../services/productService";

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Choose...",
    price: 0,
    stockQuantity: 0,
    image: "",
});

  const [errors, setErrors] = useState({ });
   
  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Name is required!";
    if (product.category === "Choose...")
      newErrors.category = "Category is required!";
    if (isNaN(product.price) || product.price < 0)
      newErrors.price = "Price must be a positive number!";
    if (isNaN(product.stockQuantity) || product.stockQuantity < 0)
      newErrors.stockQuantity = "Stock quantity must be a positive number!";
    if (!product.image.trim()) newErrors.image = "Image is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      createProduct(product, dispatch);
      navigate("/display-product");
    } catch (error) {
      console.log("error adding prodcut", error.message);
    }
  };

  return (
    <div className="container mb-5">
      <h1 className="title mb-4 text-center">Create Product</h1>

      <Form className="form-field">
        <Form.Group className="mb-3">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              isInvalid={!!errors.category}
              defaultValue="Choose..."
            >
              <option value="Choose...">Choose...</option>
              <option value="watch">watch</option>
              <option value="phone">phone</option>
              <option value="laptop">laptop</option>
              <option value="accessories">accessories</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>In Stock Quantity</Form.Label>
            <Form.Control
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleInputChange}
              isInvalid={!!errors.stockQuantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.stockQuantity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={8}>
            <Form.Label>Add Image Link</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="http://"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>

              <button className="btn btn-primary bg-chuwa-blue ">Upload</button>
            </InputGroup>
          </Form.Group>
        </Row>
        <Form.Group className="image-field mb-3">
          <div className="image-icon">
            <FileImageOutlined />
          </div>
          <div>Image Preview!</div>
        </Form.Group>
        <button
          className="btn bg-chuwa-blue btn-primary btn-size d-block mx-auto mx-md-0"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </Form>
    </div>
  );
};

export default ProductForm;
