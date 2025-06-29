
export const festivosColombia = new Set([
  "2025-01-01", "2025-01-06", "2025-03-24", "2025-04-17", "2025-04-18",
  "2025-05-01", "2025-06-02", "2025-06-23", "2025-06-30", "2025-07-20",
  "2025-08-07", "2025-08-18", "2025-10-13", "2025-11-03", "2025-11-17",
  "2025-12-08", "2025-12-25"
]);

export function sumarDiasHabiles(
  fechaInicio,
  diasHabiles,
  festivos = festivosColombia,
  incluirInicio = false
) {
  const esHabil = (fecha) =>
    fecha.getDay() !== 1 &&
    fecha.getDay() !== 5 &&
    !festivos.has(fecha.toISOString().split("T")[0]);

  const fecha = new Date(fechaInicio);
  const dias = Array.from({ length: 365 })
    .map((_, i) => {
      const f = new Date(fecha);
      f.setDate(f.getDate() + (incluirInicio ? i : i + 1));
      return f;
    })
    .filter(esHabil)
    .slice(0, diasHabiles)
    .pop();

  return dias?.toISOString().split("T")[0] || "";
}