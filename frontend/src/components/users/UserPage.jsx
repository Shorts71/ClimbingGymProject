import UserList from "./UserList";
import "./users.style.css";

const UserPage = () => {
    return (
        <main>
            <div className="user-page-container">
                <UserList />
            </div>
        </main>
    );
};

export default UserPage;