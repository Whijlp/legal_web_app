function SelectTermino({ value, onChange, className = "" }) {
  const opciones = ["1", "2", "3"];
  return (
    <select value={value} onChange={onChange} className="tabs_termino">
      <option value="">Término</option>
      {opciones.map((opt) => (
        <option key={opt} value={opt}>{opt} días</option>
      ))}
    </select>
  );
}

export default SelectTermino;
