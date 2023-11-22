import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GET } from "../../../../apis/requests";
import {GET_USER_CHECKOUT_DATA} from "../../../../redux/actions/checkout";
import {useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment"

export default function OrderDetails(props) {

  const location = useLocation();
  console.log("Location,,,,,,,,", location?.state)
  const orderNum = location?.state?.orderNumber

  const [order, setOrder] = useState({}); //eslint-disable-line

  const {checkout} = useSelector((state) => state?.CheckoutReducer);
  // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::", checkout)


  // useEffect(() => {
  //   GET(`/orders`, props.order);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div
      className="row orderDetails-wrapper "
      style={{ height: "min-content" }}
    >
      <div className="row">
        <div className="col-6">
          <h2 className="fs-2 mb-5">Order Details</h2>
        </div>
        <div className="col-6">
          <h3
            className="fs-3 mb-5"
            style={{
              textAlign: "right",
              width: "fit-content",
              float: "right",
              cursor: "pointer",
            }}
            onClick={() => props.setShowOrder(false)}
          >
            <FaArrowLeft color="#14a384"></FaArrowLeft>&nbsp;Back
          </h3>
        </div>
      </div>
      {checkout?.map((order, index) => {
        if(orderNum === order?.orderNumber){
          console.log("Yes both ids are equal")
          return(
            <div className="col-12 orderDetails-wrapper_inner-wrapper">
            <div className="row">
              <div className="col-6 ">
                <h4 className="title-color">Order No. {order.orderNumber}</h4>
              </div>
              <div className="col-6  ">
                <h4 className="title-color" style={{ textAlign: "right" }}>
                  Order Date: {moment(order.createdAt).format("MMMM Do YYYY")}
                </h4>
              </div>
              <div className="col-12">
                <div className="row orderDetails-wrapper_inner-wrapper_product-wrapper">
                  <div className="col-6">
                    <h4 className="title-color">Products</h4>
                  </div>
                  <div className="col-2">
                    <h4 className="title-color" style={{ textAlign: "center" }}>
                      Qty
                    </h4>
                  </div>
                  <div className="col-2">
                  <h4 className="title-color" style={{ textAlign: "center" }}>
                     Unit Price
                    </h4>
                  </div>
                  <div className="col-2">
                  <h4 className="title-color" style={{ textAlign: "right", marginRight: "10px" }}>
                    Total
                    </h4>
                  </div>
                  {
                    order.items.map((product, index) => {
                      return (
                        <> 
                        <div key={product._id + " - " + index} style={{display: "flex", justifySelf: "center", justifyContent: "space-around"}}>
                          <div className="col-6">
                            <h5 className="h5">{product?.productId?.productName}</h5>
                          </div>
                          <div className="col-2">
                            <h5 className="h5" style={{ textAlign: "center" }}>
                              {product?.quantity}
                            </h5>
                          </div>
                          <div className="col-2">
                            <h5
                              className="h5"
                              style={{
                                textAlign: "center",
                                paddingRight: "1.5rem",
                              }}
                            >
                              ${product?.price}
                            </h5>
                          </div>
                          <div className="col-2">
                            <h5
                              className="h5"
                              style={{
                                textAlign: "right",
                                paddingRight: "1.5rem",
                              }}
                            >
                              ${product?.quantity * product?.price}
                            </h5>
                          </div>
                        </div>
                       
                        </>
                      );
                    })}
                </div>
              </div>
              {
                    order.items.map((productDelivery, index) => {
                      return (
                        <div className="row">
                        <div className="col-6 ">
                          <h5 className="fs-5">Shipping Charges:</h5>
                        </div>
                        <h5 className="fs-5" style={{ textAlign: "right" }}>
                            ${Number(productDelivery?.productId?.shippingDetails?.shippingAndHandling)}
                          </h5>
                      </div>
                       );
                    })}
              
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Card Used:</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    **** **** **** 1234
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Total Amount Paid</h5>
                </div>
                <div className="col-6 ">
                  <h4
                    className="fs-4"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    ${order?.totalPrice}
                  </h4>
                </div>
              </div>
  
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Order Status</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5 process" style={{ textAlign: "right" }}>
                   {order?.status}
                  </h5>
                </div>
              </div>
              <div className="col-12 ">
                <h4 className="fs-3 title-color">Shipping Details</h4>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Buyer Name</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.firstName + " " +  order?.lastName || "Not Available"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Buyer Number</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.phone || "Not Available"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Email</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.email || "Not Available"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Address</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.address || "Not Available"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">City</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.city || "Not Available"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">State</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.state || "Not Available"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <h5 className="fs-5">Zip Code</h5>
                </div>
                <div className="col-6 ">
                  <h5 className="fs-5" style={{ textAlign: "right" }}>
                    {order?.zipCode || "Not Available"}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          )
        }
      })}
     
      
      
    </div>
  );
}
