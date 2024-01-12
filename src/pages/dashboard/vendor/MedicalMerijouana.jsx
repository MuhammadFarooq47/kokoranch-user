import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";

function MedicalMerijuana({ sidebar, setSidebar }) {
  const [state, setState] = useState("COMMING SOON");
  return (
    <>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Medical Merijuana"
      />
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "30px",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
        }}
        elevation={20}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <h1 style={{ fontWeight: "bolder" }}>{state}</h1>
        </div>
      </Paper>
    </>
  );
}

export default MedicalMerijuana;
