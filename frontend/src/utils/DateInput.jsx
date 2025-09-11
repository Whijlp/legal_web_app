import { parseDate, formatDate } from "../utils/dateUtils";

function DateInput({
  value,
  onChange,
  readOnly = false,
  label = "Fecha",
  className = "",
  placeholder = "",
  name,
}) {
  // Aseguramos que siempre reciba un string YYYY-MM-DD
  {
    /*const formattedValue = value ? formatDate(parseDate(value)) : "";*/
  }

  return (
    <div className="form-field">
      {label && <label className="tabs_label">{label}</label>}
      <input
        type="date"
        name={name}
        value={value || ""}
        readOnly={readOnly}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`tabs_date-input ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default DateInput;
