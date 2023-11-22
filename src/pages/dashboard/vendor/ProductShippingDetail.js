import { CircularProgress, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { GET } from "../../../apis/requests";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";

function ProductShippingDetail({ sidebar, setSidebar }) {
  const { user, token } = useSelector((state) => state.authReducer);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    itemLocation: "",
    shippingTo: "",
    delivery: "",
    return: "",
    shippingAndHandling: "",
  });

  const storageToken = localStorage.getItem("token")

  const getShippingDetail = async () => {
    try {
      // console.log("user", user._id);
      setLoader(true);
      const res = await GET(
        `/shipping-details/${user._id}`,
        // storageToken,
       
      );
      if (res.success == "fail") {
        setLoader(false);
        // toast.error(res.message);
      } else {
        setData(res.data);
        setLoader(false);
        // console.log("data", res.data);
      }
    } catch (err) {
      toast.error(err.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (storageToken && user) {
      getShippingDetail();
    }
  }, [storageToken, user]);

  return (
    <>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Product Shipping Details"
      />
      {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress size="15vh" />
        </div>
      ) : (
        <Paper
          sx={{
            backgroundColor: "#1e1e1e",
            color: "white",
            padding: "30px",
            boxShadow: "0rem 0rem 0px 0.1rem #00000047",
          }}
          elevation={20}
        >
          <div style={{ marginBottom: "50px" }}>
            <h4>Item location</h4>
            <p
              style={{
                fontWeight: "lighter",
                color: "#979797",
                marginTop: "20px",
              }}
            >
              {data?.itemLocation}
            </p>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <h4>Shipping to</h4>
            <p
              style={{
                fontWeight: "lighter",
                color: "#979797",
                marginTop: "20px",
              }}
            >
              {data.shippingTo}
            </p>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <h4>delivery</h4>
            <p
              style={{
                fontWeight: "lighter",
                color: "#979797",
                marginTop: "20px",
              }}
            >
              {data.delivery}
            </p>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <h4>Return</h4>
            <p
              style={{
                fontWeight: "lighter",
                color: "#979797",
                marginTop: "20px",
              }}
            >
              {data?.return}
            </p>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <h4>shipping And Handling</h4>
            <p
              style={{
                fontWeight: "lighter",
                color: "#979797",
                marginTop: "20px",
              }}
            >
              {data.shippingAndHandling}
            </p>
          </div>
          <NavLink
            to="/vendor-productshippingdetails/edit"
            state={{ data, edit: data.itemLocation ? "edit" : "create" }}
          >
            <button
              className="btn btn-solid btn-solid-primary table-btn"
              style={{
                marginRight: "20px",
                paddingLeft: "20px",
                paddingRight: "20PX",
                width: "120px",
              }}
            >
              <div
                style={{
                  // backgroundColor: "white",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              ></div>
              {data?.itemLocation ? "Edit" : "Create"}
            </button>
          </NavLink>
        </Paper>
      )}
    </>
  );
}

export default ProductShippingDetail;
