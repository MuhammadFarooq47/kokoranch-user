import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";

function Notifications({ sidebar, setSidebar }) {
  const [state, setState] = useState("COMMING SOON");
  const [data, setData] = useState([
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
    {
      details: (
        <p>
          Order For <span style={{ color: "#4180FE" }}>Koko ranch item</span> |
          By Paul Chris | House No 228, Street No 2, Defence Phase 2, USA.
        </p>
      ),
      country: "USA",
      action: "Take Action",
      time: "20:45",
    },
  ]);
  return (
    <>
      <NavBar setSidebar={setSidebar} sidebar={sidebar} title="Notifications" />
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "30px",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
          height: "85vh",
          overflowY: "scroll",
        }}
        className="edit-product-container"
        elevation={20}
      >
        <div className="row ">
          {data.map((item) => {
            return (
              <>
                <div className="col-10 col-md-6 col-lg-6 col-sm-8">
                  {item.details}
                  <div className="row mt-5">
                    <div className="col-3" style={{ color: "#ffc524" }}>
                      {item.country}
                    </div>
                    <div className="col-3" style={{ color: "#1AB7DC" }}>
                      {item.action}
                    </div>
                  </div>
                </div>
                <div className="col-2 col-md-6 col-lg-6 col-sm-4 d-flex justify-content-end">
                  <div>
                    <p style={{ color: "#707070" }}>{item.time}</p>
                    <div className="d-flex justify-content-center">
                      <p
                        style={{
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px",
                          color: "white",
                          backgroundColor: "#5F14A3",
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
                <hr className="hr-rule" />
              </>
            );
          })}
        </div>
      </Paper>
    </>
  );
}

export default Notifications;
