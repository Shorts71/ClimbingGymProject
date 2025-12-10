import { useState } from "react";
import "./App.css";
import Header from "./components/dashboard/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
// Product imports
import ProductsPage from "./components/products/ProductsPage";
import ProductDisplay from "./components/products/productDisplay/ProductDisplay";
import AddProductPage from "./components/products/AddProduct";
import EditProductPage from "./components/products/EditProduct";
import UploadImage from "./components/products/UploadProductImage";
// Membership imports
import MembershipPage from "./components/memberships/MembershipPage";
import AddMembership from "./components/memberships/AddMembership";
import EditMemberShip from "./components/memberships/EditMembership";
// User imports
import UserPage from "./components/users/UserPage";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
// Login imports
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
          {/* Products Paths */}
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
          <Route path="products-image/:id" element={<UploadImage />} />
          {/* Memberships Paths */}
          <Route path="/memberships" element={<MembershipPage />} />
          <Route path="/add-memberships" element={<AddMembership />} />
          <Route path="/edit-membership/:id" element={<EditMemberShip />} />
          {/* Users Paths */}
          <Route path="/users" element={<UserPage />} />
          <Route path="/add-users" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          {/* Login Paths */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-login" element={<OTPPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
