import React, { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function ContactUs() {
  const [type, setType] = useState("service"); //eslint-disable-line
  return (
    <>
      <div className="container placed-order">
        <div className="row">
          <div className="col-12">
            <div className="placed-order_success-banner">
              <FaCheckCircle
                fontSize="2.5rem"
                style={{ marginBottom: ".2rem", fill: "#14a384" }}
              ></FaCheckCircle>
              {type === "product" ? (
                <>
                  <h6 className="fs-6">Order Placed </h6>
                  <h6 className="fs-6">Successfully </h6>
                </>
              ) : (
                <>
                  <h6 className="fs-6">Service Booked </h6>
                  <h6 className="fs-6">Successfully </h6>
                </>
              )}
            </div>
          </div>
        </div>

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
            >
              <FaArrowLeft color="#14a384"></FaArrowLeft>&nbsp;Back To Dasboard
            </h3>
          </div>
        </div>
        <div
          className="row orderDetails-wrapper "
          style={{ height: "min-content" }}
        >
          {type === "product" ? (
            <div className="col-12 orderDetails-wrapper_inner-wrapper">
              <div className="row">
                <div className="col-6 ">
                  <h3 className="title-color">Order No.34567</h3>
                </div>
                <div className="col-6  ">
                  <h3 className="title-color" style={{ textAlign: "right" }}>
                    Order Date: 02-22-2022
                  </h3>
                </div>
                <div className="col-12">
                  <div className="row orderDetails-wrapper_inner-wrapper_product-wrapper">
                    <div className="col-6">
                      <h3 className="title-color">Products</h3>
                    </div>
                    <div className="col-3">
                      <h3 className="title-color">Qty</h3>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-6">
                      <h5 className="h5">8/4 Dimensioned Black Walnut</h5>
                    </div>
                    <div className="col-3">
                      <h5 className="h5">2</h5>
                    </div>
                    <div className="col-3">
                      <h5 className="h5">$67</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="h5">8/4 Dimensioned Black Walnut</h5>
                    </div>
                    <div className="col-3">
                      <h5 className="h5">2</h5>
                    </div>
                    <div className="col-3">
                      <h5 className="h5">$67</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">Shipping Charges:</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5" style={{ textAlign: "right" }}>
                      $5.40
                    </h5>
                  </div>
                </div>
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
                      $153.40
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">Order Status</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5" style={{ textAlign: "right" }}>
                      $153.40
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">Order Status</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5 process" style={{ textAlign: "right" }}>
                      On the way
                    </h5>
                  </div>
                </div>
                <div className="col-12 ">
                  <h3 className="fs-3 title-color">Shipping Details</h3>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">Street</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5" style={{ textAlign: "right" }}>
                      7033 Hand Crescent Suite 382
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">City</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5" style={{ textAlign: "right" }}>
                      Ziemannmouth
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">State</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5" style={{ textAlign: "right" }}>
                      Bilzen
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">Zip Code</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5" style={{ textAlign: "right" }}>
                      54846-1290
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 orderDetails-wrapper_inner-wrapper">
              <div className="row">
                <div className="col-6 ">
                  <h3 className="title-color">Order No.34567</h3>
                </div>
                <div className="col-6  ">
                  <h3 className="title-color" style={{ textAlign: "right" }}>
                    Order Date: 02-22-2022
                  </h3>
                </div>
                <div className="col-12">
                  <div className="row orderDetails-wrapper_inner-wrapper_product-wrapper">
                    <div className="col-12">
                      <h3 className="title-color">Services</h3>
                    </div>
                    <div className="col-6">
                      <h5 className="h5">8/4 Dimensioned Black Walnut</h5>
                    </div>

                    <div className="col-6">
                      <h5 className="h5" style={{ textAlign: "right" }}>
                        $67
                      </h5>
                    </div>
                    <div className="col-6">
                      <h5 className="h5">8/4 Dimensioned Black Walnut</h5>
                    </div>

                    <div className="col-6">
                      <h5 className="h5" style={{ textAlign: "right" }}>
                        $67
                      </h5>
                    </div>
                  </div>
                </div>

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
                      $153.40
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 ">
                    <h5 className="fs-5">Order Status</h5>
                  </div>
                  <div className="col-6 ">
                    <h5 className="fs-5 process" style={{ textAlign: "right" }}>
                      On the way
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="btn btn-solid btn-solid-primary"
        style={{ margin: "6rem auto 0 auto" }}
      >
        Continue Shopping
      </button>
    </>
  );
}
