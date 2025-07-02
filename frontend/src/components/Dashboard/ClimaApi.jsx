import { useEffect, useState } from "react";

const ciudades = {
  Berlín: { lat: 52.52, lon: 13.41 },
  Bogotá: { lat: 4.61, lon: -74.08 },
  Madrid: { lat: 40.42, lon: -3.7 },
  BuenosAires: { lat: -34.6, lon: -58.38 },
  CiudadDeMexico: { lat: 19.43, lon: -99.13 },
};

function ClimaApi() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Bogotá");
  const [climaApi, setClimaApi] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      setCargando(true);
      setError(null);

      const { lat, lon } = ciudades[ciudadSeleccionada];

      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?" +
          new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current:
              "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,weather_code,cloud_cover,pressure_msl",
            timezone: "auto",
          });

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener el clima");

        const data = await response.json();
        setClimaApi(data.current);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerClima();
  }, [ciudadSeleccionada]); 

  return (
    <div className="climaApi">
      <h2 className="climaApi_titulo">🌤️ Clima actual</h2>

      <label >🌍 Selecciona ciudad: </label>
      <select
        value={ciudadSeleccionada}
        onChange={(e) => setCiudadSeleccionada(e.target.value)}
      >
        {Object.keys(ciudades).map((ciudad) => (
          <option key={ciudad} value={ciudad} className="climaApi_opciones">
            {ciudad}
          </option>
        ))}
      </select>

      {cargando && <p>Cargando clima...</p>}
      {error && <p>{error}</p>}
      {climaApi && (
        <>
          <p className="climaApi_item">📍 Ciudad: {ciudadSeleccionada}</p>
          <p className="climaApi_item">🌡️ Temperatura: {climaApi.temperature_2m} °C</p>
          <p className="climaApi_item">💧 Humedad: {climaApi.relative_humidity_2m} %</p>
          <p className="climaApi_item">💨 Viento: {climaApi.wind_speed_10m} km/h</p>
          <p className="climaApi_item">🧭 Dirección del viento: {climaApi.wind_direction_10m}°</p>
          <p className="climaApi_item">📉 Presión: {climaApi.pressure_msl} hPa</p>
          <p className="climaApi_item">📍 Sensación térmica: {climaApi.apparent_temperature} °C</p>
        </>
      )}
    </div>
  );
}

export default ClimaApi
