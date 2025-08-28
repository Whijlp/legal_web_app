
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useTutela() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const guardarTutela = async (datos, id = null) => {
    setLoading(true);
    setError(null);
    setMensaje(null);
    setIsSuccess(false);

    try {
      console.log("Payload antes de JSON.stringify:", datos);
      const body = JSON.stringify(datos);
      console.log("Cuerpo de la solicitud (JSON):", body);

      const token = user?.token;
      if (!token) throw new Error("No hay token de autenticación");

      const method = id ? "PUT" : "POST";
      const url = id
        ? `${import.meta.env.VITE_API_URL}/tutelas/${id}`
        : `${import.meta.env.VITE_API_URL}/tutelas`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Error al guardar tutela");
      }

      setMensaje("Tutela guardada con éxito");
      setIsSuccess(true);
      return result;
    } catch (err) {
      console.error("Error en guardarTutela:", err);
      setError(err.message);
      setMensaje(err.message);
      setIsSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { guardarTutela, loading, mensaje, error, isSuccess };
}