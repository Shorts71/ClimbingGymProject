import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../shared/button";
import useApi from "../shared/API";
import './login.styles.css'

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedCredentials = location.state || {};

  const [credentials, setCredentials] = useState({
    email: passedCredentials.email,
    password: passedCredentials.password,
  });

  const { loading, data, error, formError, refetch } = useApi(
    `${import.meta.env.VITE_API_URL}/users/login`,
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
    navigate("/verify-login", {
      state: { credentials, data },
    });
  }, [data, navigate, credentials]);

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
    <div id="register-page-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="email" className="registerLabel">Email Address</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          disabled={loading}
          required
          className="registerInput"
        ></input>
        <br />

        <label htmlFor="password" className="registerLabel">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          disabled={loading}
          required
          className="registerInput"
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

        <Button type="submit">{loading ? "Logging in..." : "Login"}</Button>
      </form>
    </div>
  );
};

export default LoginPage;
