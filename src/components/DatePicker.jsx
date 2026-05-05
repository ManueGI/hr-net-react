import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import "./DatePicker.css";

function DatePicker({ label, name, value, onChange, error }) {
  // formate la date et la transmet au parent. useCallback évite de recréer la fonction à chaque rendu.
  const handleChange = React.useCallback(
    (date) => {
      if (date) {
        const isoString = format(date, "yyyy-MM-dd");
        onChange(isoString);
      } else {
        onChange("");
      }
    },
    [onChange],
  );

  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <ReactDatePicker
        selected={null}
        value={value ? format(parseISO(value), "dd/MM/yyyy") : ""}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        id={name}
        className={`datepicker-input ${error ? "input-error" : ""}`}
        calendarClassName="datepicker-calendar"
        isClearable={false}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        popperClassName="datepicker-popper"
        showPopperArrow={false}
        preventOpenOnFocus={false}
      />
      {error && <span className="field-error-message">{error}</span>}
    </div>
  );
}

export default React.memo(DatePicker);
