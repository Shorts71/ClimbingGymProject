import ProductItem from "./ProductItem";
import useApi from "../shared/API";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductList = (props) => {
  console.log("API URL", import.meta.env.VITE_API_URL);

  const {
    categoryOptions,
    priceOptions,
    ratingOptions,
    onAddToCartClick,
    onViewClick,
  } = props;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
    }).then(async (res) => {
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setCurrentUser(data.user);
      } catch {
        console.error("Not JSON:", text);
      }
    });
  }, []);

  const canAdd =
    currentUser?.roles &&
    ["admin", "seller", "staff"].includes(currentUser.roles);

  const { loading, data, error } = useApi(
    `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );

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
    products = products.filter((product) =>
      categoryOptions.includes(product.category)
    );
  }

  if (priceOptions.length > 0) {
    products = products.filter((product) =>
      priceOptions.some(
        ([min, max]) => product.price >= min && product.price <= max
      )
    );
  }

  if (ratingOptions.length > 0) {
    products = products.filter((product) =>
      ratingOptions.some(
        ([min, max]) => product.rating >= min && product.rating <= max
      )
    );
  }

  return (
    <>
      <div className="CRUDBUTTONS">
        {canAdd && (
          <>
            <Button
              text="Add Product"
              onClick={() => navigate("/add-products")}
            />
          </>
        )}
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
      <div className="pagination">
        <Button text="Previous" onClick={() => page > 1 && setPage(page - 1)} />

        <span>Page {page}</span>

        <Button
          text="Next"
          onClick={() =>
            data && data.data.length === limit && setPage(page + 1)
          }
        />
      </div>
    </>
  );
};

export default ProductList;
