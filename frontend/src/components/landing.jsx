import Slider from "./Slider";
import escuelacnsc from "../images/landingButton.png";
import observatorio from "../images/landingButtonyellow.png";
import simo from "../images/landingButtonblue.png";
import Landingnew from './LandingNew';
import Separador from "./Separador";


function Landing(settings) {
  return (
    <div className="landing">
      <Slider {...settings} />

      <div className="lading_button-container">
        <button className="landing_button">
          <img
            src={escuelacnsc}
            className="landing_image-button"
            alt="logo escula cnsc"
          />
        </button>
        <button className="landing_button">
          <img
            src={observatorio}
            className="landing_image-button"
            alt="logo observatorio"
          />
        </button>
        <button className="landing_button">
          <img src={simo} className="landing_image-button" alt="logo simo" />
        </button>
      </div>
      <Separador />
      
       <Landingnew />

    
    </div>
  );
}

export default Landing;
