import React from "react";
import { fallbackUser } from "../../config/apiUrl";
import classes from "./NoDataComp.module.css";

const NoDataComp = ({ title, className }) => {
  return (
    <div className={`${classes.NoDataComp} ${className && className}`}>
      <img
        src={"https://cdn-icons-png.flaticon.com/512/7378/7378380.png"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackUser;
        }}
        style={{
          marginBottom: "10px",
        }}
      />
      <p>{title}</p>
    </div>
  );
};

export default NoDataComp;