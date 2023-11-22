import React, { useState } from "react";
// import NavBar from "./NavBar";
import Popup from "../../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { DELETE, PUT } from "../../../../apis/requests";
import { IoIosArrowBack } from "react-icons/io";

const TradeDetails = ({ setSidebar, sidebar }) => {

  const responsive = {
    bigdesktop: {
      breakpoint: { max: 3000, min: 1900 },
      items: 4,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    desktop: {
      breakpoint: { max: 1900, min: 1440 },
      items: 5,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 5,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptopMd: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptopSm: {
      breakpoint: { max: 768, min: 500 },
      items: 2,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptopXs: {
      breakpoint: { max: 500, min: 425 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    phone: {
      breakpoint: { max: 425, min: 375 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    phoneMd: {
      breakpoint: { max: 375, min: 320 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    phoneSm: {
      breakpoint: { max: 320, min: 0 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  console.log("location??????????", location);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [deleteSuccessfulPopup, setDeleteSuccessfulPopup] = useState(false);
  const [data, setData] = useState(location?.state?.data);
  console.log("data222222222222222", data);
  const [orderStatus, setOrderStatus] = useState(location?.state?.data?.status);
  const deleteProduct = async () => {
    try {
      // console.log("id>>>>>>>>>>", data?._id);
      const res = await DELETE(`/products/${data?._id}`, token);
      setDeleteSuccessfulPopup(true);
      // console.log("res>>>>>>>>>>>>>>", res);
      if (res.status === "success") {
        setDeleteSuccessfulPopup(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateStatus = async () => {
    try {
      let obj = {
        status: orderStatus,
        files: data.images,
        data: data,
        shippingDetails: data.shippingDetails,
      };

      // const formData = new FormData();
      // console.log(data.images);
      // formData.append("name", data.name);
      // formData.append("description", data.description);
      // formData.append("category", data.category);
      // formData.append("subCategory", data.subCategory);
      // formData.append("price", data.price);
      // formData.append("quantity", data.quantity);
      // formData.append("location", data.shippingDetails.location);
      // formData.append(
      //   "shippingHandling",
      //   data.shippingDetails.shippingHandling
      // );
      // formData.append("returnPolicy", data.shippingDetails.returnPolicy);
      // formData.append("shippingTo", data.shippingDetails.shippingTo);
      // formData.append("delivery", data.shippingDetails.delivery);
      // formData.append("files", JSON.stringify(data.images));

      const res = await PUT(
        "/products/update-status",
        token,
        `${data?._id}`,
        obj
      );
      console.log(res);
      if (res.success == true) {
        setOrderStatus(res?.data?.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Product function
  // const hanldeDeleteProduct = async () => {
  //   let idToSave = ''; // Initialize a variable to store the ID

  //   rowData.map((v, i) => {
  //     console.log(v._id, "?????");
  //     idToSave = v._id; // Save the ID in the variable
  //   });

  //   console.log('Saved ID:', idToSave);
  //   const token = localStorage.getItem("token")
  //       try {
  //     const res = await DELETE(`/products/${idToSave}`, token );
  //     console.log("resssssssssssssssssssssssssssss", res);
  //      setDeleteProduct("");
  //   } catch (err) {
  //     console.log("errrrrrr", err);
  //   }
  // };

  return (
    <div>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="soi-update-status">
          <h5 className="mb-4">Update Status</h5>
          <div>
            <div className="soi-checkbox my-4">
              {orderStatus === "Active" ? (
                <input
                  type="radio"
                  id="active"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus("Active")}
                />
              ) : (
                <input
                  type="radio"
                  id="active"
                  name="order-status"
                  onClick={() => setOrderStatus("Active")}
                />
              )}
              <label for="active" onClick={() => setOrderStatus("Active")}>
                Active
              </label>
            </div>
            <div className="soi-checkbox my-4">
              {orderStatus === "inActive" ? (
                <input
                  type="radio"
                  id="inactive"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus("inActive")}
                />
              ) : (
                <input
                  type="radio"
                  id="inactive"
                  name="order-status"
                  onClick={() => setOrderStatus("inActive")}
                />
              )}
              <label for="inactive" onClick={() => setOrderStatus("inActive")}>
                Inactive
              </label>
            </div>
          </div>
          <div className="soi-popup-btns d-flex">
            <button
              className="btn btn-solid btn-solid-cancel btn-outline-primary soi-popup-btn"
              onClick={() => setPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-solid btn-solid-primary  soi-popup-btn"
              onClick={() => {
                setPopupOpen(false);
                setSuccessfulPopup(true);
                updateStatus();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </Popup>
      <Popup open={deletePopup} setOpen={setDeletePopup}>
        <div className="soi-update-status">
          <div className="successful-popup">
            <div className="sp-icon">
              <FaExclamation size={30} fill="black" />
            </div>
            <h5>
              Are You Sure You Want To
              <br />
              Delete This Product?
            </h5>
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

                deleteProduct();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Popup>
      <Popup open={successfulPopup} setOpen={setSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>

          <h5>
            Status Updated <br />
            Successfully
          </h5>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setSuccessfulPopup(false);
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      <Popup open={deleteSuccessfulPopup} setOpen={setDeleteSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>

          <h5>
            Product Deleted <br />
            Successfully
          </h5>

          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => {
              setDeleteSuccessfulPopup(false);
              navigate(-1);
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
      {/* <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Product Details"
      /> */}
    
      <div style={{ height: "82vh" }}>
       
        <div className="soi-main" style={{border: '1px solid #14a384', borderRadius: "10px"}}>
        <div className="soi-top mt-3">
          <div className="row">
            <div className="col-4 col-sm-12 col-md-4 col-lg-4 soi-orderNo">
              <h2>
                Product Code.
                {data?._id.substr(data?._id.length - 4).toUpperCase()}
              </h2>
            </div>
            <div className="col-2 col-sm-12 col-md-2 col-lg-2 soi-orderNo"></div>
            <div className="col-6 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-end align-items-center">
              <button
                onClick={() => {
                  navigate("/vendor-my-products/details/edit", { state: data });
                }}
                className="btn btn-solid btn-solid-primary soi-btn mx-2"
                style={{ width: "fit-content" }}
              >
                Edit
              </button>
              <button
                className="btn btn-solid btn-solid-danger soi-btn mx-3"
                onClick={() => setDeletePopup(true)}
                style={{ width: "fit-content" }}
              >
                Delete
              </button>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}  onClick={() => {
              navigate(-1);
            }}>
                <IoIosArrowBack color="#14A384" size={24} />
                <h5
                  style={{
                    letterSpacing: "1px",
                    textAlign: "end",
                  }}
                >
                  Go Back
                </h5>
              </div>
              {/* <button
                className="btn btn-solid btn-solid-process soi-btn "
                onClick={() =>
                  navigate("/vendor-make-it-featured", {
                    state: { data: location?.state?.data, service: false },
                  })
                }
                style={{ width: "fit-content" }}
              >
                Make it Featured
              </button> */}
            </div>
          </div>
        </div>
          {/* <div className="d-flex justify-content-between align-items-center">
           
              <div>
                <h5
                  style={{
                    letterSpacing: "1px",
                    textAlign: "end",
                  }}
                >
                  Product Code: <span className="active-color">  {data?._id.substr(data?._id.length - 4).toUpperCase()} </span>
                </h5>
              </div>
        
            
      

            <button
              onClick={() => {
                setPopupOpen(true);
              }}
              className="btn btn-solid btn-solid-primary soi-btn mx-2"
            >
             View Trade Post
            </button>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}  onClick={() => {
              navigate(-1);
            }}>
                <IoIosArrowBack color="#14A384" size={24} />
                <h5
                  style={{
                    letterSpacing: "1px",
                    textAlign: "end",
                  }}
                >
                  Go Back
                </h5>
              </div>
          </div> */}
          {/* <hr className="hr-rule" /> */}
          <div className="row ">
            <div className="col-4 ">
              <h5 className="mb-4">In Search of:</h5>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.isSearchOf}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h5 className="mb-4">To Exchange With:</h5>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.toExchangeWith}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-2 ">
              <h5 className="mb-4">Ad Description :</h5>
            </div>
            <div className="col-10 d-flex justify-content-end">
              <p className="mb-4 ">
                {data?.description}
              </p>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h5 className="mb-4">Images:</h5>
            </div>
            <div
              className="col-10 d-flex justify-content-end"
              style={{ gap: "15px", flexWrap: "wrap" }}
            >
              {/* <Carousel className="mx-2" infinite={true} responsive={responsive}></Carousel> */}
              {data?.images?.map((item) => {
                // console.log(item, "iiiiiiiiiiiiiiiii"); // Add this line to inspect 'item' in the console
                return (
                  <img
                    key={item?._id}
                    src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${
                      item || ""
                    }`}
                    style={{ height: "100px", width: "100px" }}
                    alt={`Data not found`}
                  />
                );
              })}
            </div>
          {/* <hr className="hr-rule" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDetails;

