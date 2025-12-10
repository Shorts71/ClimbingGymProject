import { useCallback, useState, useEffect } from "react";
import Button from "../shared/button";
import useApi from "../shared/API";
import { useNavigate, useParams } from "react-router-dom";
import "./memberships.style.css";

function EditMembershipPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const { id } = useParams();

  const [membership, setMembership] = useState({
    name: "",
    duration: "",
    cost: "",
    rentalInclusion: "",
  });

  const { loading, data, error, formError, refetch } = useApi(
    `${import.meta.env.VITE_API_URL}/memberships/${id}`,
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
    fetch(`${import.meta.env.API_URL}/memberships/${id}`)
      .then((res) => res.json())
      .then((data) => setMembership(data));
  }, [id]);

  useEffect(() => {
    if (!data) {
      return;
    }
    alert("Membership successfully updated!");
    navigate("/memberships");
  }, [data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembership({ ...membership, [name]: value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      refetch(membership);
    },
    [membership, refetch]
  );

  if (!currentUser || !["admin", "staff"].includes(currentUser.roles)) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div className="AddMembershipForm">
      <h1>Membership Form</h1>

      <form className="membershipForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Membership Name</label>
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

        <label htmlFor="duration">Duration</label>
        <br />
        <input
          type="number"
          id="duration"
          name="duration"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="cost">Price ($)</label>
        <br />
        <input
          type="number"
          id="cost"
          name="cost"
          step="1"
          onChange={handleChange}
          disabled={loading}
          required
          className="inputfield"
        />
        <br />

        <label htmlFor="rentalInclusion">Rentals</label>
        <br />
        <select
          id="rentalInclusion"
          name="rentalInclusion"
          disabled={loading}
          onChange={handleChange}
          required
          className="inputfield"
        >
          <option value="">Specify inclusion...</option>
          <option value={false}>Not included</option>
          <option value={true}>Included</option>
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

        <Button type="submit">{loading ? "Updating..." : "Update"}</Button>
      </form>
    </div>
  );
}

export default EditMembershipPage;
