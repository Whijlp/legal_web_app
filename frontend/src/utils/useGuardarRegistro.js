import { useState } from "react";
import * as yup from "yup";

export function useGuardarRegistro(endpoint, esquemaValidacion) {
  const [estado, setEstado] = useState({ loading: false, success: false, error: null });

  const guardar = async (data, id = null) => {
    try {
      setEstado({ loading: true, success: false, error: null });

      await esquemaValidacion.validate(data, { abortEarly: false });

      const method = id ? "PUT" : "POST";
      const url = id ? `${endpoint}/${id}` : endpoint;

      const respuesta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!respuesta.ok) throw new Error("Error en el guardado");

      setEstado({ loading: false, success: true, error: null });
      return true;

    } catch (err) {
      const errorMsg = err?.message || "Error al guardar";
      setEstado({ loading: false, success: false, error: errorMsg });
      return false;
    }
  };

  return { guardar, estado };
}