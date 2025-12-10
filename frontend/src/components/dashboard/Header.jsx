import Button from "../shared/button";
import PeakLogo from "../../assets/PeakLogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./dashboard.style.css";

const Header = (props) => {
  const { productsInCart } = props;
  const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      fetch("http://localhost:3000/me", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setCurrentUser(data.user))
        .catch((err) => console.error(err));
    }, []);

    const isAdmin =
        currentUser?.roles && ["admin"].includes(currentUser.roles);

  return (
    <>
      <header>
        <img style={{ width: 200 }} src={PeakLogo} alt="The Peak" />
        <div className="title">
          <h2>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              The Peak Climbing Gym Shop
            </Link>
          </h2>
        </div>

        <Button
          className="CartButton"
          text={`Cart(${productsInCart.length})`}
          onClick={() => {}}
        />
      </header>
      <div className="navbar-links" style={{ borderRadius: 0 }}>
        <Link to="/register" className="loginNavLink">
          Register
        </Link>
        <Link to="/login" className="loginNavLink">
          Login
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navlink">
          Home
        </Link>
        {isAdmin && (
        <Link to="/users" className="navlink">
          Users
        </Link>
        )}
        <Link to="/products" className="navlink">
          Products
        </Link>
        <Link to="/memberships" className="navlink">
          Memberships
        </Link>
      </div>
    </>
  );
};

export default Header;
