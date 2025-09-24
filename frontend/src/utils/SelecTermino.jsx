function SelectTermino({ value, onChange, className = "", required }) {
  const opciones = ["1", "2", "3"];

  return (
    <select
      value={value || ""}
      onChange={(e) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
      }}
      className={`tabs_termino ${className}`}
      required={required}
    >
      <option value="">Término</option>
      {opciones.map((opt) => (
        <option key={opt} value={opt}>
          {opt} {opt === "1" ? "día" : "días"}
        </option>
      ))}
    </select>
  );
}

export default SelectTermino;