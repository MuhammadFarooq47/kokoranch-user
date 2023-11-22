import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import InfoCards from "./Components/InfoCards";
import TableComponent from "./Components/Table";
import SearchBar from "./Components/SearchBar";
import CustomPopup from "../../../components/customPopUp/CustomPopUp";
import { ReactComponent as FilterIcon } from "../../../assets/images/icons/filter-icon.svg";
import {GET_PRODUCT_REVIEWS} from "../../../redux/actions/reviews";

import FilterProp from "./Components/FilterProp";



function RatingReview({ setSidebar, sidebar }) {
  const [showFilterProp, setShowFilterProp] = useState(false);
  const [tableHeadData, seTableHeadData] = useState([
    { id: "orderNo", label: "Order No" },
    { id: "userId", label: "User Id" },
    { id: "date", label: "Date" },
    { id: "amountPaid", label: "Amount Paid" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ]);

  const [tableRowData, setTableRowData] = useState([
    {
      orderNo: "01",
      date: "2022-03-01",
      userId: "001",
      amountPaid: "$21.00",
      status: "Pending",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-2",
      userId: "001",
      amountPaid: "$21.00",
      status: "Pending",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-5",
      userId: "001",
      amountPaid: "$21.00",
      status: "Completed",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-8",
      userId: "001",
      amountPaid: "$21.00",
      status: "Pending",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-10",
      userId: "001",
      amountPaid: "$21.00",
      status: "Booked",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-8",
      userId: "001",
      amountPaid: "$21.00",
      status: "Pending",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-10",
      userId: "001",
      amountPaid: "$21.00",
      status: "Booked",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-8",
      userId: "001",
      amountPaid: "$21.00",
      status: "Pending",
      action: "Action",
    },
    {
      orderNo: "01",
      date: "2022-03-10",
      userId: "001",
      amountPaid: "$21.00",
      status: "Booked",
      action: "Action",
    },
  ]);

  const [rowData, setRowData] = useState(tableRowData);
  const [sortData, setSortData] = useState("");
  const [viewRatings, setViewRatings] = useState(false);
  const [button, setButton] = useState({
    all: true,
    product: false,
    service: false,
  });
  useEffect(() => {
    if (sortData) {
      let temp = [];

      if (sortData == "asc") {
        temp = rowData.sort((a, b) => {
          return Number(new Date(b.date)) - Number(new Date(a.date));
        });
      } else if (sortData == "dec") {
        temp = rowData.sort((a, b) => {
          return Number(new Date(a.date)) - Number(new Date(b.date));
        });
      }
      // else if (sortData == "low") {
      //   temp = rowData.sort((a, b) => {
      //     return Number(a.price) - Number(b.price);
      //   });
      // } else if (sortData == "high") {
      //   temp = rowData.sort((a, b) => {
      //     return Number(b.price) - Number(a.price);
      //   });
      // }
      setRowData([...temp]);
    }
  }, [sortData]);

  useEffect(() => {}, [showFilterProp]);
  return (
    <>
      <CustomPopup open={viewRatings} setOpen={setViewRatings} rating={true} />
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Ratings & Reviews"
      />

      <article className="vendor-profile-main" style={{ position: "relative" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FilterIcon
              width={20}
              onClick={() => setShowFilterProp(!showFilterProp)}
            />
          </div>
          <div style={{ marginTop: "20px", color: "white" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <h3 style={{ marginLeft: "20px" }}>Ratings & Reviews</h3>
              <div className="featured-button-container">
                <button
                  onClick={() => {
                    setButton({
                      all: true,
                      product: false,
                      service: false,
                    });
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: button?.all ? "#14A384" : "white",
                    fontWeight: button?.all && "bold",
                  }}
                >
                  <p>All</p>
                </button>
                <div className="d-flex featured-vertical-line">
                  <div className="vr"></div>
                </div>
                <button
                  onClick={() => {
                    setButton({
                      all: false,
                      product: true,
                      service: false,
                    });
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: button?.product ? "#14A384" : "white",
                    fontWeight: button?.product && "bold",
                  }}
                >
                  <p>Products</p>
                </button>
                <div className="d-flex featured-vertical-line">
                  <div className="vr"></div>
                </div>
                <button
                  onClick={() => {
                    setButton({
                      all: false,
                      product: false,
                      service: true,
                    });
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: button?.service ? "#14A384" : "white",
                    fontWeight: button?.service && "bold",
                  }}
                >
                  <p>Services</p>
                </button>
              </div>
            </div>

            <TableComponent
              tHeadData={tableHeadData}
              tRowData={rowData}
              edit={"ratings"}
              activeCard={"total"}
              setOpen={setViewRatings}
            />
          </div>
        </div>
        <div
          className="so-top-filtericon"
          onClick={() => setShowFilterProp(!showFilterProp)}
        ></div>
        {showFilterProp && (
          <FilterProp featured sortData={sortData} setSortData={setSortData} />
        )}
      </article>
    </>
  );
}

export default RatingReview;
