import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { ReactComponent as CameraInputIcon } from "../../../../assets/images/icons/camera-input-icon.svg";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { GET, POST } from "../../../../apis/requests";
import { useDispatch } from "react-redux";
import axios from "axios";
import {CREATE_TRADE_ACTION} from "../../../../redux/actions/trades";

function Trade() {
  let navigate = useNavigate();
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const token = localStorage.getItem("token");
const dispatch = useDispatch();



  const [trades,setTrades]=useState({
    isSearchOf:'',
    toExchangeWith:'',
    description:'',
    images:[],
  })

  
  const [productImages, setProductImages] = useState([]);
  const [detailInputs, setDetailsInputs] = useState([1, 1]);


  const storageToken = localStorage.getItem("token")

  const handleFile = (e) => {
    const files = [...e.target.files];
    let arr = [...productImages];
    let arr2 = [...trades.images];
    if (files.length > 0) {
      files.map((item) => {
        arr2.push(item);
        arr.push(URL.createObjectURL(item));
      });
      if (arr.length > 12) {
        toast.error("only upload upto 12 images");
      } else {
        setProductImages([...arr]);
        setTrades(
          {...trades,
          images:arr2
          }
        )
      }
    }
  };
  const handleProductDelete = (i) => {
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




  const onSubmit= async ()=>{

      try {
        const formData= new FormData();
  
        formData.append('isSearchOf', trades?.isSearchOf);
        formData.append('toExchangeWith', trades?.toExchangeWith);
        trades?.description.map((item) => {
          formData.append('description', item);
        });
        trades?.images.map((item) => {
          formData.append('images', item);
        });
        // dispatch(CREATE_TRADE_ACTION(formData))
        const response = await axios.post('https://kokoranch-backend.vercel.app/api/v1/trades', formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storageToken}`,
          },
        });
       toast.success("Trade Created successfully");
          // navigate('/vendor-my-products');
      } catch (error) {
        console.log("Error to add products", error?.message)
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
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "10px",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
          height: "86vh",
        }}
        className="single-trade"
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
          className="productDetailEdit-main">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
              In Search of:
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Trade In Search of"
                required
                value={trades.isSearchOf }
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>setTrades({...trades,isSearchOf: e.target.value})}
              />
            </div>
          </div>
         
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
              To Exchange With:
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Trade To Exchange With"
                required
                value={trades?.toExchangeWith}
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent'}}
                onChange={(e)=>setTrades({...trades,toExchangeWith: e.target.value})}
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
                 Add Description 
                </label>
              </div>
              <textarea
                rows={4}
                id="firstName"
                name="Description1"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                className="form-control"
                value={trades.description[0]}
                style={{border:'1px solid #FFFFFF',color:'#FFFFFF', backgroundColor:'transparent', width: "75%"}}
                onChange={(e)=>{
                  let arr=[...trades.description];
                  arr[0]= e.target.value;
                  // arr.push(e.target.name=e.target.value)
                  setTrades({...trades,description:arr})
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
         
          <div style={{ display: "flex", flexDirection: "row"}}>
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
              Upload
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

export default Trade;
