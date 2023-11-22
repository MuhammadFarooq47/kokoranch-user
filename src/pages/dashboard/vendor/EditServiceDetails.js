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
  const { allCategories } = useSelector((state) => state.CategoriesReducers);
  const { user } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState("completed");
  const [age, setAge] = React.useState("");
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState({
    category: "",
    subCategory: "",
  });

  console.log(categories, "??????????????");

  const [data, setData] = useState({
    itemLocation: "",
    shippingTo: "",
    delivery: "",
    return: "",
    shippingAndHandling: "",
  });

  const [servicetDetails, setServicetDetails] = useState({
    serviceName: "",
    category: "",
    price: "",
    pricingDetails: "",
    serviceDescription: "",
    serviceArea: "",
    images: [],
    useSavedShippingDetails: false,
  });

  console.log("Product Details ===============>>>>>>", servicetDetails);

  const [productImages, setProductImages] = useState([]);
  const [detailInputs, setDetailsInputs] = useState([1, 1]);
  const [mainCategories, setMainCategoires] = useState([]);
  const [subCategories, setSubCategoires] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  console.log(
    "https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/agricultural-services-categories",
    serviceName?.data
  );

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/agricultural-services-categories"
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

  const getShippingDetail = async () => {
    try {
      // console.log("user", user._id);
      // setLoader(true);
      const res = await GET(
        `/shipping-details/${user._id}`
        // storageToken,
      );
      if (res.success == "fail") {
        // setLoader(false);
        // toast.error(res.message);
      } else {
        setData(res.data);
        // setLoader(false);
        // console.log("data", res.data);
      }
    } catch (err) {
      toast.error(err.message);
      // setLoader(false);
    }
  };

  useEffect(() => {
    if (storageToken && user) {
      getShippingDetail();
    }
  }, [storageToken, user]);

  // End shipping details api

  const handleFile = (e) => {
    const files = [...e.target.files];
    let arr = [...productImages];
    let arr2 = [...servicetDetails.images];
    if (files.length > 0) {
      files.map((item) => {
        console.log("imageeeeeeeeeeee>>>>>>>>", item);
        arr2.push(item);
        arr.push(URL.createObjectURL(item));
      });
      if (arr.length > 12) {
        toast.error("only upload upto 12 images");
      } else {
        setProductImages([...arr]);
        setServicetDetails({ ...servicetDetails, images: arr2 });
      }
    }
  };
  const handleProductDelete = (i) => {
    // console.log("indexx>>>>>>>", i);
    let arr = [...productImages];
    arr.splice(i, 1);
    setProductImages(arr);
  };

  // Dynamic input
  const addDescriptionInput = () => {
    let arr = [...detailInputs];
    arr.push(1);
    setDetailsInputs(arr);
    toast.success("description added successfully");
  };

  const getSubCategory = async () => {
    try {
      const res = await GET(
        "/subCategories/getCategoryById",
        null,
        `/${categories.category}`
      );
      // console.log('/////',res)
      if (res.success == true) {
        setSubCategoires(res.category);
      } else {
        setSubCategoires([]);
      }
    } catch (err) {
      console.log("errorrrr", err);
      setSubCategoires([]);
    }
  };
  const handleChangecategory = (event) => {
    setCategories({
      ...categories,
      category: event.target.value,
    });
    //  getSubCategory();
  };
  const handleChangeSubCategory = (event) => {
    setCategories({
      ...categories,
      subCategory: event.target.value,
    });
  };
  const handleChangeSubSubCategory = (event) => {
    setCategories({
      ...categories,
      subSubCategory: event.target.value,
    });
  };

  const onSubmit = async () => {
    // const userData= JSON.parse(user);
    try {
      const formData = new FormData();

      formData.append("serviceName", servicetDetails?.serviceName);
      formData.append("category", categories.category);
      formData.append("price", servicetDetails?.price);
      formData.append("pricingDetails", servicetDetails?.pricingDetails);
      formData.append("serviceDescription",servicetDetails?.serviceDescription);
      formData.append("serviceArea", servicetDetails?.serviceArea);
      formData.append("seller", user._id);
      // servicetDetails?.description.map((item) => {
      //   formData.append('description', item);
      // });

      servicetDetails?.images.map((item) => {
        formData.append("images", item);
      });

      console.log("formdata>>>>>>>>>>>>>>>>>>>>>>>>>>", formData);
      // formData.append('token', token);
      // formData.append('quantity', servicetDetails.inStock);
      const response = await POST(
        "/agricultural-services",
        storageToken,
        formData
      );
      console.log("eeeeeeeeeeeeeeeeeeeeee", response?.data);
      toast.success("Product add successfully");
      navigate("/vendor-agricultural-services");
    } catch (error) {
      console.log("Error to add products", error?.message);
    }

    // setSuccessfulPopup(true);
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
                value={servicetDetails.serviceName}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) =>
                  setServicetDetails({
                    ...servicetDetails,
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
                value={servicetDetails?.price}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) =>
                  setServicetDetails({
                    ...servicetDetails,
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
                value={servicetDetails?.serviceName}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  let arr = [...servicetDetails?.pricingDetails];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setServicetDetails({
                    ...servicetDetails,
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
                value={servicetDetails?.serviceDescription}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  let arr = [...servicetDetails?.serviceDescription];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setServicetDetails({
                    ...servicetDetails,
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
                value={servicetDetails?.serviceArea}
                style={{
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  let arr = [...servicetDetails.serviceArea];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setServicetDetails({ ...servicetDetails, serviceArea: arr });
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
