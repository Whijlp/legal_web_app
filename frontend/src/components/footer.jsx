
import footer from "../images/footer.png";
function Footer() {
  return (
    <footer className="footer">
        <img src={footer} className="footer_img" alt="imagen chibchas" />

        <div className="footer_text-container">
        <div className="footer_text">
            <p className="footer_text-title">
                © 2025 PRAETOR - Sistema de Gestion Judicial 
            </p>
            <p className="footer_text-title">
                Desarrollado con fines académicos | Integración con CNSC
            </p>

        </div>
        </div>
      
    </footer>
  );
}

export default Footer;