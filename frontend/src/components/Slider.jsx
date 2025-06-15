
import landing from "../images/landingImage.png";
import landing2 from "../images/mesadetrabajo.jpg";
import landing3 from "../images/territorial10.jpg";
import React from "react";
import Slider from "react-slick";


import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div > 
          <img src={landing} className="landingImage" alt="" />
        </div>
        <div>
          <img src={landing2} className="landingImage" alt="" />
        </div>
        <div>
            <img src={landing3} className="landingImage" alt="" />
        </div>
    
      </Slider>
    </div>
  );
}

export default SimpleSlider;
