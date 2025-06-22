import { Outlet } from "react-router";

import praetor from "../../images/juezp.png";

function Authpage() {
  return (
    <div className="login-wrapper">
        <div className="login_content">
      <p className="login_slogan">
        “Praetor: donde la justicia toma forma y la ley encuentra su voz”
      </p>
      <img className="login_img" src={praetor} alt="imegn de juez romano" />
</div>
      <div className="login-container">
    

        <Outlet />
      </div>
    </div>
  );
}
export default Authpage;
