import React from "react";
import { fallbackUser } from "../../config/apiUrl";
import classes from "./NoDataComp.module.css";
import Logo from "../../assets/images/logo.png"

const NoDataComp = ({ title, className }) => {
  return (
    <div className={`${classes.NoDataComp} ${className && className}`}>
      <img
        src={Logo}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackUser;
        }}
        style={{
          marginBottom: "10px",
          width: 100
        }}
      />
      <p>{title}</p>
    </div>
  );
};

export default NoDataComp;