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
      <div className="homepage-message">
      <p>
        Hello, and welcome to The Peak. Here, we offer not just our
        memberships at our climbing gym, but to view the products that
        we offer in person as well! <br/> <br/>

        To offer the best experience that we can, we set up this website
        so that climbers both in and outside of our building can still access
        the necessary services to make their climbing experience better than ever. <br/><br/>

        To get started, click on one of the two links to access whichever service you are
        in need of.<br/><br/>
      </p>

      {isAdmin && (
        <Link to="/users" className="link">
          View Users
        </Link>
      )}<br/>
      <Link to="/products" className="link">
        View Products
      </Link><br/>
      <Link to="/memberships" className="link">
        View Memberships
      </Link>
      </div>
    </main>
  );
}

export default HomePage;
