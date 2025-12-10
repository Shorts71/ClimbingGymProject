import MembershipItem from "./MembershipItem";
import useApi from "../shared/API";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MembershipList = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const canAdd =
    currentUser?.roles && ["admin", "staff"].includes(currentUser.roles);

  const { loading, data, error } = useApi("http://localhost:3000/memberships", {
    method: "GET",
  });

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  let memberships = Array.isArray(data) ? data : data?.data || [];

  console.log("memberships:", data);

  return (
    <>
      <div className="CRUDBUTTONS">
        {canAdd && (
          <>
            <Button
              text="Add Membership"
              onClick={() => navigate("/add-memberships")}
            />
          </>
        )}
      </div>
      <div id="membership-list-container">
        {memberships?.map((membership, index) => (
          <MembershipItem key={index} membership={membership} />
        ))}
      </div>
    </>
  );
};

export default MembershipList;
