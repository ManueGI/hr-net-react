import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import "./DatePicker.css";

export default function DatePicker({ label, name, value, onChange, error }) {
  const handleChange = (date) => {
    if (date) {
      // Convertir en format ISO (YYYY-MM-DD) pour le stockage
      const isoString = format(date, "yyyy-MM-dd");
      onChange(isoString);
    } else {
      onChange("");
    }
  };

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
