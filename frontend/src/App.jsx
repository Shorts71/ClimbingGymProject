import { useState } from "react";
import "./App.css";
import Header from "./components/dashboard/Header";
import ProductsPage from "./components/products/ProductsPage";
import HomePage from "./components/home/HomePage";
import ProductDisplay from "./components/products/productDisplay/ProductDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductPage from "./components/products/AddProduct";
import EditProductPage from "./components/products/EditProduct";
import RegisterPage from "./components/login/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import OTPPage from "./components/login/OTPVerify";

function App() {
  const [productsInCart, setProductInCart] = useState([]);

  const addProductInCart = (product) => {
    const updatedProductInCart = productsInCart.concat([product]);
    setProductInCart(updatedProductInCart);
  };

  return (
    <>
      <BrowserRouter>
        <Header productsInCart={productsInCart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={<ProductsPage onAddToCartClick={addProductInCart} />}
          />
          <Route path="/add-products" element={<AddProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route
            path="/product/:id"
            element={<ProductDisplay onAddToCartClick={addProductInCart} />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/verify-login"
            element={<OTPPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
