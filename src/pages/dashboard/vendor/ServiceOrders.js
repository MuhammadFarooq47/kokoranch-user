import React, { useState, useEffect } from "react";
import {
  FaRegUser,
  FaTradeFederation,
  FaRegFile,
  FaRegCommentAlt,
  FaRegSun,
  FaSignOutAlt,
} from "react-icons/fa";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import InfoCards from "./Components/InfoCards";
import Table from "./Components/Table";
import FormControlAuth from "./Components/formControl";
import TableComponent from "./Components/Table";
import SearchBar from "./Components/SearchBar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GET } from "../../../apis/requests";
import { CircularProgress } from "@mui/material";

function VendorServiceOrders({ setSidebar, sidebar }) {
  const { user, token } = useSelector((state) => state.authReducer);
  const [loader, setLoader] = useState(false);
  const [tableHeadData, seTableHeadData] = useState([
    { id: "order_id", label: "Order No" },
    // { id: "userId", label: "User Id" },
    { id: "createdAt", label: "Date" },
    { id: "totalPrice", label: "Amount Paid" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ]);

  const [tableRowData, setTableRowData] = useState([]);

  const [filterCard, setFilterCard] = useState([{}]);

  const [activeCard, setActiveCard] = useState("Total Orders");

  const [rowData, setRowData] = useState(tableRowData);
  const [sortData, setSortData] = useState("");

  useEffect(() => {
    let temp = [];
    if (activeCard == "Total Orders") {
      temp = tableRowData;
      // console.log("all");
    } else if (activeCard == "Pending Orders") {
      temp = tableRowData.filter((item) => item.status == "Pending");
    } else if (activeCard == "Orders On The Way") {
      temp = tableRowData.filter((item) => item.status == "On the way");
    } else if (activeCard == "Delevered Orders") {
      temp = tableRowData.filter((item) => item.status == "Delivered");
    } else if (activeCard == "Cancelled Orders") {
      temp = tableRowData.filter((item) => item.status == "Cancelled");
    }
    setRowData(temp);
  }, [activeCard, tableRowData]);
  // const getOrdersData = async () => {
  //   try {
  //     setLoader(true);
  //     const res = await GET("/orders/get/service/orders/", token, user._id);
  //     if (res.success == false) {
  //       toast.error(res.message);
  //       setLoader(false);
  //     } else {
  //       // console.log("service orders", res.orders);
  //       setTableRowData(res.orders);
  //       let totalAmount = 0;
  //       res.orders.map((item) => {
  //         totalAmount = totalAmount + item.totalPrice;
  //       });
  //       let filterData = [
  //         { topText: "Total Orders", bottomText: res.orders.length },
  //         {
  //           topText: "Pending Orders",
  //           bottomText: res.orders.filter((item) => item.status == "Pending")
  //             .length,
  //         },
  //         {
  //           topText: "Orders On The Way",
  //           bottomText: res.orders.filter((item) => item.status == "On the way")
  //             .length,
  //         },
  //         {
  //           topText: "Delevered Orders",
  //           bottomText: res.orders.filter((item) => item.status == "Delivered")
  //             .length,
  //         },
  //         {
  //           topText: "Cancelled Orders",
  //           bottomText: res.orders.filter((item) => item.status == "Cancelled")
  //             .length,
  //         },
  //         {
  //           topText: "Total Amount",
  //           bottomText: "$" + totalAmount,
  //         },
  //       ];
  //       setFilterCard(filterData);
  //       setRowData(res.orders);
  //       setLoader(false);
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   token && getOrdersData();
  // }, [token]);

  useEffect(() => {
    if (sortData) {
      let temp = [];
      if (sortData == "asc") {
        temp = rowData.sort((a, b) => {
          return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
        });
      } else if (sortData == "dec") {
        temp = rowData.sort((a, b) => {
          return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
        });
      } else if (sortData == "low") {
        temp = rowData.sort((a, b) => {
          return Number(a.totalPrice) - Number(b.totalPrice);
        });
      } else if (sortData == "high") {
        temp = rowData.sort((a, b) => {
          return Number(b.totalPrice) - Number(a.totalPrice);
        });
      }

      setRowData(temp);
    }
  }, [sortData]);
  return (
    <>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Service Orders"
      />
      {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress size="15vh" />
        </div>
      ) : (
        <article className="vendor-profile-main">
          <div className="vendor-profile-main_form">
            {tableRowData.length > 0 && (
              <InfoCards
                data={filterCard}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                sortData={sortData}
                setSortData={setSortData}
                featured1={true}
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                  }}
                >
                  <h4 style={{ marginLeft: "20px" }}>Total Orders</h4>
                  <div style={{ width: "50%" }}>
                    <SearchBar />
                  </div>
                </div>
                {/* <div
                style={{
                  width: "95%",
                  margin: "20px",
                }}
              > */}
                <TableComponent
                  tHeadData={tableHeadData}
                  tRowData={rowData}
                  edit={"serviceOrder"}
                  activeCard={"total"}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default VendorServiceOrders;
