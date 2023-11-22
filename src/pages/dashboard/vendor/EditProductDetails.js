import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
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
import { GET, PUT } from "../../../apis/requests";
import Loader from "react-spinners/BarLoader";
function EditProductDetails({ sidebar, setSidebar }) {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userData");
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [mainCategories, setMainCategoires] = useState([]);
  const [subCategories, setSubCategoires] = useState([]);
  const [subSubCategories, setSubSubCategoires] = useState([]);
  const [productDetails, setProductDetails] = useState({
    productName: location?.state?.name,
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    price: location?.state?.price,
    description: location?.state?.description,
    inStock: location?.state?.quantity,
    images: location?.state?.images,
    useSavedShippingDetails: false,
    shippingDetails: {
      location: location?.state?.shippingDetails.location,
      shippingTo: location?.state?.shippingDetails.shippingTo,
      delivery: location?.state?.shippingDetails.delivery,
      returnPolicy: location?.state?.shippingDetails.returnPolicy,
      shippingHandling: location?.state?.shippingDetails.shippingHandling,
    },
  });
  const [categories, setCategories] = useState({
    mainCategory: location?.state?.category?._id,
    subCategory: location?.state?.subCategory?._id,
    subSubCategory: location?.state?.subSubCategory?._id,
  });
  const [categoriesName, setCategoriesName] = useState({
    mainCategory: location?.state?.category?.category,
    subCategory: location?.state?.subCategory?.subCategory,
    subSubCategory: location?.state?.subSubCategory?.subSubCategory,
  });
  const [orderStatus, setOrderStatus] = useState("completed");
  const [productImages, setProductImages] = useState(location?.state?.images);
  const [detailInputs, setDetailsInputs] = useState(
    location?.state?.description
  );
  const [data, setData] = useState(location?.state);
  const [editedProduct, setEditedProduct] = useState({});
  const handleFile = (e) => {
    const files = [...e.target.files];
    let arr = [...productImages];
    let arr2 = [...productDetails.images];
    if (files.length > 0) {
      files.map((item) => {
        arr2.push(item);
        arr.push(URL.createObjectURL(item));
      });
      if (arr.length > 12) {
        toast.error("only upload upto 12 images");
      } else {
        setProductImages([...arr]);
        setProductDetails({ ...productDetails, images: arr2 });
      }
    }
  };
  const handleProductDelete = (i) => {
    console.log("indexx>>>>>>>", i);
    let arr = [...productImages];
    let arr2 = [...productDetails.images];
    arr.splice(i, 1);
    arr2.splice(i, 1);
    setProductImages(arr);
    setProductDetails({ ...productDetails, images: arr2 });
  };
  const getSubSubCategory = async () => {
    try {
      console.log("hit Sub Sub");
      const res = await GET(
        "/subSubCategories/getSubSubCategoryById",
        null,
        `/${categories.mainCategory}/${categories.subCategory}`
      );
      console.log("/////", res);
      if (res.success == true) {
        setSubSubCategoires(res.category);
      } else {
        setSubSubCategoires([]);
      }
    } catch (err) {
      console.log("errorrrr", err);
      setSubSubCategoires([]);
    }
  };
  const getSubCategory = async () => {
    try {
      console.log("hit Sub");
      const res = await GET(
        "/subCategories/getCategoryById",
        null,
        `/${categories.mainCategory}`
      );
      console.log("/////subsub", res);
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
  const handleChangeMainCategory = (event) => {
    setCategories({
      ...categories,
      mainCategory: event.target.value,
    });
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
  const getCategories = async () => {
    try {
      const categories = await GET("/categories/get", null, "/product");
      if (categories.success == true) {
        setMainCategoires(categories.category);
      }
    } catch (err) {
      console.log("error on get categorries", err);
    }
  };
  useEffect(() => {
    getSubCategory();
  }, [categories]);
  useEffect(() => {
    getSubSubCategory();
  }, [subCategories]);
  useEffect(() => {
    getCategories();
    if (location?.state?.subCategory) {
      getSubCategory();
    }
    if (location?.state?.subSubCategory) {
      getSubSubCategory();
    }
  }, []);
  // Dynamic input
  const addDescriptionInput = () => {
    let arr = [...detailInputs];
    arr.push("");
    setDetailsInputs(arr);
    toast.success("description added successfully");
  };

  // on submit handler
  const onSubmitHandler = async () => {
    const userData = JSON.parse(user);
    const formData = new FormData();
    formData.append("name", productDetails.productName);
    const arr = productDetails.images.filter((item) => item?.public_id);
    const file = productDetails.images.filter((item) => !item?.public_id);
    console.log("public id", arr);
    console.log("file", file);

    if (arr.length > 0) {
      arr.map((item) => formData.append("images", item));
    }
    formData.append("oldImages", arr);
    console.log("images: ", formData.images);
    // uri: selectedImage.path,
    //   name: selectedImage?.filename ? selectedImage.filename : 'profileImg',
    //   type: selectedImage.mime,

    // formData.append("images", productDetails.images);
    productDetails?.images?.map((prodImage) => {
      formData.append("prod", prodImage);
    });
    formData.append("category", categories.mainCategory);
    categories.subCategory != undefined &&
      formData.append("subCategory", categories.subCategory);
    categories.subSubCategory != undefined &&
      formData.append("subSubCategory", categories.subSubCategory);
    formData.append("seller", userData._id);
    productDetails.description.map((item) => {
      formData.append("description", item);
    });
    formData.append("price", productDetails.price);
    formData.append("quantity", productDetails.inStock);
    Object.keys(productDetails.shippingDetails).forEach((key) =>
      formData.append(key, productDetails.shippingDetails[key])
    );
    console.log("formdata", formData);
    const res = await PUT(
      "/products/update",
      token,
      location?.state?._id,
      formData,
      true
    );
    console.log("eeeeeeeeeeeeeeeeeeeeee", res);
    // if(res?.success == true){
    //   toast.success(res.message);
    //   navigate('/vendor-my-products');
    // }
    // else{
    //   toast.error(res?.response?.data?.message)
    // }
    // setSuccessfulPopup(true);
  };
  // console.log('description>>>>>>>>>>>>>>>>>>>>>>>>>>>',productDetails?.description)
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
        title={
          location?.state?.addProduct ? "Add Product" : "Edit Product Details"
        }
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

        <div
          className="productDetailEdit-main"
          //   style={{
          //     display: "flex",
          //     flexDirection: "column",
          //     justifyContent: "space-between",
          //     height:'100%',
          //     // backgroundColor:'aqua'
          //     overflowY:"scroll",
          //     overflowX:'none'
          //   }}
        >
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Product Name
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="productName"
                value={productDetails?.productName}
                placeholder={data?.name}
                required
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    productName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Main Category
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.category?.category}
                required
              />
            </div>
            {data?.subCategory && (<div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Sub Category
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.subCategory?.subCategory}
                required
              />
            </div>)}
           {data?.subSubCategory && ( <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Sub-Sub Category
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.subSubCategory?.subSubCategory}
                required
              />
            </div>)}
          </div> */}
          <div className="row">
            <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Main Category
              </label>
              <FormControl
                fullWidth
                style={{
                  borderRadius: "5px",
                  border: "1px solid #FFFFFF",
                  color: "white",
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{
                    color: "rgba(228,219,233,0.25)",
                    "&.Mui-focused": {
                      color: "rgba(228,219,233,0.25)",
                    },
                  }}
                >
                  {categoriesName.mainCategory}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={categories.mainCategory?.category}
                  label={"categories.mainCategory?.category"}
                  onChange={handleChangeMainCategory}
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
                  {mainCategories.map((item, index) => (
                    <MenuItem key={index} value={item._id}>
                      {item.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {subCategories?.length > 0 && (
              <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Sub Category
                </label>
                <FormControl
                  fullWidth
                  style={{ borderRadius: "5px", border: "1px solid #FFFFFF" }}
                >
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    sx={{
                      color: "rgba(228,219,233,0.25)",
                      "&.Mui-focused": {
                        color: "rgba(228,219,233,0.25)",
                      },
                    }}
                  >
                    {categoriesName.subCategory}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categories.subCategory?.subCategory}
                    label={categories.subCategory?.subCategory}
                    onChange={handleChangeSubCategory}
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
                    {subCategories?.map((item) => (
                      <MenuItem value={item._id}>{item?.subCategory}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            {subSubCategories.length > 0 && (
              <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
                <label htmlFor="firstName" className="form-label">
                  Sub-Sub Category
                </label>
                <FormControl
                  fullWidth
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #FFFFFF",
                    color: "#FFFFFF",
                  }}
                >
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    sx={{
                      color: "rgba(228,219,233,0.25)",
                      "&.Mui-focused": {
                        color: "rgba(228,219,233,0.25)",
                      },
                    }}
                  >
                    {categoriesName.subSubCategory}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categories.subSubCategory?.subSubCategory}
                    label={categories.subSubCategory?.subSubCategory}
                    onChange={handleChangeSubSubCategory}
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
                    {subSubCategories.map((item) => (
                      <MenuItem value={item._id}>
                        {item.subSubCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
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
                name="price"
                value={productDetails?.price}
                placeholder={data?.price}
                required
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
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
                  Description 1
                </label>
                <button
                  className="btn btn-solid btn-solid-primary soi-success-btn"
                  onClick={() => addDescriptionInput()}
                >
                  Add Another Description
                </button>
              </div>
              <textarea
                rows={4}
                id="firstName"
                name="firstName"
                placeholder={data?.description[0]}
                required
                className="form-control"
                value={productDetails?.description[0]}
                onChange={(e) => {
                  let arr = [...productDetails.description];
                  arr[0] = e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setProductDetails({ ...productDetails, description: arr });
                }}
              ></textarea>
            </div>
          </div>
          {detailInputs.map(
            (item, i) =>
              i > 0 && (
                <div className="row">
                  <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
                    <label htmlFor="firstName" className="form-label">
                      Description {i + 1}
                    </label>
                    <textarea
                      rows={4}
                      id="firstName"
                      name="firstName"
                      placeholder={
                        item == ""
                          ? `Please Fill The Description ${i + 1}`
                          : item
                      }
                      required
                      className="form-control"
                      // value={productDetails.description[i]}
                      onChange={(e) => {
                        let arr = [...productDetails.description];
                        // console.log('consoleeeeeeeeeeeeeeee>>>>>>>',arr[i+1])
                        if (arr[i + 1] == undefined) {
                          arr.push(e.target.value);
                        } else {
                          arr[i + 1] = e.target.value;
                        }
                        setProductDetails({
                          ...productDetails,
                          description: arr,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
              )
          )}
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                In Stock
              </label>

              <input
                type="number"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.quantity}
                required
                value={productDetails?.inStock}
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    inStock: e.target.value,
                  });
                }}
              />
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
                          src={item?.url ? item.url : item}
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
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8 mb-5 col-sm-12 col-xs-12 d-flex flex-row ">
              <label htmlFor="firstName" className="form-label">
                Enter Shipping Details:
              </label>
              {/* <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ marginLeft: "20px" }}
                  type="checkbox"
                  value="Male"
                  name="gender"
                />{" "}
                <span style={{ marginLeft: "10px" }}>
                  use saved shipping details
                </span>
              </label> */}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Item location
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.shippingDetails?.location}
                required
                value={productDetails?.shippingDetails.location}
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    shippingDetails: {
                      ...productDetails.shippingDetails,
                      location: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Shipping to
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.shippingDetails?.shippingTo}
                required
                value={productDetails?.shippingDetails.shippingTo}
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    shippingDetails: {
                      ...productDetails.shippingDetails,
                      shippingTo: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Delivery
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.shippingDetails?.delivery}
                required
                value={productDetails?.shippingDetails.delivery}
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    shippingDetails: {
                      ...productDetails.shippingDetails,
                      delivery: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Return
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.shippingDetails?.returnPolicy}
                required
                value={productDetails?.shippingDetails.returnPolicy}
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    shippingDetails: {
                      ...productDetails.shippingDetails,
                      returnPolicy: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Shipping and Handling
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder={data?.shippingDetails?.shippingHandling}
                required
                value={productDetails?.shippingDetails.shippingHandling}
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    shippingDetails: {
                      ...productDetails.shippingDetails,
                      shippingHandling: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={() => {
                setSuccessfulPopup(true);
                onSubmitHandler();
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
                  // backgroundColor: "white",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              ></div>
              Update
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

export default EditProductDetails;
