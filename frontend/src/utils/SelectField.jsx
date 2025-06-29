function SelectField({ label, value, onChange, options = [], className = "" }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <select value={value} onChange={onChange} className={className}>
        <option value="">Seleccione</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;