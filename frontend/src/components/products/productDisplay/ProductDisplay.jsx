import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../shared/button";

const ProductDisplay = (props) => {
  const { product, onAddToCartClick } = props;

  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}products/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!currentProduct) {
    return <p>Loading product...</p>;
  }

  return (
    <>
      <div className="ProductDisplay">
        <div className="ProductDisplayImage">
          <img
            style={{ width: 400, height: "auto" }}
            src={currentProduct.imageUrl}
          />
        </div>
        <div className="ProductMainDetails">
          <h1>{currentProduct.name}</h1>
          <div className="category-and-price">
            <p>{currentProduct.category}</p>
            <p>Price: {currentProduct.price}</p>
            <p>Rating: {currentProduct.rating}/10</p>
            <Button
              text="Add to Cart"
              onClick={() => onAddToCartClick(product)}
            />
          </div>
        </div>
      </div>

      <div className="ProductSecondaryDetails">
        <h2>Details</h2>
        <p>Description: {currentProduct.description}</p>
        <p>Weight: {currentProduct.weight}g</p>
      </div>
    </>
  );
};

export default ProductDisplay;
