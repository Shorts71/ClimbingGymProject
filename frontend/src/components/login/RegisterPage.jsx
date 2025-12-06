import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/button";
import useApi from "../shared/API";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const { loading, data, error, formError, refetch } = useApi(
    "http://localhost:3000/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    { auto: false }
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    alert("Your account has been successfully registered!");
    navigate("/login", {
        credentials
    });
  }, [data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const body = credentials;
      refetch(body);
    },
    [credentials, refetch]
  );

  return (
    <div>
      <h1>Register an Account</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          disabled={loading}
          required
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
        ></input>
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
        />
        <br />

        <label htmlFor="phone">Phone #</label>
        <br />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={handleChange}
          disabled={loading}
          required
        />
        <br />

        <label htmlFor="address">Address</label>
        <br />
        <input
          type="text"
          id="address"
          name="address"
          disabled={loading}
          onChange={handleChange}
          required
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

        <Button type="submit">{loading ? "Registering..." : "Register"}</Button>
      </form>
    </div>
  );
};

export default RegisterPage;