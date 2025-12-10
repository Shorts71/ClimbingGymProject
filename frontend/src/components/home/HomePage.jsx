import "./home.style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const isAdmin = currentUser?.roles && ["admin"].includes(currentUser.roles);

  return (
    <main>
      <p>Hello</p>

      {isAdmin && (
        <Link to="/users" className="link">
          View Users
        </Link>
      )}
      <Link to="/products" className="link">
        View Products
      </Link>
      <Link to="/memberships" className="link">
        View Memberships
      </Link>
    </main>
  );
}

export default HomePage;
