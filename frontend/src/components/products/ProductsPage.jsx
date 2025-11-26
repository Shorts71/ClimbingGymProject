import ProductList from "./ProductList";
import SortBar from "./ProductSortBar";

const ProductsPage = (props) => {
  const { onAddToCartClick, onViewClick } = props;

  return (
    <main>
      <div className="product-page-container">
        {/* <SortBar /> */}
        <ProductList onAddToCartClick={onAddToCartClick} onViewClick={onViewClick} />
      </div>

    </main>
  );
};

export default ProductsPage;
