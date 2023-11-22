import { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { GET_TRADE } from "../../../redux/actions/trades";
import Images from "../../../constants/images";
import Pagination from "../../../components/pagination";
import Popup from "../../../components/popUp/popUp.js";

import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CREATE_TRADE_REQUEST_ACTION } from "../../../redux/actions/trades";
import TradeCarosual from "../../../components/TradeCarosual";
export default function Product() {
  const dispatch = useDispatch();
  const { trade, createTradeRequest } = useSelector(
    (state) => state.TradesReducers
  );
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("userData"));

  const [newTradeRequest, setnewTradeRequest] = useState({
    tradeId: id,
    user: user?._id,
    tradeRequestMessage: "",
    traderId: "",
  });
  const [previewImage, setPeviewImage] = useState(trade?.images[0]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  // handle image change
  const handleImageChange = (e, image) => {
    setPeviewImage(image);
    const elems = document.querySelectorAll(
      ".trade-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs_trade-thumb-image"
    );
    elems.forEach((elem) => {
      elem.classList.remove("image-thumb-active");
    });
    e.target.classList.add("image-thumb-active");
  };

  const handleChange = (e) => {
    setnewTradeRequest({
      ...newTradeRequest,
      tradeRequestMessage: e.target.value,
    });
  };

  const handleSubmitTradeRequest = () => {
    dispatch(
      CREATE_TRADE_REQUEST_ACTION(
        newTradeRequest,
        localStorage.getItem("token")
      )
    );
  };
  useEffect(() => {
    if (id) {
      // dispatch(GET_TRADE(id));
    }

    if (createTradeRequest) {
      setnewTradeRequest({
        tradeId: id,
        user: user?._id,
        tradeRequestMessage: "",
      });
    }
  }, [createTradeRequest]);

  useEffect(() => {
    if (trade) {
      setnewTradeRequest({
        ...newTradeRequest,
        traderId: trade?.traderId._id,
      });
    }
  }, [trade]);

  return (
    <>
      <div className="trade-wrapper container mt-5">
        <Popup title="dasdasd" image="dasd" />
        <div className="trade-wrapper_image-desc-wrapper">
          <div className="trade-wrapper_image-desc-wrapper_trade-image-wrapper">
            <div className="trade-wrapper_image-desc-wrapper_trade-image-wrapper_trade-image">
              <img
                src={previewImage ? previewImage : trade?.images[0]}
                alt="trade"
              ></img>
            </div>
            <div className="trade-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs">
              {trade?.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="trade-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs_trade-thumb-image"
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
          <div className="trade-wrapper_image-desc-wrapper_trade-description">
            <div className="trade-wrapper_image-desc-wrapper_trade-description_top">
              <div className="trade-wrapper_image-desc-wrapper_trade-description_top_left">
                <h3 className="fs-3 "> IN SEARCH OF:</h3>
                <p>{trade?.inSearchOf}</p>
              </div>

              <div className="trade-wrapper_image-desc-wrapper_trade-description_top_right">
                <div className="trade-wrapper_image-desc-wrapper_trade-description_top_right_seller-details-wrapper">
                  <h6 className="fs-6">
                    {moment(trade?.createdAt).format("MMM DD YYYY h:mm A")}
                  </h6>
                  <span className="trade-wrapper_image-desc-wrapper_trade-description_top_right_seller-details-wrapper_title">
                    Seller:
                  </span>

                  <h5
                    className="fs-5"
                    style={{ borderBottom: "1px solid #707070" }}
                  >
                    {trade?.traderId.firstName + "" + trade?.traderId.lastName}
                    &nbsp;
                    <img
                      src={trade?.traderId.image}
                      width="20"
                      height="10"
                      alt="trader"
                      style={{
                        display: "flex",
                        justify: "space-between",
                        alignItems: "center",
                        transform: "skewX(30deg)",
                      }}
                    ></img>
                  </h5>
                  <h6
                    onClick={() => setPopupOpen(true)}
                    className="trade-wrapper_image-desc-wrapper_trade-description_top_right_seller-details-wrapper_vendor-btn"
                  >
                    Contact trader
                    <FaAngleRight />
                  </h6>

                  <Link
                    to={"/seller-trades/" + trade?.traderId._id}
                    className="trade-wrapper_image-desc-wrapper_trade-description_top_right_seller-details-wrapper_vendor-btn"
                  >
                    View all trades
                    <FaAngleRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="trade-wrapper_image-desc-wrapper_trade-description_bottom">
              <div className="trade-wrapper_image-desc-wrapper_trade-description_bottom_inner-top">
                <h3 className="fs-3 "> TO EXCHANGE WITH:</h3>
                <p>{trade?.toExchangeWith}</p>
              </div>
              <div className="trade-wrapper_image-desc-wrapper_trade-description_bottom_inner-bottom">
                <label htmlFor="firstName" className="form-label fs-4">
                  Details
                </label>
                <div className="form-control"> {trade?.details}</div>
              </div>
            </div>
          </div>
        </div>
        {/* shipping , ratings and reviews start */}
        <div className="row trade-wrapper_tabs">
          <div className="col-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="ratings-reviews-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#ratings-reviews"
                  type="button"
                  role="tab"
                  aria-controls="ratings-reviews"
                  aria-selected="false"
                >
                  Comments
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              {/* rating and reviews tab start */}
              <div
                className="tab-pane fade show active"
                id="ratings-reviews"
                role="tabpanel"
                aria-labelledby="ratings-reviews-tab"
              >
                <div className="tab-content_ratings-reviews">
                  <div className="tab-content_ratings-reviews_inner-wrapper row">
                    <h2 className="fs-2">Post your Comment</h2>
                    <textarea
                      name={"tradeRequestMessage"}
                      value={newTradeRequest.tradeRequestMessage}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="tab-content_ratings-reviews_inner-wrapper_input"
                    ></textarea>
                    <button
                      onClick={() => {
                        handleSubmitTradeRequest();
                      }}
                      onSubmit={() => {
                        handleSubmitTradeRequest();
                      }}
                      className="btn btn-solid btn-solid-primary-rounded tab-content_ratings-reviews_inner-wrapper_button"
                    >
                      Submit
                    </button>
                  </div>

                  <div className="row trade-details-wrapper_tabs">
                    <div className="col-12">
                      <div className="tab-content_ratings-reviews_customer-reviews-wrapper">
                        <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_title">
                          Customer Comments
                        </h3>
                        {trade?.tradeRequests.map((item, index) => {
                          return (
                            <div
                              className="tab-content_ratings-reviews_customer-reviews-wrapper_review"
                              key={index}
                            >
                              <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper">
                                <h4 className="fs-4tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_name">
                                  {item.user.firstName}
                                </h4>

                                <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_date">
                                  {moment(item?.createdAt).format(
                                    "MMM DD YYYY h:mm A"
                                  )}{" "}
                                </span>
                              </div>
                              <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_content">
                                {item.tradeRequestMessage}
                              </p>

                              {item.tradeRequestComments.map((item1, index) => {
                                return (
                                  <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper">
                                    <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper">
                                      <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_name">
                                        {item1.traderId.firstName +
                                          " " +
                                          item1.traderId.lastName}
                                        <span className="title-color fs-6">
                                          (Trader)
                                        </span>
                                      </h3>

                                      <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_date">
                                        {moment(item1?.createdAt).format(
                                          "MMM DD YYYY h:mm A"
                                        )}{" "}
                                      </span>
                                    </div>
                                    <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_content">
                                      {item1?.tradeRequestComment}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                        <div>
                          <Popup open={popupOpen} setOpen={setPopupOpen}>
                            <div className="model-contact-wrapper">
                              <h2 className=" fs-2 model-contact-wrapper_popup-title text-center">
                                Contact
                              </h2>
                              <form
                                className="model-contact-wrapper_popup-body"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  setPopupOpen(false);
                                  setSuccessPopupOpen(true);
                                }}
                              >
                                <div className="model-contact-wrapper_popup-body_input-wrapper">
                                  <label for="firstName" className="form-label">
                                    Message
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    // value={user.firstName}
                                    // onChange={onchange}
                                    rows={8}
                                    name="firstName"
                                    placeholder="Type Message Here.."
                                    // required
                                  ></textarea>
                                </div>
                                <button
                                  className="btn btn-solid btn-solid-primary-rounded model-contact-wrapper_popup-body_button mx-auto"
                                  type="submit"
                                >
                                  Send
                                </button>
                              </form>
                            </div>
                          </Popup>
                          <Popup
                            open={successPopupOpen}
                            setOpen={setSuccessPopupOpen}
                          >
                            <div className="model-wrapper">
                              <img
                                src={Images.Pictures.successCheck}
                                className="model-wrapper_image"
                                alt="success"
                              ></img>
                              <p className="model-wrapper_text">
                                Your Message sent
                              </p>
                              <button
                                className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
                                onClick={() => setSuccessPopupOpen(false)}
                              >
                                Close
                              </button>
                            </div>
                          </Popup>
                          <Pagination />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* rating and reviews tab end */}
            </div>
          </div>
        </div>
        {/* shipping , ratings and reviews end */}
        <section className="product-carosual-section">
          <div className="container">
            {/* <div className="row" style={{marginTop:"10rem"}}>
              <div className="col-12 text-left">
                <h2 className="fs-2">
                  Similar <span className="border-title-gradient">Trades</span>
                </h2>
              </div>
            </div> */}
            <div className="row">
              <TradeCarosual />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
