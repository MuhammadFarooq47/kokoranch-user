import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import Images from "../../../constants/images";
export default function Payment() {
  //   const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    // setValue,
    // getValues,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const handleOrder = async (values) => {
    console.log(values);
    setLoading(true);
    // closeSnackbar();
    // try {
    //   setLoading(true);
    //   const { data } = await axios.post(
    //     `/api/orders`,
    //     {},
    //     {
    //       headers: {
    //         authorization: `Bearer `,
    //       },
    //     }
    //   );
    //   setLoading(false);
    //   navigate("/payment", {
    //     query: { orderID: data.orderId },
    //   });
    // } catch (err) {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <div
        className="container mt-5 payment-wrapper"
        style={{
          position: "relative",
        }}
      >
        <img
          src={Images.Pictures.brownRightLeaf}
          style={{
            position: "absolute",
            top: "3rem",
            right: "0rem",
            width: "40rem",
            transform: "rotate(270deg)",
            zIndex: "-1",
          }}
          alt="signup"
        ></img>
        <img
          src={Images.Pictures.brownLeftLeaf}
          style={{
            position: "absolute",
            bottom: "-30rem",
            left: "-5rem",
            width: "60rem",
            zIndex: "-1",
          }}
          alt="signup"
        ></img>
        <h2 className=" fs-2 mb-4">Payment</h2>
        <div className="row">
          <div className="col-md-8 col-sm-12 payment-wrapper_tabs">
            <ul class="nav  nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="visa-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#visa"
                  type="button"
                  role="tab"
                  aria-controls="visa"
                  aria-selected="true"
                >
                  <img
                    width="80"
                    height="50"
                    sr
                    alt="signup"
                    c={Images.Pictures.tabPayments[0]}
                  ></img>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="master-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#master"
                  type="button"
                  role="tab"
                  aria-controls="master"
                  aria-selected="false"
                >
                  <img
                    width="80"
                    height="50"
                    sr
                    alt="signup"
                    c={Images.Pictures.tabPayments[1]}
                  ></img>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pay-pal-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pay-pal"
                  type="button"
                  role="tab"
                  aria-controls="pay-pal"
                  aria-selected="false"
                >
                  <img
                    width="80"
                    height="50"
                    sr
                    alt="signup"
                    c={Images.Pictures.tabPayments[2]}
                  ></img>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="amex-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#amex"
                  type="button"
                  role="tab"
                  aria-controls="amex"
                  aria-selected="false"
                >
                  <img
                    width="80"
                    height="50"
                    sr
                    alt="signup"
                    c={Images.Pictures.tabPayments[3]}
                  ></img>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="discover-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#discover"
                  type="button"
                  role="tab"
                  aria-controls="discover"
                  aria-selected="false"
                >
                  <img
                    width="80"
                    height="50"
                    sr
                    alt="signup"
                    c={Images.Pictures.tabPayments[4]}
                  ></img>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="bit-pay-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#bit-pay"
                  type="button"
                  role="tab"
                  aria-controls="bit-pay"
                  aria-selected="false"
                >
                  <img
                    width="80"
                    height="50"
                    sr
                    alt="signup"
                    c={Images.Pictures.tabPayments[5]}
                  ></img>
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              {/* visa tab start */}
              <div
                class="tab-pane fade show active"
                id="visa"
                role="tabpanel"
                aria-labelledby="visa-tab"
              >
                <div className="visa-card-wrapper">
                  <form
                    className="row px-5 my-3"
                    id="my-form"
                    onSubmit={handleSubmit(handleOrder)}
                  >
                    <div className="row">
                      <div className="col-md-6 col-sm-12 mt-4">
                        <label htmlFor="card-number" className="form-label">
                          CARD NUMBER
                        </label>
                        <Controller
                          name="card-number"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => {
                            return (
                              <input
                                className="form-control card-number"
                                name={field.name}
                                value={field.value}
                                placeholder="0000 0000 0000 0000"
                                onChange={field.onChange}
                                error={errors.firstName}
                              />
                            );
                          }}
                        ></Controller>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12 mt-4">
                        <label htmlFor="card-name" className="form-label">
                          CARDHOLDER NAME
                        </label>
                        <Controller
                          name="card-name"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => {
                            return (
                              <input
                                className="form-control card-name"
                                name={field.name}
                                value={field.value}
                                placeholder="Jhon"
                                onChange={field.onChange}
                                error={errors.firstName}
                              />
                            );
                          }}
                        ></Controller>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12 mt-4">
                        <label htmlFor="card-expiry" className="form-label">
                          EXPIRE DATE
                        </label>
                        <Controller
                          name="card-expiry"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => {
                            return (
                              <input
                                className="form-control card-expiry"
                                name={field.name}
                                value={field.value}
                                placeholder="05/21"
                                onChange={field.onChange}
                                error={errors.firstName}
                              />
                            );
                          }}
                        ></Controller>
                      </div>
                      <div className="col-md-6 col-sm-12 mt-4">
                        <label htmlFor="card-cvv" className="form-label">
                          CVV
                        </label>
                        <Controller
                          name="card-cvv"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => {
                            return (
                              <input
                                className="form-control card-cvv"
                                name={field.name}
                                value={field.value}
                                placeholder="123"
                                onChange={field.onChange}
                                error={errors.firstName}
                              />
                            );
                          }}
                        ></Controller>
                      </div>
                      <div className="col-12 mt-5">
                        {loading ? (
                          <div
                            className="spinner-border"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              marginTop: "2rem",
                            }}
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <button className="btn btn-solid btn-solid-primary py-3 px-5">
                            Pay now
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* visa tab end */}
              {/* master tab start */}
              <div
                class="tab-pane fade"
                id="master"
                role="tabpanel"
                aria-labelledby="master-tab"
              ></div>
              {/* master tab end */}
              {/* pay-pal tab start */}
              <div
                class="tab-pane fade"
                id="pay-pal"
                role="tabpanel"
                aria-labelledby="master-tab"
              ></div>
              {/*  pay-pal tab end */}
              {/* amex-pay tab start */}
              <div
                class="tab-pane fade"
                id="amex-pay"
                role="tabpanel"
                aria-labelledby="master-tab"
              ></div>
              {/*  amex-pay tab end */}
              {/* discover tab start */}
              <div
                class="tab-pane fade"
                id="discover"
                role="tabpanel"
                aria-labelledby="master-tab"
              ></div>
              {/*  discover tab end */}
              {/* bit-pay tab start */}
              <div
                class="tab-pane fade"
                id="bit-pay"
                role="tabpanel"
                aria-labelledby="master-tab"
              ></div>
              {/*  bit-pay tab end */}
            </div>
          </div>
          <div className="col-md-4 col-sm-12 p-2 mt-sm-4">
            <div className="checkout-summery-wrapper">
              <h3 className="fs-3 "> Summery</h3>
              <div className="cart-summery-wrapper_inner-wrapper">
                <p>items(4)</p>
                <h5 className="fs-5">usd.22</h5>
              </div>
              <div className="cart-summery-wrapper_inner-wrapper">
                <p>Delivery Charges</p>
                <h5 className="fs-5">usd.22</h5>
              </div>
              <div className="cart-summery-wrapper_inner-wrapper">
                <p>Total</p>
                <h5 className="fs-5">usd.22</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
