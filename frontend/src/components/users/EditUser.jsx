import { useCallback, useState, useEffect } from "react";
import Button from "../shared/button";
import useApi from "../shared/API";
import { useNavigate, useParams } from "react-router-dom";
import "./users.style.css";

function EditUser() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    roles: "",
  });

  const { loading, data, error, formError, refetch } = useApi(
    `${import.meta.env.VITE_API_URL}/users/${id}`,
    {
      method: "PUT",
      credentials: "include",
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
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
  }, [id]);

  useEffect(() => {
    if (!data) {
      return;
    }
    alert("User successfully updated!");
    navigate("/users");
  }, [data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      refetch(user);
    },
    [user, refetch]
  );

  if (!currentUser || !["admin"].includes(currentUser.roles)) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div className="AddUserForm">
      <h1>Membership Form</h1>

      <form className="userForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
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

        <label htmlFor="email">Email Address</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="phone">Phone #</label>
        <br />
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="roles">Role</label>
        <br />
        <select
          id="roles"
          name="roles"
          disabled={loading}
          onChange={handleChange}
          required
          className="inputfield"
        >
          <option value="">Choose a role...</option>
          <option value="staff">Staff Member</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
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

export default EditUser;
