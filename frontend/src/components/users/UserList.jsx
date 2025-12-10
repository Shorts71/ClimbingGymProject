import User from "./User";
import useApi from "../shared/API";
import Button from "../shared/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UserList = () => {
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
    currentUser?.roles && ["admin"].includes(currentUser.roles);

  const { loading, data, error } = useApi("http://localhost:3000/users", {
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

  let users = Array.isArray(data) ? data : data?.data || [];

  console.log("Users:", data);
  
    if (!currentUser || !["admin", "staff"].includes(currentUser.roles)) {
        return <p>You do not have permission to access this page.</p>;
    }

  return (
    <>
      <div className="CRUDBUTTONS">
        {canAdd && (
          <>
            <Button
              text="Add User"
              onClick={() => navigate("/add-users")}
            />
          </>
        )}
      </div>
      <div id="user-list-container">
        {users?.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </>
  );
};

export default UserList;