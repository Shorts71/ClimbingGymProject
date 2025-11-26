import "./home.style.css";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <main>
            <p>Hello</p>

            <Link to="/products" className="link">
                View Products
            </Link>
            <Link to="/memberships" className="link">
                View Memberships
            </Link>
        </main>
    );
};

export default HomePage;