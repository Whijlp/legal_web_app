import Header from "./components/header";
import Footer from "./components/footer";
import Separador from "./components/Separador";
import Landing from "./components/landing";

function App() {
  return (
    <div className="page">
      <div className="page-stripes"></div>
      <Header />
      <Separador />
      <Landing />

      <Footer />
    </div>
  );
}

export default App;
