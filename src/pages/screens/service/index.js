import { useEffect, useState } from "react";
import { FaRegHeart, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
// import { GET_SERVICE } from "../../../redux/actions/services";
import Images from "../../../constants/images";
import Rating from "react-rating";
import Pagination from "../../../components/pagination";
import ServiceCardSlider from "../../../components/serviceCardSlider";
import Popup from "../../../components/popUp/popUp.js";
import { RATE_SERVICE_ACTION } from "../../../redux/actions/reviews";
import { toast } from "react-toastify";
import { WISHLIST_ADD_ITEM } from "../../../redux/actions/wishlist";
import { addtoCart, alreadyInCart } from "../../../redux/actions/cart";
export default function Product() {
  const dispatch = useDispatch();

  const { service } = useSelector((state) => state.ServicesReducers);
  const { review, errorReview } = useSelector((state) => state.ReviewsReducers);
  const { serviceId } = useParams();
  const [commented, setCommented] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const { alreadyPresentCart, cartData } = useSelector(
    (state) => state.CartReducers
  );
  const [previewImage, setPeviewImage] = useState(
    service ? service?.image : ""
  );
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupOpenLogin, setPopupOpenLogin] = useState(false);
  const [cart, setCart] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [reviewSummary, setReviewsSummary] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
  });
  const [newReview, setnewReview] = useState({
    rating: 0,
    user: userData?._id,
    reviewText: "",
    serviceId,
    type: "Service",
  });

  const calculateAverageRating = () => {
    let sum = 0;
    service?.reviews?.map((item, index) => {
      sum = sum + item?.rating;
    });
    return sum / service?.reviews?.length;
  };
  const totalAvgRating = calculateAverageRating();
  const handleAddReview = () => {
    if (userData == null) {
      setPopupOpenLogin(true);

      return;
    }
    if (newReview.reviewText.length > 0) {
      dispatch(RATE_SERVICE_ACTION(newReview, localStorage.getItem("token")));
    } else {
      toast.error("Review Text Is Required");
    }
    if (newReview.rating === 0) {
      setCommented(false);

      toast.error("Review Rating Is Required");
    }
  };
  useEffect(() => {
    // dispatch(GET_SERVICE(serviceId));
    if (service?.reviews.length != 0) {
      setAvgRating(calculateAverageRating());
    }
    if (review) {
      setCommented(false);
      setnewReview({
        rating: 0,
        user: userData?._id,
        reviewText: "",
        serviceId,
        type: "Service",
      });
    }
  }, [review]);
  useEffect(() => {
    if (errorReview) {
      // toast.error(errorReview.data.message)
    }
  }, [errorReview]);

  return (
    <>
      <Popup open={popupOpenLogin} setOpen={setPopupOpenLogin}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.userIcon}
            className="model-wrapper_image"
            alt="user-icon"
          />
          <p className="model-wrapper_text">Please Login to Leave Review!</p>
          <Link
            to="/login"
            onClick={() => setPopupOpen(false)}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
            Sign In
          </Link>
        </div>
      </Popup>
      <div className="service-wrapper container mt-5">
        <div className="service-wrapper_service-inner-wrapper ">
          <Popup title="dasdasd" image="dasd" />
          <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper">
            <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-image-wrapper">
              <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-image-wrapper_service-image">
                <img
                  style={{ width: "100%", height: "30rem" }}
                  src={service?.image}
                  alt="service"
                ></img>
                {/* <ReactImageMagnify  
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      // isFluidWidth: true,
                      src: previewImage,
                      width: "100%",
                      height: 300,
                    },
                    largeImage: {
                      src: previewImage,
                      width: 500,
                      height: 2000,
                    },
                  }}
                /> */}
              </div>
            </div>
            <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description">
              <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_left">
                <h2 className="fs-2">{service?.title}</h2>
                <h2 className="fs-2">$ {service?.cost}</h2>
                <h6 className="fs-4">Pricing Details</h6>
                <p>{service?.priceDetails}</p>
                <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_left_rating-wrapper">
                  <h4 className="fs-4service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_left_rating-wrapper_heading">
                    Ratings: {totalAvgRating ? Math.round(totalAvgRating) : 0}
                  </h4>
                  <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_left_rating-wrapper_rating-inner-wrapper">
                    {" "}
                    {[1, 2, 3, 4, 5].map((rnum) => {
                      return (
                        <img
                          className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_left_rating-wrapper_rating-inner-wrapper_rating"
                          src={Images.Pictures.plant}
                          alt="ratings"
                          key={rnum}
                        ></img>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right">
                <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right_seller-details-wrapper">
                  <span className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right_seller-details-wrapper_title">
                    Serivce Provider:
                  </span>
                  <h6 className="fs-6">
                    {service?.seller?.firstName +
                      " " +
                      service?.seller?.lastName}{" "}
                    &nbsp;
                    <img
                      src={service?.seller.image}
                      width="20"
                      height="10"
                      alt="flag"
                    ></img>
                  </h6>
                  <h6
                    onClick={() => setPopupOpen(true)}
                    className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right_seller-details-wrapper_vendor-btn"
                  >
                    Contact Service Provider
                    <FaAngleRight />
                  </h6>

                  <Link
                    to="/seller-services"
                    className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right_seller-details-wrapper_vendor-btn"
                  >
                    View service provider Profile
                    <FaAngleRight />
                  </Link>
                  <div className="service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right_seller-details-wrapper_wishlist">
                    <div className="icon-btn btn-solid-dark-rounded  btn-circle service-wrapper_service-inner-wrapper_image-desc-wrapper_service-description_right_seller-details-wrapper_wishlist_button">
                      <FaRegHeart size="1.6rem" />
                    </div>
                    <h5 className="fs-5">Add to Wishlist</h5>
                  </div>

                  <button
                    className="btn btn-solid btn-solid-primary-rounded py-3 px-5 "
                    style={{ width: "15rem" }}
                    onClick={() => {
                      let cart_item = service;

                      service.type = "Service";
                      dispatch(addtoCart(cart_item));
                    }}
                  >
                    {alreadyPresentCart ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4 className="fs-4 my-3">Service Description</h4>
              <p>{service?.description}.</p>
            </div>
          </div>
        </div>
        {/* shipping , ratings and reviews start */}
        <div className="row service-wrapper_tabs">
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
                  Rate & reviews
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
                  <div className="tab-content_ratings-reviews_inner-wrapper">
                    <div className="tab-content_ratings-reviews_inner-wrapper_average">
                      <h2 className="fs-2">Total {service?.reviews.length}</h2>
                      <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                          Excellent
                        </div>
                        <div className=" tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper">
                          {[1, 2, 3, 4, 5].map((rnum, index) => {
                            return (
                              <img
                                className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                src={Images.Pictures.plant}
                                alt="ratings"
                                key={index}
                              ></img>
                            );
                          })}
                        </div>
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                          {reviewSummary.Excellent}{" "}
                        </div>
                      </div>
                      <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                          Good
                        </div>
                        <div className=" tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper">
                          {[1, 2, 3, 4].map((rnum, index) => {
                            return (
                              <img
                                className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                src={Images.Pictures.plant}
                                alt="ratings"
                                key={index}
                              ></img>
                            );
                          })}
                        </div>
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                          {reviewSummary.Good}
                        </div>
                      </div>
                      <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                          Average
                        </div>
                        <div className=" tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper">
                          {[1, 2, 3].map((rnum, index) => {
                            return (
                              <img
                                className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                src={Images.Pictures.plant}
                                alt="ratings"
                                key={index}
                              ></img>
                            );
                          })}
                        </div>
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                          {reviewSummary.Average}
                        </div>
                      </div>
                      <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                          Poor
                        </div>
                        <div className=" tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper">
                          {[1, 2].map((rnum, index) => {
                            return (
                              <img
                                key={index}
                                className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                src={Images.Pictures.plant}
                                alt="ratings"
                              ></img>
                            );
                          })}
                        </div>
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                          {reviewSummary.Poor}
                        </div>
                      </div>
                      <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                          Poor
                        </div>
                        <div className=" tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper">
                          {[1].map((rnum, index) => {
                            return (
                              <img
                                key={index}
                                className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                src={Images.Pictures.plant}
                                alt="ratings"
                              ></img>
                            );
                          })}
                        </div>
                        <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                          {reviewSummary.Poor}
                        </div>
                      </div>
                    </div>

                    <div className="tab-content_ratings-reviews_inner-wrapper_review">
                      <div className="row">
                        <div className="col-8">
                          <h2 className="fs-2">Give your review</h2>
                        </div>
                        <div className="col-4 text-end">
                          <p>Item Number:</p> {service?._id}
                        </div>
                      </div>
                      <textarea
                        value={newReview.reviewText}
                        onChange={(e) => {
                          setnewReview({
                            ...newReview,
                            reviewText: e.target.value,
                          });
                        }}
                        className="tab-content_ratings-reviews_inner-wrapper_review_input"
                      ></textarea>
                      <div className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper">
                        <div className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_customer-review">
                          <h3 className="fs-3 tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_customer-review_label">
                            Your Ratings
                          </h3>
                          <Rating
                            onClick={(e) => {
                              setnewReview({
                                ...newReview,
                                rating: e,
                              });
                            }}
                            readonly={newReview.rating > 0 ? true : false}
                            emptySymbol={[
                              <img
                                width="30"
                                src={Images.Pictures.emptyPlant}
                                alt="empty plant"
                              ></img>,
                            ]}
                            fullSymbol={[
                              <img
                                width="30"
                                src={Images.Pictures.plant}
                                alt="plant"
                              ></img>,
                            ]}
                          />
                        </div>
                        <div className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_button-wrapper">
                          <span className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_button-wrapper_title">
                            {commented ? "Your Comment Submitted" : ""}
                          </span>{" "}
                          <button
                            onSubmit={() => {
                              handleAddReview();
                            }}
                            onClick={() => {
                              handleAddReview();
                            }}
                            className="btn btn-solid btn-solid-primary px-5"
                            disabled={commented ? true : false}
                          >
                            {commented ? "Submitted" : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content_ratings-reviews_customer-reviews-wrapper">
                    <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_title">
                      Customer Reviews
                    </h3>
                    {service?.reviews.map((item, index) => {
                      return (
                        <div
                          className="tab-content_ratings-reviews_customer-reviews-wrapper_review"
                          key={index}
                        >
                          <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper">
                            <h4 className="fs-4tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_name">
                              {item?.user.firstName}
                            </h4>
                            <div className=" tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapperrating-wrapper">
                              {Array.apply(null, Array(item?.rating)).map(
                                (item1, index) => {
                                  return (
                                    <img
                                      key={index}
                                      width="20"
                                      height="20"
                                      className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapperrating-wrapper_rating"
                                      src={Images.Pictures.plant}
                                      alt="ratings"
                                    ></img>
                                  );
                                }
                              )}
                            </div>
                            <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_date">
                              {moment(item?.createdAt).format(
                                "MMM DD YYYY h:mm A"
                              )}{" "}
                            </div>
                          </div>
                          <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_content">
                            {item?.reviewText}
                          </p>
                        </div>
                      );
                    })}
                    <div>
                      <Pagination />
                    </div>
                  </div>
                </div>
              </div>
              {/* rating and reviews tab end */}
            </div>
          </div>
        </div>
        {/* shipping , ratings and reviews end */}
      </div>
      <section className="product-carosual-section">
        <div className="container">
          <div className="row" style={{ marginTop: "10rem" }}>
            <div className="col-12 text-left">
              <h2 className="fs-2">
                Similar <span className="border-title-gradient">Services</span>
              </h2>
            </div>
          </div>
          <div className="row mt-5">
            <ServiceCardSlider showTitle={false} />
          </div>
        </div>
      </section>
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
      <Popup open={successPopupOpen} setOpen={setSuccessPopupOpen}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="model-wrapper_image"
            alt="success"
          ></img>
          <p className="model-wrapper_text">Your Message sent</p>
          <button
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
            onClick={() => setSuccessPopupOpen(false)}
          >
            Close
          </button>
        </div>
      </Popup>
    </>
  );
}
