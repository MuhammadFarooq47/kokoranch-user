import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Images from "../../../../constants/images";
export default function TradeDetails({ setShowTrade }) {
  const [previewImage, setPeviewImage] = useState(Images.Pictures.product[0]);
  const handleImageChange = (e, image) => {
    setPeviewImage(image);
    const elems = document.querySelectorAll(
      ".trade-details-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs_trade-thumb-image"
    );
    elems.forEach((elem) => {
      elem.classList.remove("image-thumb-active");
    });
    e.target.classList.add("image-thumb-active");
  };
  return (
    <div
      className="row orderDetails-wrapper "
      style={{ height: "min-content" }}
    >
      <div className="col-6">
        <h2 className="fs-2">Trade Request</h2>
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
          onClick={() => setShowTrade(false)}
        >
          <FaArrowLeft color="#14a384"></FaArrowLeft>&nbsp;Back
        </h3>
      </div>
      <div className="col-12">
        <div className="trade-details-wrapper container mt-5">
          <div className="trade-details-wrapper_image-desc-wrapper">
            <div className="trade-details-wrapper_image-desc-wrapper_trade-image-wrapper">
              <div className="trade-details-wrapper_image-desc-wrapper_trade-image-wrapper_trade-image">
                <img src={previewImage} alt="trade"></img>
              </div>
              <div className="trade-details-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs">
                {Images.Pictures.trade.map((image, index) => {
                  return (
                    <img
                      key={index}
                      className="trade-details-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs_trade-thumb-image"
                      src={image}
                      onClick={(e) => {
                        handleImageChange(e, image);
                      }}
                      alt="trade"
                    />
                  );
                })}
              </div>
            </div>
            <div className="trade-details-wrapper_image-desc-wrapper_trade-description">
              <div className="trade-details-wrapper_image-desc-wrapper_trade-description_top">
                <div className="trade-details-wrapper_image-desc-wrapper_trade-description_top_left">
                  <h3 className="fs-3 "> IN SEARCH OF:</h3>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>

                <div className="trade-details-wrapper_image-desc-wrapper_trade-description_top_right">
                  <div className="trade-details-wrapper_image-desc-wrapper_trade-description_top_right_seller-details-wrapper">
                    <button
                      className="btn btn-solid btn-solid-primary"
                      style={{ width: "10rem" }}
                    >
                      View Post
                    </button>
                  </div>
                </div>
              </div>
              <div className="trade-details-wrapper_image-desc-wrapper_trade-description_bottom">
                <div className="trade-details-wrapper_image-desc-wrapper_trade-description_bottom_inner-top">
                  <h3 className="fs-3 "> TO EXCHANGE WITH:</h3>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
                <div className="trade-details-wrapper_image-desc-wrapper_trade-description_bottom_inner-bottom">
                  <label for="firstName" className="form-label fs-4">
                    Details
                  </label>
                  <div className="form-control">
                    {" "}
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.. It is a long established fact that a reader
                    will be distracted by the readable content of a page when
                    looking at its layout. It is a long established fact that a
                    reader will be distracted by the readable content of a page
                    when looking at its layout. It is a long established fact
                    that a reader will be distracted by the readable content of
                    a page when looking at its layout.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* shipping , ratings and reviews start */}
          <div className="row trade-details-wrapper_tabs">
            <div className="col-12">
              {/* rating and reviews tab start */}

              <div className="tab-content_ratings-reviews">
                <div className="tab-content_ratings-reviews_customer-reviews-wrapper">
                  <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_title">
                    Your Comments
                  </h3>
                  {[1].map((count, index) => {
                    return (
                      <div
                        className="tab-content_ratings-reviews_customer-reviews-wrapper_review"
                        key={index}
                      >
                        <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper">
                          <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_name">
                            Jhon
                          </h3>

                          <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_date">
                            30/02/2022 12:32 PM
                          </span>
                        </div>
                        <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_content">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English. Many
                          desktop publishing packages and web page editors now
                          use Lorem Ipsum as their default model text, and a
                          search for 'lorem ipsum' will uncover many web sites
                          still in their infancy. Various versions have evolved
                          over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like)
                        </p>
                        <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper">
                          <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper">
                            <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_name">
                              Jhon{" "}
                              <span className="title-color fs-6">(Trader)</span>
                            </h3>

                            <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_date">
                              30/02/2022 12:32 PM
                            </span>
                          </div>
                          <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_content">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsu.
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {/* unread comments wrapper start */}
                  <div className="tab-content_ratings-reviews_customer-reviews-wrapper_unread-heading">
                    <hr></hr>
                    <h3 className="fs-3">Unread Comments</h3>
                    <hr></hr>
                  </div>
                  <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper">
                    <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper">
                      <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_name">
                        Jhon <span className="title-color fs-6">(Trader)</span>
                      </h3>
                      <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_date">
                        30/02/2022 12:32 PM
                      </span>
                    </div>
                    <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_content">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsu.
                    </p>
                  </div>
                  {/* unread comments wrapper end */}
                </div>
              </div>

              {/* rating and reviews tab end */}
            </div>
          </div>
          {/* shipping , ratings and reviews end */}
        </div>
      </div>
    </div>
  );
}
