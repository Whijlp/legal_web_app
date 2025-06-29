import { useEffect, useState } from "react";
import { sumarDiasHabiles } from "./fechaUtils";

export function useFechaVencimiento(fechaEntrada, termino, condicion = true) {
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  useEffect(() => {
    if (fechaEntrada && termino && condicion) {
      const vencimiento = sumarDiasHabiles(fechaEntrada, parseInt(termino));
      setFechaVencimiento(vencimiento);
    } else {
      setFechaVencimiento("");
    }
  }, [fechaEntrada, termino, condicion]);

  return fechaVencimiento;
}
