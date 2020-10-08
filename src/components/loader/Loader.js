import React from "react";
// import "./Loader.css";

function Loader() {
  return (
    <div className="loader">
      <lottie-player src="https://assets7.lottiefiles.com/private_files/lf30_i63t10ze.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
    </div>
  );
}

export default Loader;
