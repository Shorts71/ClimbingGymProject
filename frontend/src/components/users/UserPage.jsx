import UserList from "./UserList";
import UserSortBar from "./UserSort";
import { useState } from "react";
import "./users.style.css";

const UserPage = () => {
  const [userOptions, setUserOptions] = useState([]);

  return (
    <main>
      <div className="user-page-container">
        <UserSortBar setUserOptions={setUserOptions} />
        <UserList userOptions={userOptions} />
      </div>
    </main>
  );
};

export default UserPage;
