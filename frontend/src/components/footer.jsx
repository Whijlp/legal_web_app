import footer from "../images/footer.png";
import facebook from "../images/facebook.png";
import instagram from "../images/iinstagram.png";
import twitter from "../images/icons8-twitterx-50.png";
import youtube from "../images/icons8-youtube-play-64.png";
import cnsc from "../images/cnsc.png";
import praetor from "../images/preator.png";

function Footer() {
  return (
    <footer className="footer">
      <img src={footer} className="footer_img" alt="imagen chibchas" />
      <div clas className="footer_conteiner">
        <div className="footer_conteiner-logo">
           <img src={praetor} className="footer_praetor" alt="logo de footer" />
          <img src={cnsc} className="footer_cnsc" alt="logo de footer" />
         
      
        </div>
        <div  className="footer_coteiner-text">
          <div className="footer_conteiner-us">
          <p className="footer-title">Soporte</p>
          <p className="footer-text">
            soportepraetor@cnsc.gov.co Conmutador: (+57) 601 3259700 
          </p>
          </div>
          <footer className="footer_adress">
            <p className="footer-title">Oficina
            Principal:

            </p>
            <p className="footer-text">Avenida Calle 100 # 9a 45. Edificio 100 Street - Torre 1 -
            Piso12. Bogotá D.C., Colombia</p>
          </footer>

        </div>
        <div className="footer_conteiner-social">
          <img src={facebook} className="footer_logo" alt="logo de facebook" />
          <img src={instagram} className="footer_logo" alt="logo de instagram" />
          <img src={twitter} className="footer_logo" alt="logo de twitter" />
          <img src={youtube} className="footer_logo" alt="logo de youtube" />
        </div>
      </div>
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
