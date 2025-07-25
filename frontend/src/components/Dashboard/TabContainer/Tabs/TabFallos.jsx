import FalloInstancia from "./FalloInstancia";

function TabFallos() {
  return (
    <div>
      <FalloInstancia
        titulo="Fallo de 1° instancia"
        falloOptions={[
          "Concede",
          "Niega",
          "Concede no Ordena",
          "Declara improcedente",
          "Desistimiento de la accion ",
        ]}
      />
      <FalloInstancia
        titulo="Fallo de 2° instancia"
        falloOptions={[
          "Concede",
          "Niega",
          "Concede no Ordena",
          "Declara improcedente",
          "Desistimiento de la accion ",
        ]}
      />
    </div>
  );
}

export default TabFallos;
