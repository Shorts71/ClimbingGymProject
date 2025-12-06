import ProductList from "./ProductList";
import SortBar from "./ProductSortBar";
import "./products.style.css";
import { useState } from "react";

const ProductsPage = (props) => {
  const { onAddToCartClick, onViewClick } = props;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [ratingOptions, setRatingOptions] = useState([]);

  return (
    <main>
      <div className="product-page-container">
        <SortBar
          setCategoryOptions={setCategoryOptions}
          setPriceOptions={setPriceOptions}
          setRatingOptions={setRatingOptions}
        />
        <ProductList
          categoryOptions={categoryOptions}
          priceOptions={priceOptions}
          ratingOptions={ratingOptions}
          onAddToCartClick={onAddToCartClick}
          onViewClick={onViewClick}
        />
      </div>
    </main>
  );
};

export default ProductsPage;
