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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GET, POST } from "../../../apis/requests";
import { useSelector } from "react-redux";
import axios from "axios";

function AddProductDetails({ sidebar, setSidebar }) {
  const { allCategories } = useSelector((state) => state.CategoriesReducers);
  const { user } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState("completed");
  const [age, setAge] = React.useState('');
  const token = localStorage.getItem("token");
  const [categories,setCategories]=useState({
    mainCategory:'',
    subCategory:'',
  });

  console.log(categories, "??????????????")

  const [data, setData] = useState({
    itemLocation: "",
    shippingTo: "",
    delivery: "",
    return: "",
    shippingAndHandling: "",
  });

  const [productDetails,setProductDetails]=useState({
    productName:'',
    mainCategory:'',
    subCategory:'',
    subSubCategory:'',
    price:'',
    description:'',
    // description:[
    // ],
    inStock:0,
    images:[],
    useSavedShippingDetails:false,
    shippingDetails: {
      itemLocation: '',
      shippingTo: '',
      delivery: '',
      return: '',
      shippingAndHandling: '',
    }
    
  })

  console.log("Product Details ===============>>>>>>", productDetails);
  
  const [productImages, setProductImages] = useState([]);
  const [detailInputs, setDetailsInputs] = useState([1, 1]);
  const [mainCategories,setMainCategoires]=useState([]);
  const [subCategories,setSubCategoires]=useState([]);
  const [subSubCategories,setSubSubCategoires]=useState([]);

  // console.log('details>>>>>>>>>>>>>>>>>>>',productDetails)

  // Start shpping details
  // const [data, setData] = useState({
  //   itemLocation: "",
  //   shippingTo: "",
  //   delivery: "",
  //   return: "",
  //   shippingAndHandling: "",
  // });

  const storageToken = localStorage.getItem("token")

  const getShippingDetail = async () => {
    try {
      // console.log("user", user._id);
      // setLoader(true);
      const res = await GET(
        `/shipping-details/${user._id}`,
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
    let arr2 = [...productDetails.images];
    if (files.length > 0) {
      files.map((item) => {
        console.log('imageeeeeeeeeeee>>>>>>>>',item)
        arr2.push(item);
        arr.push(URL.createObjectURL(item));
      });
      if (arr.length > 12) {
        toast.error("only upload upto 12 images");
      } else {
        setProductImages([...arr]);
        setProductDetails(
          {...productDetails,
          images:arr2
          }
        )
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

  const getSubCategory=async()=>{
    try{
      const res= await GET('/subCategories/getCategoryById',null,`/${categories.mainCategory}`);
      // console.log('/////',res)
      if(res.success == true){
        setSubCategoires(res.category)
      }
      else{
        setSubCategoires([]);
      }
    }
    catch(err){
      console.log('errorrrr',err);
      setSubCategoires([]);
    }
  }
  const handleChangeMainCategory = (event) => {
    setCategories({
      ...categories,
     mainCategory:event.target.value});
    //  getSubCategory();
  };
  const handleChangeSubCategory = (event) => {
    setCategories({
      ...categories,
     subCategory: event.target.value});
  };
  const handleChangeSubSubCategory = (event) => {
    setCategories({
      ...categories,
     subSubCategory: event.target.value});
  };
  // const getCategories=async()=>{
  //   try{
  //     const response =await  GET('/categories/get',null,'/product')
  //    console.log("response.category", response)
  //       setMainCategoires(response.category);
    
  //   }
  //   catch(err){
  //     console.log('error on get categorries',err);
  //   }
  // }
  // useEffect(()=>{
  //   getSubCategory();
  // },[categories]);

  // useEffect(()=>{
  //   getCategories();
  // },[])


  const onSubmit= async ()=>{
      // const userData= JSON.parse(user);
      try {
        const formData= new FormData();
        const shippingDetails = productDetails?.shippingDetails;
  
        formData.append('productName', productDetails?.productName);
        productDetails?.images.map((item) => {
          formData.append('images', item);
        });
        formData.append('category', categories.mainCategory);
        // if (categories.subCategory !== '') {
        //   formData.append('subCategory', categories.subCategory);
        // }
        // if (categories.subSubCategory !== '') {
        //   formData.append('subSubCategory', categories.subSubCategory);
        // }
        formData.append('seller', user._id);
        productDetails?.description.map((item) => {
          formData.append('description', item);
        });
        formData.append('price', productDetails?.price);
        formData.append('inStock', productDetails?.inStock);
        
        // Append individual properties of the shippingDetails object
        formData.append('shippingDetails.itemLocation', shippingDetails?.itemLocation);
        formData.append('shippingDetails.shippingTo', shippingDetails?.shippingTo);
        formData.append('shippingDetails.delivery', shippingDetails?.delivery);
        formData.append('shippingDetails.return', shippingDetails?.return);
        formData.append('shippingDetails.shippingAndHandling', shippingDetails?.shippingAndHandling);
        
        console.log('formdata>>>>>>>>>>>>>>>>>>>>>>>>>>', storageToken, formData);
        // formData.append('token', token);
        // formData.append('quantity', productDetails.inStock);
        const response = await POST('/products',  storageToken, formData);
        console.log('eeeeeeeeeeeeeeeeeeeeee', response?.data);
       toast.success("Product add successfully");
          navigate('/vendor-my-products');
      } catch (error) {
        console.log("Error to add products", error?.message)
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
      <NavBar setSidebar={setSidebar} sidebar={sidebar} title={"Add Product"} />
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
                name="firstName"
                placeholder="product name"
                required
                value={productDetails.productName }
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>setProductDetails({...productDetails,productName:e.target.value})}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
                Main Category
              </label>
            <FormControl fullWidth style={{borderRadius:'5px',border:'1px solid #FFFFFF',color:'white'}}>
            
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
              value={categories.mainCategory}
              label="Category"
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
             { allCategories.map((item,index)=> 
              
                (<MenuItem key={index}  value={item._id}>{item.categoryName}</MenuItem>)
              
              )}
            </Select>
            </FormControl>
            </div>
            { subCategories?.length>0 && (<div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
                Sub Category
              </label>
            <FormControl fullWidth style={{borderRadius:'5px',border:'1px solid #FFFFFF'}}>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categories.subCategory}
              label="Sub Category"
              onChange={handleChangeSubCategory}
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
            >
              {subCategories?.map(item=>(<MenuItem value={item._id}>{item?.subCategory}</MenuItem>))}
          
            </Select>
            </FormControl>
            </div>)}
            {subSubCategories.length>0 && (<div className="col-3 col-md-3 col-lg-3 mb-5 col-sm-12 col-xs-12">
            <label htmlFor="firstName" className="form-label">
                Sub-Sub Category
              </label>
            <FormControl fullWidth style={{borderRadius:'5px',border:'1px solid #FFFFFF'}}>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categories.subSubCategory}
              label="Sub-Sub Category"
              onChange={handleChangeSubSubCategory}
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(228, 219, 233, 0.25)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
            >
              {subSubCategories.map(item=>(<MenuItem value={item._id}>{item.subSubCategory}</MenuItem>))}
              
            </Select>
            </FormControl>
            </div>)}
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
                value={productDetails.price}
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>setProductDetails({...productDetails,price:e.target.value})}
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
                  Description 
                </label>
                {/* <button
                  className="btn btn-solid btn-solid-primary soi-success-btn"
                  onClick={() => addDescriptionInput()}
                >
                  Add Another Description
                </button> */}
              </div>
              <textarea
                rows={4}
                id="firstName"
                name="Description1"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                className="form-control"
                value={productDetails.description[0]}
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{
                  let arr=[...productDetails.description];
                  arr[0]= e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setProductDetails({...productDetails,description:arr})
                }}
              ></textarea>
            </div>
          </div>
          {/* {detailInputs.map((item, i) => {
            return (
              <div className="row">
                <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
                  <label htmlFor="firstName" className="form-label">
                    Description {i + 2}
                  </label>
                  <textarea
                    rows={4}
                    id="firstName"
                    name='description'
                    placeholder="30 days return, Buyers will pay return shipping fee "
                    required
                    className="form-control"
                    style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                    onChange={(e)=>{
                      let arr=[...productDetails.description];
                      // console.log('consoleeeeeeeeeeeeeeee>>>>>>>',arr[i+1])
                      if(arr[i+1] == undefined){
                        arr.push(e.target.value);
                      }
                      else{
                        arr[i+1]= e.target.value;
                      }
                      setProductDetails({...productDetails,description:arr})
                    }}
                  ></textarea>
                </div>
              </div>
            );
          })} */}
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
                placeholder="Free Shipping"
                required
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{setProductDetails({
                  ...productDetails,
                  inStock:e.target.value
                })}}
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
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8 mb-5 col-sm-12 col-xs-12 d-flex flex-row ">
              <label htmlFor="firstName" className="form-label">
                Enter Shipping Details:
              </label>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ marginLeft: "20px" }}
                  type="checkbox"
                  value="Male"
                  name="gender"
                  onChange={()=>setProductDetails({
                    ...productDetails,
                    useSavedShippingDetails:!productDetails.useSavedShippingDetails
                  })}
                />{" "}
                <span style={{ marginLeft: "10px" }}>
                  use saved shipping details
                </span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Item location
              </label>

              <input
                disabled={productDetails.useSavedShippingDetails == true? true:false}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Wisconsin"
                // value={data?.itemLocation}
                required
                style={{border:`1px solid ${productDetails.useSavedShippingDetails == true?'gray':'#FFFFFF'}`,color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{setProductDetails({
                  ...productDetails,
                  shippingDetails:{
                    ...productDetails.shippingDetails,
                    itemLocation:e.target.value
                  }
                })}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Shipping to
              </label>

              <input
              disabled={productDetails.useSavedShippingDetails == true? true:false}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                // value={data?.shippingTo}
                placeholder="Globally"
                required
                style={{border:`1px solid ${productDetails.useSavedShippingDetails == true?'gray':'#FFFFFF'}`,color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{setProductDetails({
                  ...productDetails,
                  shippingDetails:{
                    ...productDetails.shippingDetails,
                    shippingTo:e.target.value
                  }
                })}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Delivery
              </label>

              <input
              disabled={productDetails.useSavedShippingDetails == true? true:false}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                // value={data?.delivery}
                placeholder="local 14 days and Global 30 days"
                required
                style={{border:`1px solid ${productDetails.useSavedShippingDetails == true?'gray':'#FFFFFF'}`,color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{setProductDetails({
                  ...productDetails,
                  shippingDetails:{
                    ...productDetails.shippingDetails,
                    delivery:e.target.value
                  }
                })}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Return
              </label>

              <input
              disabled={productDetails.useSavedShippingDetails == true? true:false}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                // value={data?.return}
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                style={{border:`1px solid ${productDetails.useSavedShippingDetails == true?'gray':'#FFFFFF'}`,color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{setProductDetails({
                  ...productDetails,
                  shippingDetails:{
                    ...productDetails.shippingDetails,
                    return:e.target.value
                  }
                })}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Shipping and Handling
              </label>

              <input
              disabled={productDetails.useSavedShippingDetails == true? true:false}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                // value={data?.shippingAndHandling}
                placeholder="Free Shipping"
                required
                style={{border:`1px solid ${productDetails.useSavedShippingDetails == true?'gray':'#FFFFFF'}`,color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>{setProductDetails({
                  ...productDetails,
                  shippingDetails:{
                    ...productDetails.shippingDetails,
                    shippingAndHandling:e.target.value
                  }
                })}}
              />
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
                  // backgroundColor: "white",
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

export default AddProductDetails;
