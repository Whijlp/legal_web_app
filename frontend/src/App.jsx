import Header from "./components/header";
import Footer from "./components/footer";
import Separador from "./components/Separador";
import Landing from "./components/landing";
import Dashboard from "./components/Dashboard";
import Authpage from "./components/Page/Authpage";
import { Route, Routes } from "react-router";
import Register from "./components/Page/Register";
import Login from "./components/Page/login";

function App() {
  return (
    <div className="page">
      {/*<div className="page-stripes"></div> */}
      <Header />
      <Separador />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Authpage />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
