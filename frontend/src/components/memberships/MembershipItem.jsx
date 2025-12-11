import { useEffect, useState } from "react";
import Button from "../shared/button";
import { Link, useNavigate } from "react-router-dom";

const MembershipItem = (props) => {
  const { membership } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const canEditOrDelete =
    currentUser?.roles && ["admin", "staff"].includes(currentUser.roles);

  const editMembership = () => {
    navigate(`/edit-membership/${membership._id}`);
  };

  const deleteMembership = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you wish to delete this membership?"
    );
    if (!confirmDeletion) {
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/memberships/${membership._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        alert("Could not delete membership.");
        return;
      }

      alert("Membership deleted.");
      navigate("/memberships");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Deletion process was interrupted...");
    }
  };

  return (
    <main>
      <div className="membership">
        <h3>
            {membership.name}
        </h3>
        <p style={{ fontSize: 24 }}>
          <strong>$</strong>
          {membership.cost}
        </p>
        <p style={{ fontSize: 20 }}>
          <strong>Duration:</strong> {membership.duration} days
        </p>
        {membership.rentalInclusion && (
            <p>*Includes shoe rentals, harness rentals, and chalk rentals.</p>
        )}
        {canEditOrDelete && (
          <>
            <Button text="Edit" onClick={editMembership} />
            <Button text="Delete" onClick={deleteMembership} />
          </>
        )}
      </div>
    </main>
  );
};

export default MembershipItem;
