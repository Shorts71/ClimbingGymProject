import { useCallback, useState, useEffect } from "react";
import Button from "../shared/button";
import useApi from "../shared/API";
import { useNavigate, useParams } from "react-router-dom";
import './products.style.css';

function EditProductPage() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        weight: "",
        rating: "",
    });

    const { loading, data, error, formError, refetch } = useApi(
        id ? `http://localhost:3000/products/${id}` : null,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        },
        { auto: false }
    );

    useEffect(() => {
        if (!id) {
            return;
        }
        fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
        
    }, [id]);

    useEffect(() => {
        if (!data) {
            return;
        }
        alert("Product successfully updated!");
        navigate("/products");
    }, [data, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value});
    };

    const handleSubmit = useCallback(
        
        (e) => {
            e.preventDefault();
            refetch(product);
        }, [product, refetch]
    );

    return (
        <div className="AddProductForm">
            <h1>Product Form</h1>

            <form className="productForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name</label><br/>
                <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                disabled={loading}
                required
                className="inputfield"
                /><br/>

                <label htmlFor="description">Description</label><br/>
                <textarea
                id="description"
                name="description"
                rows="4"
                style={{ resize: "none", height: '400px', width: '600px' }}
                onChange={handleChange}
                disabled={loading}
                required
                className="inputfield"
                ></textarea><br/>

                <label htmlFor="price">Price ($)</label><br/>
                <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                onChange={handleChange}
                disabled={loading}
                required
                className="inputfield"
                /><br/>

                <label htmlFor="weight">Weight ($)</label><br/>
                <input
                type="text"
                id="weight"
                name="weight"
                step="0.1"
                onChange={handleChange}
                disabled={loading}
                required
                className="inputfield"
                /><br/>

                <label htmlFor="category">Category</label><br/>
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
                </select><br/>

                <label htmlFor="rating">Rating</label><br/>
                <input
                type="number"
                id="rating"
                name="rating"
                step="0.1"
                onChange={handleChange}
                disabled={loading}
                required
                className="inputfield"
                /><br/>

                {/* <label htmlFor="image">Image</label><br/>
                <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
                required
                className="inputfield"
                /><br/> */}

                <div className="error" style={{ display: error ? "block" : "none", margin: "0 0 20px 0" }}>
                    <p>{error}</p>
                    <ul style={{display: formError?.length > 0 ? "block" : "none" }}>
                        {formError?.map((e, i) => (
                            <li key={i}>{e.message}</li>
                        ))}
                    </ul>
                </div>

                <Button type="submit">
                    {loading ? "Updating..." : "Update"}
                </Button>
            </form>
        </div>
    )
    
}

export default EditProductPage;
