import { useEffect, useState } from "react";
import Button from "../shared/button";
import { Link, useNavigate } from "react-router-dom";

const User = (props) => {
  const { user } = props;
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
    currentUser?.roles && ["admin"].includes(currentUser.roles);

  const editUser = () => {
    navigate(`/edit-user/${user._id}`);
  };

  const deleteUser = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you wish to delete this user?"
    );
    if (!confirmDeletion) {
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        alert("Could not delete user.");
        return;
      }

      alert("User deleted.");
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert("Deletion process was interrupted...");
    }
  };

  return (
    <main>
      <div className="user">
        <h3>{user.name}</h3>
        <p>Email Address: {user.email}</p>
        <p>Phone #: {user.phone}</p>
        <p>Address: {user.address}</p>
        <p>Created on: {user.createdAt}</p>
        <p>Role: {user.roles}</p>
        {canEditOrDelete && (
          <>
            <Button text="Edit" onClick={editUser} />
            <Button text="Delete" onClick={deleteUser} />
          </>
        )}
      </div>
    </main>
  );
};

export default User;
