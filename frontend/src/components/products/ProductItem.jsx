import { useEffect, useState } from "react";
import useApi from "../shared/API";
import Button from "../shared/button";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductItem = (props) => {
  const { product, onAddToCartClick } = props;
  const [currentUser, setCurrentUser] = useState(null);
  console.log("Current User: ", currentUser);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const canEditOrDelete =
    currentUser?.roles && ["admin", "staff"].includes(currentUser.roles);

  console.log("Can edit/delete?", canEditOrDelete, "Current user:", currentUser);

  const editProduct = () => {
    navigate(`/edit-product/${product._id}`);
  };

  const deleteProduct = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you wish to delete this product?"
    );
    if (!confirmDeletion) {
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${product._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        alert("Could not delete product.");
        return;
      }

      alert("Product deleted.");
      navigate("/products");
      window.location.reload(false);
    } catch (err) {
      console.error(err);
      alert("Deletion process was interrupted...");
    }
  };

  return (
    <div className="product">
      <Link to={`/product/${product._id}`}>
        <img
          style={{ width: 200, height: "auto" }}
          src={product.imageUrl}
          alt={product.name}
        />
      </Link>
      <h3>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "var(--primary)" }}
        >
          {product.name}
        </Link>
      </h3>
      <p style={{ fontSize: 24 }}>
        <strong>$</strong>
        {product.price}
      </p>
      <p style={{ fontSize: 20 }}>
        <strong>Rating: {product.rating}/10</strong>
      </p>
      {canEditOrDelete && (
        <>
        <Button text="Edit" onClick={editProduct} />
        <Button text="Delete" onClick={deleteProduct} />
        </>
      )}
      
      <Button text="Add to Cart" onClick={() => onAddToCartClick(product)} />
    </div>
  );
};

export default ProductItem;
