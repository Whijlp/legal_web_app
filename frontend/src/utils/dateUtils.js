// Convierte cualquier valor en un objeto Date válido
export function parseDate(value) {
  if (!value) return null;

  // Si ya es un objeto Date, devolverlo
  if (value instanceof Date) return value;

  // Si es string en formato YYYY-MM-DD
  if (typeof value === "string") {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

// Formatea un objeto Date en string YYYY-MM-DD (para <input type="date">)
export function formatDate(date) {
  if (!date) return "";
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
