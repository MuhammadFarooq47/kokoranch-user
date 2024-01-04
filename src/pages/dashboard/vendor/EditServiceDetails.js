import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ReactComponent as CameraInputIcon } from "../../../assets/images/icons/camera-input-icon.svg";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { GET, POST } from "../../../apis/requests";
import { useSelector } from "react-redux";
import axios from "axios";

function EditServiceDetails({ sidebar, setSidebar }) {
  const { user } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [categories, setCategories] = useState({
    category: "",
  });


  const [serviceDetails, setServiceDetails] = useState({
    serviceName: "",
    category: categories?.category,
    price: "",
    pricingDetails: "",
    serviceDescription: "",
    serviceArea: "",
    images: [],
  });


  useEffect(() => {
    console.log(serviceDetails);
  }, [serviceDetails]);

  const [productImages, setProductImages] = useState([]);
  const [serviceName, setServiceName] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.33:3030/api/v1//agricultural-services-categories"
      );
      setServiceName(response?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  {
    serviceName?.data?.map((data) => {
      console.log("title", data?.title);
    });
  }

  const storageToken = localStorage.getItem("token");

  const handleFile = (e) => {
    const files = [...e.target.files];
    let arr = [...productImages];
    let arr2 = [...serviceDetails.images];
    if (files.length > 0) {
      files.map((item) => {
        arr2.push(item);
        arr.push(URL.createObjectURL(item));
      });
      if (arr.length > 12) {
        toast.error("only upload upto 12 images");
      } else {
        setProductImages([...arr]);
        setServiceDetails((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...arr2],
        }));
      }
    }
  };

  const handleProductDelete = (i) => {
    let arr = [...productImages];
    arr.splice(i, 1);
    setProductImages(arr);
  };

  const handleChangecategory = (event) => {
    setCategories({
      ...categories,
      category: event.target.value,
    });
    //  getSubCategory();
  };

  const testFunction = () => {
    const formData = new FormData();

    formData.append("serviceName", serviceDetails?.serviceName);
    formData.append("category", categories.category);
    formData.append("price", serviceDetails?.price);
    formData.append("pricingDetails", serviceDetails?.pricingDetails);
    formData.append("serviceDescription", serviceDetails?.serviceDescription);
    formData.append("serviceArea", serviceDetails?.serviceArea);
    formData.append("seller", user._id);
    formData.append("allimages", serviceDetails?.images);
    serviceDetails?.images.map((item, index) => {
      formData.append(`images[${index}]`, item);
    });

    const formDataObject = Object.fromEntries(formData.entries());
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("serviceName", serviceDetails?.serviceName);
      formData.append("category", categories.category);
      formData.append("price", serviceDetails?.price);
      formData.append("pricingDetails", serviceDetails?.pricingDetails);
      formData.append("serviceDescription", serviceDetails?.serviceDescription);
      formData.append("serviceArea", serviceDetails?.serviceArea);
      formData.append("seller", user._id);

      serviceDetails?.images.map((item) => {
        formData.append("images", item);
      });

      // const formDataObject = Object.fromEntries(formData.entries());


      const response = await POST(
        "/agricultural-services",
        storageToken,
        formData
      );

      toast.success("Service added successfully");
      setTimeout(() => {
        navigate("/vendor-agricultural-services");
      }, 3000);
        
    } catch (error) {
      console.log("Error to add products", error?.message);
    }
  };

  return (
    <>
      <Popup open={successfulPopup} setOpen={setSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>
          <h3>
            Product Details Updated
            <br />
            Successfully
          </h3>
          <button
            className="btn btn-solid btn-solid-primary soi-success-btn"
            onClick={() => setSuccessfulPopup(false)}
          >
            Close
          </button>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title={"Add Services"}
      />
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "10px",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
          height: "86vh",
          overflowY: "scroll",
        }}
        className="edit-product-container"
        elevation={20}
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1 d-flex justify-content-end align-items-center">
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

        <div className="productDetailEdit-main">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Service Name
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Service Name"
                required
                value={serviceDetails.serviceName}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) =>
                  setServiceDetails({
                    ...serviceDetails,
                    serviceName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* console.log("title", data?.title) */}

          <div className="row">
            <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Service Category
              </label>
              <FormControl
                fullWidth
                style={{
                  borderRadius: "5px",
                  border: "1px solid #FFFFFF",
                  color: "white",
                }}
              >
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={categories.category}
                  label="Category"
                  onChange={handleChangecategory}
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "white !important",
                    },
                  }}
                >
                  {serviceName?.data?.map((data, index) => (
                    <MenuItem key={index} value={data._id}>
                      {data.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Price
              </label>

              <input
                type="number"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Add Product price"
                required
                value={serviceDetails?.price}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) =>
                  setServiceDetails({
                    ...serviceDetails,
                    price: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  height: "60px",
                }}
              >
                <label htmlFor="firstName" className="form-label">
                  Pricing Details
                </label>
              </div>
              <textarea
                rows={4}
                id="firstName"
                name="pricingDetails"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                className="form-control"
                value={serviceDetails?.pricingDetails}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  let arr = [...serviceDetails?.pricingDetails];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setServiceDetails({
                    ...serviceDetails,
                    pricingDetails: arr,
                  });
                }}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  height: "60px",
                }}
              >
                <label htmlFor="firstName" className="form-label">
                  Service Description
                </label>
              </div>
              <textarea
                rows={4}
                id="firstName"
                name="serviceDescription"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                className="form-control"
                value={serviceDetails?.serviceDescription}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  let arr = [...serviceDetails?.serviceDescription];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setServiceDetails({
                    ...serviceDetails,
                    serviceDescription: arr,
                  });
                }}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  height: "60px",
                }}
              >
                <label htmlFor="firstName" className="form-label">
                  Service Area
                </label>
              </div>
              <textarea
                rows={4}
                id="firstName"
                name="Description1"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                className="form-control"
                value={serviceDetails?.serviceArea}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  let arr = [...serviceDetails.serviceArea];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setServiceDetails({ ...serviceDetails, serviceArea: arr });
                }}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Upload Up to 12 Photos
              </label>
              <Grid container alignItems={"center"} spacing={2} gap="30px">
                <Grid item lg={3} md={4} sm={4} xs={12}>
                  <label
                    style={{
                      display: "inline-block",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        padding: "10px",
                        border: "0.5px solid #FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFile}
                        multiple
                      />
                      <CameraInputIcon
                        fill="#FFFFFF"
                        style={{ height: "30px", width: "30px" }}
                      />
                    </div>
                  </label>
                </Grid>
                {productImages.map((item, i) => {
                  return (
                    <Grid item lg={3} md={4} sm={4} xs={12}>
                      <div
                      key={i}
                        style={{
                          height: "100px",
                          width: "100px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <MdCancel
                          fill={"green"}
                          style={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            zIndex: 5,
                            cursor: "pointer",
                          }}
                          onClick={() => handleProductDelete(i)}
                        />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={() => {
                onSubmit();
                testFunction();
              }}
              className="btn btn-solid btn-solid-primary-rounded table-btn"
              style={{
                marginRight: "20px",
                paddingLeft: "20px",
                paddingRight: "20PX",
                width: "200px",
                height: "40px",
              }}
            >
              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              ></div>
              Add
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="btn btn-solid btn-outline-primary-rounded table-btn"
              style={{
                marginRight: "20px",
                paddingLeft: "20px",
                paddingRight: "20PX",
                width: "200px",
                height: "40px",
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
              Cancel
            </button>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default EditServiceDetails;
