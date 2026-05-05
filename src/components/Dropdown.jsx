import React from "react";
import "./Dropdown.css";

function Dropdown({
  options = [],
  value = "",
  onChange,
  label,
  name,
  placeholder = "Select an option",
  error,
}) {
  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`dropdown-select ${error ? "input-error" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="field-error-message">{error}</span>}
    </div>
  );
}

export default React.memo(Dropdown);
