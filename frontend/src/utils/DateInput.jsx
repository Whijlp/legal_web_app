function DateInput({ value, onChange, readOnly = false , label = "Fecha", className = "", placeholder ="" }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="date"
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}

export default DateInput;
