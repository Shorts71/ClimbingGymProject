import "./users.style.css";
import UserCheckBox from "./UserCheckBox";

export default function UserSortBar({ setUserOptions }) {
  const handleRoleChange = (role) => {
    setUserOptions((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="UserSortBar">
      <UserCheckBox name="Admin" onChange={() => handleRoleChange("admin")} />
      <UserCheckBox
        name="Staff Member"
        onChange={() => handleRoleChange("staff")}
      />
      <UserCheckBox name="Seller" onChange={() => handleRoleChange("seller")} />
      <UserCheckBox
        name="Customer"
        onChange={() => handleRoleChange("customer")}
      />
    </div>
  );
}
