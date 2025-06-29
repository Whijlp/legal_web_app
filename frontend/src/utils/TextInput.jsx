function TextInput({ value, onChange, placeholder, className, name }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      name={name}
    />
  );
}

export default TextInput;