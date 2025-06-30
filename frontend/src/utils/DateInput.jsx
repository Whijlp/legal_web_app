
function DateInput({ value, onChange, readOnly = false , label = "Fecha", className = "", placeholder ="" }) {
  return (
    <div className="form-field">
  
      <input
        type="date"
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className="tabs_date-input"
        placeholder={placeholder}
      />
    </div>
  );
}

export default DateInput;
