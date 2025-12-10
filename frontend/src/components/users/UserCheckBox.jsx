import "./users.style.css";
import { useState } from "react";

export default function UserCheckBox({ name, onChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    onChange();
  };

  return (
    <div className="user-check-box">
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        {name}
      </label>
    </div>
  );
}
