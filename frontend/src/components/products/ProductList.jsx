import ProductItem from "./ProductItem";
import useApi from "../shared/API";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";

const ProductList = (props) => {
  const {
    categoryOptions,
    priceOptions,
    ratingOptions,
    onAddToCartClick,
    onViewClick,
  } = props;
  const navigate = useNavigate();

  const { loading, data, error } = useApi("http://localhost:3000/products", {
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

  let products = data?.data ? [...data.data] : [];

if (categoryOptions.length > 0) {
  products = products.filter(product =>
    categoryOptions.includes(product.category)
  );
}

if (priceOptions.length > 0) {
  products = products.filter(product =>
    priceOptions.some(([min, max]) =>
      product.price >= min && product.price <= max
    )
  );
}

if (ratingOptions.length > 0) {
  products = products.filter(product =>
    ratingOptions.some(([min, max]) =>
      product.rating >= min && product.rating <= max
    )
  );
}


  return (
    <>
      <div className="CRUDBUTTONS">
        <Button text="Add Product" onClick={() => navigate("/add-products")} />
      </div>
      <div id="product-list-container">
        {products.map((product, index) => (
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
