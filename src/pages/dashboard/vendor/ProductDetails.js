import React, { useState } from "react";
import NavBar from "./NavBar";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { DELETE, PUT, PATCH } from "../../../apis/requests";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetails = ({ setSidebar, sidebar }) => {
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
  // console.log(location);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [deleteSuccessfulPopup, setDeleteSuccessfulPopup] = useState(false);
  const [data, setData] = useState(location?.state?.data);
  console.log("data222222222222222", data);
  const [orderStatus, setOrderStatus] = useState(location?.state?.data?.isActive);
  console.log("orderStatus", orderStatus)
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

  const updateStatusHandler = async () => {
try {
  const response = await axios.patch(`https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/products/${data?._id}`, {
    isActive: orderStatus
  },
  { headers : {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }}
  );
  toast.success("Status Updated Successfully...")
  navigate("/vendor-my-products")
  console.log("statusUpdate console", response)
} catch (error) {
  console.log(error)
}
  }
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
          <h3 className="mb-4">Update Status</h3>
          <div>
            <div className="soi-checkbox my-4">
              {orderStatus === true ? (
                <input
                  type="radio"
                  id="active"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus(true)}
                />
              ) : (
                <input
                  type="radio"
                  id="active"
                  name="order-status"
                  onClick={() => setOrderStatus(true)}
                />
              )}
              <label for="active" onClick={() => setOrderStatus(true)}>
                Active
              </label>
            </div>
            <div className="soi-checkbox my-4">
              {orderStatus === false ? (
                <input
                  type="radio"
                  id="inactive"
                  name="order-status"
                  checked
                  onClick={() => setOrderStatus(false)}
                />
              ) : (
                <input
                  type="radio"
                  id="inactive"
                  name="order-status"
                  onClick={() => setOrderStatus(false)}
                />
              )}
              <label for="inactive" onClick={() => setOrderStatus(false)}>
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
                // updateStatus();
                updateStatusHandler()
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

          <h3>
            Status Updated <br />
            Successfully
          </h3>

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

          <h3>
            Product Deleted <br />
            Successfully
          </h3>

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
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Product Details"
      />
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 d-flex justify-content-end align-items-center">
          <h3
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <span className="vtext-primary mx-2">&#10229;</span>Back
          </h3>
        </div>
      </div>
      <div className="bg-black-pad my-5 " style={{ height: "82vh" }}>
        <div className="soi-top ">
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
              <button
                className="btn btn-solid btn-solid-process soi-btn "
                onClick={() =>
                  navigate("/vendor-make-it-featured", {
                    state: { data: location?.state?.data, service: false },
                  })
                }
                style={{ width: "fit-content" }}
              >
                Make it Featured
              </button>
            </div>
          </div>
        </div>
        <div className="soi-main">
          <div className="d-flex justify-content-between align-items-center">
            {data?.isActive === true ? (
              <div>
                <h5
                  style={{
                    letterSpacing: "1px",
                    textAlign: "end",
                  }}
                >
                  Status: <span className="active-color"> Active </span>
                </h5>
              </div>
            ) : (
              <div>
                <h5
                  style={{
                    letterSpacing: "1px",
                    textAlign: "end",
                  }}
                >
                  Status: <span className="active-color"> In Active </span>
                </h5>
              </div>
            )}

            <button
              onClick={() => {
                setPopupOpen(true);
              }}
              className="btn btn-solid btn-solid-primary soi-btn mx-2"
              style={{ width: "fit-content" }}
            >
              Update Status
            </button>
          </div>
          <hr className="hr-rule" />
          <div className="row ">
            <div className="col-4 ">
              <h3 className="mb-4">Product Name:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.productName || data?.serviceName}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Category:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.category?.categoryName || data?.category?.title}
              </h5>
            </div>
            {data?.subCategory && (
              <>
                <hr className="hr-rule" />
                <div className="col-4 ">
                  <h3 className="mb-4">Sub Category:</h3>
                </div>
                <div className="col-8 d-flex justify-content-end">
                  <h5 className="mb-4 ">{data?.subCategory.subCategory}</h5>
                </div>
              </>
            )}
            {data?.subSubCategory && (
              <>
                {" "}
                <hr className="hr-rule" />
                <div className="col-4 ">
                  <h3 className="mb-4">Sub Sub Category:</h3>
                </div>
                <div className="col-8 d-flex justify-content-end">
                  <h5 className="mb-4 ">
                    {data?.subSubCategory.subSubCategory}
                  </h5>
                </div>
              </>
            )}
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Price:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">${data?.price}</h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-2 ">
              <h3 className="mb-4">Description :</h3>
            </div>
            <div className="col-10 d-flex justify-content-end">
              <p className="mb-4 ">
                {data?.description || data?.category?.description}
              </p>
            </div>
            {/* {data?.description?.map((item, index) => {
              return (
                <>
                  <hr className="hr-rule" />
                  <div className="col-2 ">
                    <h3 className="mb-4">Description {index + 1}:</h3>
                  </div>
                  <div className="col-10 d-flex justify-content-end">
                    <p className="mb-4 ">{item}</p>
                  </div>
                </>
              );
            })} */}

            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">In Stock:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 active-color">{data?.inStock || "---"}</h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Images:</h3>
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
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">New Location:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.shippingDetails?.itemLocation || "---"}
              </h5>
            </div>
            <hr className="hr-rule" />

            <div className="col-4 ">
              <h3 className="mb-4">Shipping To:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.shippingDetails?.shippingTo || "---"}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Delivery:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.shippingDetails?.delivery || "---"}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Return :</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.shippingDetails?.return || "---"}
              </h5>
            </div>
            <hr className="hr-rule" />
            <div className="col-4 ">
              <h3 className="mb-4">Shipping And Handling:</h3>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <h5 className="mb-4 ">
                {data?.shippingDetails?.shippingAndHandling || "---"}
              </h5>
            </div>
            <hr className="hr-rule" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
