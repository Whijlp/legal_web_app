import construccion from "../src/images/construccion.png"
import Header from "./components/header";
import Footer from "./components/footer";
import Separador from "./components/Separador";
import Landing from "./components/landing";
import Dashboard from "./components/Dashboard/Dashboard";
import Authpage from "./components/Page/Authpage";
import { Route, Routes } from "react-router";
import Register from "./components/Page/Register";
import Login from "./components/Page/login";
import IngresarRegistros from "./components/Dashboard/IngresarRegistros";
import TabContainer from "./components/Dashboard/TabContainer/TabContainer";
import TabGeneral from "./components/Dashboard/TabContainer/Tabs/TabGeneral";
import TabFallos from "./components/Dashboard/TabContainer/Tabs/TabFallos";
import TabApelacion from "./components/Dashboard/TabContainer/Tabs/TabApelaciones";
import TabIncidentes from "./components/Dashboard/TabContainer/Tabs/TabIncidentes";
import TabOtros from "./components/Dashboard/TabContainer/Tabs/TabOtros";


function App() {
  return (
    <div className="page">  |
      {/*<div className="page-stripes"></div> */}
      <Header />
      <Separador />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Authpage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="inicio" element={<h1>Bienvenido al Dashboard <img src={construccion} className="app_construccion" alt="" /></h1>} />
          <Route path="ingresarregistos" element={<IngresarRegistros />}> 
          <Route index element={<TabGeneral />} /> {/* Default tab */}
  <Route path="general" element={<TabGeneral />} />
  <Route path="fallos" element={<TabFallos />} />
  <Route path="apelacion" element={<TabApelacion />} />
  <Route path="incidentes" element={<TabIncidentes />} />
  <Route path="otros" element={<TabOtros />} />
          
          </Route>  
          <Route path="basededatos" element={<h1>Base de datos Tutelas <img src={construccion} className="app_construccion" alt="" /></h1>} />
          <Route path="tutelas" element={<h1>Tutelas asignadas<img src={construccion} className="app_construccion" alt="" /></h1>} />
          <Route path="fallos" element={<h1>Fallos concedidos<img src={construccion} className="app_construccion" alt="" /></h1>} />
          <Route path="incidentes" element={<h1>Incidentes de desacato <img src={construccion} className="app_construccion" alt="" /></h1>} />
          <Route path="accionesp" element={<h1>Acciones populares<img src={construccion} className="app_construccion" alt="" /></h1>} />
        </Route>

        
  



      </Routes>

      <Footer />
    </div>
  );
}

export default App;
