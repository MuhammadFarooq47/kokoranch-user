import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import InfoCards from "./Components/InfoCards";
import FormControlAuth from "./Components/formControl";
import TableComponent from "./Components/Table";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_USER_SERVICES,
  DELETE_SERVICE_BY_ID,
  GET_SERVICE_CATEGORIES,
} from "../../../redux/actions/services";

function VendorServices({ setSidebar, sidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const { services, serviceCategories } = useSelector(
    (state) => state.ServicesReducers
  );
  const [tableHeadData, seTableHeadData] = useState([
    { id: "code", label: "code" },
    { id: "createdAt", label: "Update Date" },
    { id: "serviceName", label: "Service Name" },
    { id: "serviceCategory", label: "Category" },
    { id: "price", label: "Price" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ]);

  const [tableRowData, setTableRowData] = useState([]);

  const [filterCard, setFilterCard] = useState([]);

  const [activeCard, setActiveCard] = useState("All Services");
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteSuccessfulPopup, setDeleteSuccessfulPopup] = useState(false);
  const [rowData, setRowData] = useState(tableRowData);
  const [category, setCategory] = useState("");
  const [serviceId, setServiceid] = useState("");
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([
    "All",
    "Landscaping",
    "lawn Mowing",
    "Tree Services",
    "tractor Repair",
  ]);

  const [sortData, setSortData] = useState("");
  useEffect(() => {
    if (token) {
      dispatch(GET_USER_SERVICES(user._id, token, setTableRowData, setLoader));
      dispatch(GET_SERVICE_CATEGORIES(token, setLoader));
    }
  }, [token, deleteSuccessfulPopup]);
  useEffect(() => {
    const arr = ["All"];
    if (Array.isArray(serviceCategories) && serviceCategories.length > 0) {
      serviceCategories.map((item) => {
        arr.push(item.category);
      });
      setOptions(arr);
    }
    // setOptions
  }, [serviceCategories]);
  useEffect(() => {
    // console.log("table data", tableRowData);
    setRowData(tableRowData);
    setFilterCard([
      { topText: "All Services", bottomText: tableRowData.length },
      {
        topText: "Active Services",
        bottomText: tableRowData.filter((item) => item.status == "Active")
          .length,
      },
      {
        topText: "Inactive Services",
        bottomText: tableRowData.filter((item) => item.status == "Inactive")
          .length,
      },
    ]);
  }, [tableRowData]);
  useEffect(() => {
    let temp = [];
    if (activeCard == "All Services") {
      temp = tableRowData;
      // console.log("all");
    } else if (activeCard == "Active Services") {
      console.log("active");
      temp = tableRowData.filter((item) => item.status == "Active");
    } else if (activeCard == "Inactive Services") {
      console.log("inactive");
      temp = tableRowData.filter((item) => item.status == "Inactive");
    }
    setRowData(temp);
  }, [activeCard]);
  useEffect(() => {
    if (sortData) {
      let temp = [];
      if (sortData == "asc") {
        temp = rowData.sort((a, b) => {
          return (
            Number(new Date(a.updateDate)) - Number(new Date(b.updateDate))
          );
        });
      } else if (sortData == "dec") {
        temp = rowData.sort((a, b) => {
          return (
            Number(new Date(b.updateDate)) - Number(new Date(a.updateDate))
          );
        });
      } else if (sortData == "low") {
        temp = rowData.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
      } else if (sortData == "high") {
        temp = rowData.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
      }

      setRowData(temp);
    }
  }, [sortData]);
  useEffect(() => {
    if (category == "All") {
      setRowData([...tableRowData]);
    } else if (category) {
      const temp = tableRowData.filter(
        (item) =>
          item?.serviceCategory?.category.toLowerCase() ==
          category.toLowerCase()
      );

      setRowData(temp);
    }
  }, [category]);

  return (
    <>
      <Popup open={deletePopup} setOpen={setDeletePopup}>
        <div className="soi-update-status">
          <div className="successful-popup">
            <div className="sp-icon">
              <FaExclamation size={30} fill="black" />
            </div>
            <h3>
              Are You Sure You Want To
              <br />
              Delete This Service?
            </h3>
          </div>
          <div className="soi-popup-btns d-flex">
            <button
              className="btn btn-solid btn-solid-cancel btn-outline-primary soi-popup-btn"
              onClick={() => {
                setDeletePopup(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-solid btn-solid-primary  soi-popup-btn"
              onClick={() => {
                setDeletePopup(false);
                // setDeleteSuccessfulPopup(true);
                dispatch(
                  DELETE_SERVICE_BY_ID(
                    serviceId,
                    token,
                    setDeleteSuccessfulPopup
                  )
                );
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>
      <Popup open={deleteSuccessfulPopup} setOpen={setDeleteSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>

          <h3>
            Service Deleted <br />
            Successfully
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setDeleteSuccessfulPopup(false);
              navigate("/vendor-agricultural-services");
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="My Agricultural Service"
      />
      {/* {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress size="15vh" />
        </div>
      ) : ( */}
        <article className="vendor-profile-main">
          <div className="vendor-profile-main_form">
            {rowData.length > 0 && (
              <InfoCards
                data={filterCard}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                sortData={sortData}
                setSortData={setSortData}
              />
            )}
          </div>
          <div
            className="row"
            style={{
              marginTop: "20px",
              border: "1px black",
              borderRadius: "10px",
              boxShadow: "0px 0px 30px -10px",
              width: "100%",
              color: "black",
            }}
          >
            <div className=" col-md-12">
              <div style={{ marginTop: "20px", color: "white" }}>
                <div style={{ marginLeft: "20px" }}>
                  <h4>Filter By Your Categories</h4>
                  <FormControlAuth
                    options={options}
                    setCategory={setCategory}
                  />
                </div>
                <div className="row">
                  <div className="col-5">
                    <h4 style={{ marginLeft: "20px" }}>Service List:</h4>
                  </div>
                  <div className="col-7 d-flex justify-content-end">
                    <button
                      onClick={() => {
                        navigate("/vendor-agricultural-services/add-service", {
                          state: { addProduct: true },
                        });
                      }}
                      className="btn btn-solid btn-solid-primary table-btn"
                      style={{
                        marginRight: "20px",
                        // paddingLeft: "20px",
                        // paddingRight: "20px",
                        width: "fit-content",
                      }}
                    >
                      <div
                        style={{
                          // backgroundColor: "white",
                          margin: "5px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <PlusIcon fill="white" width={17} />
                      </div>
                      Add Service
                    </button>
                  </div>
                </div>

                <TableComponent
                  tHeadData={tableHeadData}
                  tRowData={rowData}
                  edit={"services"}
                  activeCard={"total"}
                  open={deletePopup}
                  setOpen={setDeletePopup}
                  onDelete={(serviceId) => {
                    // console.log("id", serviceId);
                    setDeletePopup(true);
                    setServiceid(serviceId);
                    // dispatch(DELETE_SERVICE_BY_ID(serviceId, token, popup));
                  }}
                />
              </div>
            </div>
          </div>
        </article>
      {/* )} */}
    </>
  );
}

export default VendorServices;
