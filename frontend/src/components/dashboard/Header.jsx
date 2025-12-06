import Button from "../shared/button";
import PeakLogo from "../../assets/PeakLogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./dashboard.style.css";

const Header = (props) => {
    const { productsInCart } = props;
    
    return (
        <>
            <header>
                <img style={{ width: 200}} src={PeakLogo} alt="The Peak" />
                <div className="title">
                    <h2>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>
                        The Peak Climbing Gym Shop
                        </Link>
                    </h2>
                </div>
                <Link to="/register" className="navLink">Register</Link>
                <Link to="/login" className="navLink">Login</Link>
                <Button className="CartButton" text={`Cart(${productsInCart.length})`} onClick={() => {}} />
            </header>
            <div className="navbar-links">
                <Link to="/" className="navlink">Home</Link>
                <Link to="/products" className="navlink">Products</Link>
                <Link to="/memberships" className="navlink">Memberships</Link>
            </div>
        </>
        
    );
};

export default Header;