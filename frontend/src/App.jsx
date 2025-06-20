import Header from "./components/header";
import Footer from "./components/footer";
import Separador from "./components/Separador";
import Landing from "./components/landing";
import Login from "./components/login";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="page">
      <div className="page-stripes"></div>
      <Header />
      <Separador />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
