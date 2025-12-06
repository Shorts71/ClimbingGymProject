import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../shared/button";
import useApi from "../shared/API";

const OTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { credentials } = location.state || {};

  const [otp, setOTP] = useState({
    otp: "",
  });

  const { loading, data, error, formError, refetch } = useApi(
    "http://localhost:3000/users/verify-login",
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
    navigate("/");
  }, [data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOTP({ ...otp, [name]: value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const body = {
        ...otp,
        ...credentials,
      };
      refetch(body);
    },
    [otp, refetch, credentials]
  );

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">OTP</label>
        <br />
        <input
          type="text"
          id="otp"
          name="otp"
          onChange={handleChange}
          disabled={loading}
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

export default OTPPage;