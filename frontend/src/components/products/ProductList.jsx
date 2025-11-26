import ProductItem from "./ProductItem";
import useApi from "../shared/API";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";

const ProductList = (props) => {
  const { onAddToCartClick, onViewClick } = props;
  const navigate = useNavigate();

  const {loading, data, error } = useApi("http://localhost:3000/products", {
    method: "GET",
  });
  
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
    <div className="CRUDBUTTONS">
      <Button text="Add to Cart" onClick={() => navigate("/add-products")}/>
      <Button text="Add to Cart" onClick={() => onAddToCartClick(product)}/>
      <Button text="Add to Cart" onClick={() => onAddToCartClick(product)}/>
    </div>
    <div id="product-list-container">
      {data?.data?.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          onViewClick={onViewClick}
          onAddToCartClick={onAddToCartClick}
        />
      ))}
    </div>
    </>
    
  );
};

export default ProductList;
