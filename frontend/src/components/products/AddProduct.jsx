import { useCallback, useState, useEffect } from "react";
import Button from "../shared/button";
import useApi from "../shared/API";
import { useNavigate } from "react-router-dom";
import "./products.style.css";

function AddProductPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const { loading, data, error, formError, refetch } = useApi(
    `${import.meta.env.VITE_API_URL}/products`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    { auto: false }
  );

  useEffect(() => {
    if (!data) return;
    alert(`Successfully added new product.`);
    navigate(`/products-image/${data._id}`);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const body = { ...product };
      refetch(body);
    },
    [product, refetch]
  );

  if (
    !currentUser ||
    !["admin", "seller", "staff"].includes(currentUser.roles)
  ) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div className="AddProductForm">
      <h1>Product Form</h1>

      <form className="productForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          name="description"
          rows="4"
          style={{ resize: "none", height: "400px", width: "600px" }}
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        ></textarea>
        <br />

        <label htmlFor="price">Price ($)</label>
        <br />
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="weight">Weight (g)</label>
        <br />
        <input
          type="text"
          id="weight"
          name="weight"
          step="0.1"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="category">Category</label>
        <br />
        <select
          id="category"
          name="category"
          disabled={loading}
          onChange={handleChange}
          required
          className="inputfield"
        >
          <option value="">Select a category...</option>
          <option value="Climbing Shoes">Climbing Shoes</option>
          <option value="Harness">Harness</option>
          <option value="Belay Gear">Belay Gear</option>
          <option value="Chalk">Chalk</option>
        </select>
        <br />

        <label htmlFor="rating">Rating</label>
        <br />
        <input
          type="number"
          id="rating"
          name="rating"
          step="0.1"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <div
          className="error"
          style={{ display: error ? "block" : "none", margin: "0 0 20px 0" }}
        >
          <p>{error}</p>
          <ul style={{ display: formError?.length > 0 ? "block" : "none" }}>
            {formError?.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>

        <Button type="submit">{loading ? "Adding..." : "Add"}</Button>
      </form>
    </div>
  );
}

export default AddProductPage;
