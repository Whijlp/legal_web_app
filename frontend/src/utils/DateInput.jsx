import { parseDate, formatDate } from "../utils/dateUtils";

function DateInput({
  value,
  onChange,
  readOnly = false,
  label = "",
  className = "",
  placeholder = "",
  name,
}) {
 const formattedValue = value ? formatDate(parseDate(value)) : "";

  const handleChange = (e) => {
    if (!e || !e.target) {
      console.error("Evento inválido en DateInput:", e);
      return;
    }
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="form-field">
      {label && <label className="tabs_label">{label}</label>}
      <input
        type="date"
        name={name}
        value={formattedValue}
        readOnly={readOnly}
        onChange={handleChange}
        className={`tabs_date-input ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default DateInput;
