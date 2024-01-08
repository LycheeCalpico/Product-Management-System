import Card from "react-bootstrap/Card";
import { Flex } from "antd";
import "./card.css";
import GroupButtons from "./GroupButtons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleEdit } from "../../../redux/editSlice";

const ProductCardItem = ({ product }) => {
  const navigate = useNavigate();
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(toggleEdit(!edit));
    navigate(`/edit-product/${product._id}`);
  };

  return (
    <Card className="custom-card w-full">
      <Card.Img
        className="img-size p-3"
        variant="top"
        src={product.image}
        onClick={(e) => navigate(`/product/${product._id}`)}
      />
      <Card.Body className="grid gap-y-2">
        <Card.Title className=" title-font">{product.name}</Card.Title>
        <Card.Text className="price-font">${product.price}</Card.Text>
        <Flex gap="small">
          <GroupButtons
            productData={{
              productID: product._id,
              productPrice: product.price,
              productQuantity: product.stockQuantity,
              productTitle: product.name,
              productDescription: product.description,
              productCategory: product.category,
            }}
          />
          <button
            className="flex items-center justify-center w-1/2 text-base border border-[#6B7280] rounded-md transition-colors duration-300 hover:bg-gray-300"
            onClick={handleEdit}
          >
            Edit
          </button>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default ProductCardItem;
