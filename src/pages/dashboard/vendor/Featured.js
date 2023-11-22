import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import InfoCards from "./Components/InfoCards";
import TableComponent from "./Components/Table";
import SearchBar from "./Components/SearchBar";
import { ReactComponent as FilterIcon } from "../../../assets/images/icons/filter-icon.svg";
import FilterProp from "./Components/FilterProp";
import { GET } from "../../../apis/requests";
import { CircularProgress } from "@mui/material";

function Featured({ setSidebar, sidebar }) {
  const [showFilterProp, setShowFilterProp] = useState(false);
  const user = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  const [tableHeadData, seTableHeadData] = useState([
    { id: "code", label: "code" },
    { id: "createdAt", label: "Date" },
    { id: "productName", label: "Product Name" },
    { id: "mainCategory", label: "Main Category" },
    { id: "price", label: "Amount Paid" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ]);

  const [tableRowData, setTableRowData] = useState([]);

  const [rowData, setRowData] = useState(tableRowData);
  const [allData, setAllData] = useState([]);
  const [sortData, setSortData] = useState("");
  const [loader, setLoader] = useState(false);
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

  const storageToken = localStorage.getItem("token");

  // useEffect(() => {
  //   const res =  GET(
  //     "/agricultural-services/my-agricultural-services?type=featured", storageToken
  //   );

  //   console.log(res, "huhyuggty");
  // }, [])

  const getAllFeaturedItems = async () => {
    try {
      const userData = JSON.parse(user);
      setLoader(true);
      const res = await GET(
        "/agricultural-services/my-agricultural-services?type=featured",
        storageToken
      );
      console.log(res, "huhyuggty");
      setLoader(false);
      setRowData(res.data);
      setTableRowData(res.data);

      // if (Array.isArray(res.data.products) && Array.isArray(res.data.services)) {
      //   const arr = [...res.data.products, ...res.data.services];
      //   setTableRowData(arr);
      //   setRowData(res.data);
      //   setLoader(false);
      // } else {
      //   // Handle the case where products or services are not iterable
      //   // You might display an error message or take appropriate action.
      // }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllFeaturedItems();
  }, []);
  // useEffect(()=>{},[tableRowData])

  return (
    <>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Featured Products & Services"
      />
      {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress size="15vh" />
        </div>
      ) : (
        <article
          className="vendor-profile-main"
          style={{ position: "relative" }}
        >
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
                <h3 style={{ marginLeft: "20px" }}>Featured Services List</h3>
                {/* <div className="featured-button-container">
                  <button
                    onClick={() => {
                      setButton({
                        all: true,
                        product: false,
                        service: false,
                      });
                      setRowData(tableRowData);
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
                      setRowData(allData.products);
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
                      setRowData(allData.services);
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
                </div> */}
              </div>

              <TableComponent
                tHeadData={tableHeadData}
                tRowData={rowData}
                edit={"featured"}
                activeCard={"total"}
              />
            </div>
          </div>
          <div
            className="so-top-filtericon"
            onClick={() => setShowFilterProp(!showFilterProp)}
          ></div>
          {showFilterProp && (
            <FilterProp
              featured
              sortData={sortData}
              setSortData={setSortData}
            />
          )}
        </article>
      )}
    </>
  );
}

export default Featured;
