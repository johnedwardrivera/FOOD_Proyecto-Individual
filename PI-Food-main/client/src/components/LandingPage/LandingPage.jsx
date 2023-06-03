import React from "react";
import img2 from "../../img/—Pngtree—3d food fonts red dogs_3581375.png";
import img from "../../img/logo.png.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div>
        <img
          src={img2}
          alt=""
          style={{
            width: "350px",
            height: "350px",
          }}
        />
      </div>

      <div>
        <Link to="/homepage">
          <img
            src={img}
            alt=""
            style={{
              width: "200px",
              height: "200px",
            }}
          />
        </Link>
      </div>
    </>
  );
};
export default LandingPage;
