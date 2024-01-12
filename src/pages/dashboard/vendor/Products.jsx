import React, { useState, useEffect } from "react";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import InfoCards from "./Components/InfoCards";
import FormControlAuth from "./Components/formControl";
import TableComponent from "./Components/Table";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { DELETE, GET } from "../../../apis/requests";
import { CircularProgress } from "@mui/material";

function VendorProducts({ setSidebar, sidebar }) {
  const user = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [tableHeadData, seTableHeadData] = useState([
    { id: "code", label: "code" },
    { id: "updateDate", label: "Update Date" },
    { id: "productName", label: "Product Name" },
    { id: "mainCategory", label: "Main Category" },
    { id: "price", label: "Price" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
    { id: "reviews", label: "Reviews" },
  ]);

  const [tableRowData, setTableRowData] = useState([]);

  const [filterCard, setFilterCard] = useState([]);

  const [activeCard, setActiveCard] = useState("all");
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteSuccessfulPopup, setDeleteSuccessfulPopup] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [subSubcategory, setSubSubCategory] = useState("");
  const [rowData, setRowData] = useState([]);
  const [sortData, setSortData] = useState("");
  const [category, setCategory] = useState("");
  const [deleteProduct, setDeleteProduct] = useState("");
  const [options, setOptions] = useState([
    "All",
    "Landscaping",
    "lawn Mowing",
    "Tree Services",
    "tractor Repair",
  ]);


  

  useEffect(() => {
    if (filterCard.length > 0 && tableRowData.length > 0) {
      let temp = [];
      if (activeCard == "all") {
        temp = tableRowData;
      }
      else if (activeCard == "active") {
        temp = tableRowData.filter((item) => [true,"true"].includes(item?.isActive));
      }
      else if (activeCard == "inActive") {
        temp = tableRowData.filter((item) =>  [false,"false"].includes(item?.isActive));
      }
      setRowData(temp);
      // setTableRowData(temp)
    }
  }, [activeCard, filterCard, tableRowData]);
  
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
  }, [sortData, rowData]);


 

  const getAllVendorProducts = async () => {
    try {
    setLoader(true);
    const res = await GET(`/products/my-products?status=${activeCard}`);
   
      // setVendorProducts(res.products);

      let arr = [...res?.data];
      // res.products.map((item,i)=>
      // {
      //   arr.push({
      //     code:i +1,
      //     updateDate:moment(item.updatedAt).format("YYYY/MM/DD"),
      //     productName:item.name,
      //     mainCategory:item.category.category,
      //     price:item.price,
      //     status:item.status,
      //     action:"Action"
      //   })
      // }
      // )
      setTableRowData(arr);
      
      let filterArray = [
        { topText: "all", bottomText: arr.length },
        {
          topText: "active",
          bottomText: arr.filter((item) => item?.isActive==true).length,
        },
        {
          topText: "inActive",
          bottomText: arr.filter((item) => item?.isActive == false)
            .length,
        },
      ];
      setFilterCard(filterArray);
      setRowData(arr);
      setLoader(false);
    
    } catch (error) {
      console.log("Error to get vendor Products")
    }
    

  };
  useEffect(() => {
    getAllVendorProducts();
  }, []);

 const hanldeDeleteProduct = async () => {
  let idToSave = ''; // Initialize a variable to store the ID

  rowData.map((v, i) => {
    idToSave = v._id; // Save the ID in the variable
  });
  
  const token = localStorage.getItem("token")
  try {
    const res = await DELETE(`/products/${idToSave}`, token );

    // After successful deletion, filter out the deleted item from rowData and tableRowData
    const updatedRowData = rowData.filter(item => item._id !== idToSave);
    const updatedTableRowData = tableRowData.filter(item => item._id !== idToSave);

    // Update the state
    setRowData(updatedRowData);
    setTableRowData(updatedTableRowData);

    setDeleteProduct("");
  } catch (err) {
    console.log("errrrrrr", err);
  }
};




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
              Delete This Product?
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
                setDeleteSuccessfulPopup(true);
                hanldeDeleteProduct();
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
            Product Deleted <br />
            Successfully
          </h3>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setDeleteSuccessfulPopup(false);
              navigate("/vendor-my-products");
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      <NavBar setSidebar={setSidebar} sidebar={sidebar} title="My Products" />
      {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress size="15vh" />
        </div>
      ) : (
        <article className="vendor-profile-main">
          <div className="vendor-profile-main_form">
            <InfoCards
              data={filterCard}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              sortData={sortData}
              setSortData={setSortData}
            />
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
                  <FormControlAuth setCategory={setCategory} />
                  {category && (
                    <FormControlAuth
                      setSubCategory={setSubCategory}
                      isSubCategory
                    />
                  )}
                  {subCategory && (
                    <FormControlAuth
                      setSubSubCategory={setSubSubCategory}
                      isSubCategory
                    />
                  )}
                </div>
                <div className="row">
                  <div className="col-5">
                    <h4 style={{ marginLeft: "20px" }}>Product List:</h4>
                  </div>
                  <div className="col-7 d-flex justify-content-end">
                    <button
                      onClick={() => {
                        navigate("/vendor-my-products/add-product", {
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
                      Add Product
                    </button>
                  </div>
                </div>
                <TableComponent
                  tHeadData={tableHeadData}
                  tRowData={rowData}
                  edit={"products"}
                  activeCard={"total"}
                  open={deletePopup}
                  setOpen={setDeletePopup}
                  setDeleteProduct={setDeleteProduct}
                />
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default VendorProducts;
