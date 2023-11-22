import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
// import { GET_PRODUCT_INFO } from "../../../redux/actions/products";
import { RATE_PRODUCT_ACTION } from "../../../redux/actions/reviews";
import moment from "moment";

import ProductCarosual from "../../../components/ProductCarosual";
// import ReactImageMagnify from "react-image-magnify";
import Popup from "../../../components/popUp/popUp";
import Images from "../../../constants/images";
import Rating from "react-rating";
import Pagination from "../../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WISHLIST_ADD_ITEM } from "../../../redux/actions/wishlist";
import { addtoCart, alreadyInCart } from "../../../redux/actions/cart";
import {GET_USER_CHECKOUT_DATA} from "../../../redux/actions/checkout";
import Picker from 'emoji-picker-react';

export default function Product({ isFavorite }) {



  
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
//  console.log("inputStrinputStr" ,inputStr)
  const onEmojiClick = async  (event, emojiObject) => {
    await emojiObject.ready;
    console.log("inputStrinputStr" ,emojiObject?.srcElement?.image)
    setInputStr(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
 

  const [popupOpenLogin, setPopupOpenLogin] = useState(false);
  const [commented, setCommented] = useState(false);
  const location = useLocation();
  const pathID =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  // console.log("pathID", pathID);
  const dispatch = useDispatch();

  const { featuredProducts } = useSelector((state) => state.ProductsReducers);
  // const { checkout } = useSelector((state) => state.CheckoutReducer);

  // console.log("checkout??????????", checkout);
  // console.log(featuredProducts?.images);

  const previewImage = featuredProducts[0]?.images[0];

  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  console.log("const { user, isAuthenticated } = useSelector((state) => state.authReducer);", user?._id)
  const { cartItems, alreadyPresentCart } = useSelector(
    (state) => state.CartReducers
  );


  const filteredCartItems = cartItems.filter((item) => item?.buyerId === user?._id)
  // const {alreadyPresentCart} = useSelector((state) => state.CartReducers);

  

  const { reviews } = useSelector((state) => state.ReviewsReducers);
  // console.log("reviews??????????", reviews)

  const { id } = useParams();


  const [reviewSummary, setReviewsSummary] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
  });

  const [newReview, setnewReview] = useState({
    rating: 0,
    product: id,
    review: "",
  });

  // const handleSetRatingSummary = () => {
  //   featuredProducts?.reviews?.map((item, index) => {
  //     if (item?.rating === 5) {
  //       setReviewsSummary((prevState) => ({
  //         ...prevState,
  //         Excellent: prevState.Excellent + 1,
  //       }));
  //     } else if (item?.rating === 4) {
  //       setReviewsSummary((prevState) => ({
  //         ...prevState,
  //         Good: prevState.Good + 1,
  //       }));
  //     } else if (item?.rating === 3) {
  //       setReviewsSummary((prevState) => ({
  //         ...prevState,
  //         Average: prevState.Average + 1,
  //       }));
  //     } else if (item?.rating === 2) {
  //       setReviewsSummary((prevState) => ({
  //         ...prevState,
  //         Poor: prevState.Poor + 1,
  //       }));
  //     } else if (item?.rating === 1) {
  //       setReviewsSummary((prevState) => ({
  //         ...prevState,
  //         Poor: prevState.Poor + 1,
  //       }));
  //     }
  //   });
  // };

  const handleAddReview = () => {
    if (isAuthenticated === null || user === null) {
      setPopupOpenLogin(true);
      setCommented(false);

      return;
    }

    if (newReview?.review?.length > 0) {
      dispatch(RATE_PRODUCT_ACTION(newReview, localStorage.getItem("token")));
    } else {
      setCommented(false);
      toast.error("Review Text Is Required");
    }

    if (newReview.rating === 0) {
      setCommented(false);

      toast.error("Review Rating Is Required");
    }
  };

  const [reviewsProduct, setReviewsProduct] = useState(featuredProducts)


  useEffect(() => {
    setReviewsProduct(featuredProducts)
    }, [reviews, featuredProducts]);

    console.log(reviewsProduct, "AAAAAAAAAA")

  // handle image change
  const handleImageChange = (e, image) => {
    // setPeviewImage(image);
    const elems = document.querySelectorAll(
      ".product-wrapper_image-desc-wrapper_product-image-wrapper_product-thumbs_product-thumb-image"
    );

    elems.forEach((elem) => {
      elem.classList.remove("image-thumb-active");
    });
    e.target.classList.add("image-thumb-active");
  };

  // handle add to wishlist
  const handleAddToWishlist = () => {
    if (isAuthenticated == null || user === null) {
      setPopupOpenLogin(true);

      return;
    }
    dispatch(WISHLIST_ADD_ITEM(id, localStorage.getItem("token")));
  };
  // const avgRating = calculateAverageRating()
  const [popupOpen, setPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [itemQuantity, setitemQuantity] = useState(1);
  console.log("itemQuantity", itemQuantity);

  const [cart, setCart] = useState(false);

  let productDataToSend = null; // Initialize dataToSend outside the map loop

  featuredProducts.map((productData, index) => {
    if (productData?._id === id) {
      console.log("Current product price", productData);
      const sumOfProduct = productData?.price * itemQuantity;
      console.log("Test Total price", sumOfProduct);

      // Update dataToSend object within the loop
      productDataToSend = {
        productId: id,
        user: productData?.user?._id,
        productOf: productData?.user?.role,
        quantity: itemQuantity,
        price: productData?.price,
        totalPrice: sumOfProduct,
        deliveryCharges: Number(
          productData?.shippingDetails?.shippingAndHandling
        ),
      };
    }
  });

  // console.log("data To Send", productDataToSend);

  useEffect(() => {
    featuredProducts?.reviews?.map((item, index) => {
      console.log("useEffect featuredProducts?.reviews?.map", item);
      if (item?.rating === 5) {
        setReviewsSummary((prevState) => ({
          ...prevState,
          Excellent: prevState.Excellent + 1,
        }));
      } else if (item?.rating === 4) {
        setReviewsSummary((prevState) => ({
          ...prevState,
          Good: prevState.Good + 1,
        }));
      } else if (item?.rating === 3) {
        setReviewsSummary((prevState) => ({
          ...prevState,
          Average: prevState.Average + 1,
        }));
      } else if (item?.rating === 2) {
        setReviewsSummary((prevState) => ({
          ...prevState,
          Poor: prevState.Poor + 1,
        }));
      } else if (item?.rating === 1) {
        setReviewsSummary((prevState) => ({
          ...prevState,
          Poor: prevState.Poor + 1,
        }));
      }
    });
  }, [reviews]);

  useEffect(() => {
    // dispatch(GET_PRODUCT_INFO(id));

    if (reviews) {
      setCommented(false);
      setnewReview({
        rating: 0,
        product: id,
        review: "",
      });
    }
  }, [reviews]);

  // useEffect to check if product already add in cart
  useEffect(() => {
    if (featuredProducts) {
      dispatch(alreadyInCart(id));
    }
    if (alreadyPresentCart) {
      setCart(alreadyPresentCart);
    }
  }, [id, cartItems, dispatch]);

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
      {/* Emoji */}
      {/* <div className="app">
      <h3>Add Emoji Picker in React App - <a href="https://www.cluemediator.com" target="_blank" rel="noopener">Clue Mediator</a></h3>
      <div className="picker-container">
        <input
          className="input-style"
          value={inputStr}
          onChange={e => setInputStr(e.target.value)} />
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />}
      </div>
    </div> */}
      {/* Emoji */}
      <div className="product-outer-wrapper">
        <img src={Images.Pictures.brownLeftLeaf} alt="left-leaf"></img>
        <div className="product-wrapper container mt-5">
          <div
            className="product-wrapper_image-desc-wrapper"
            style={{
              textAlign: "left",
              position: "relative",
            }}
          >
            <img
              src={Images.Pictures.brownRightLeaf}
              style={{
                position: "absolute",
                top: "-5rem",
                right: "1rem",
                zIndex: "-1",
                transform: "rotate(265deg)",
                width: "55rem",
                opacity: "0.4",
              }}
              alt="right-leaf"
            ></img>
            <div className="product-wrapper_image-desc-wrapper_product-image-wrapper">
              <div className="product-wrapper_image-desc-wrapper_product-image-wrapper_product-image">
                <img
                  src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${previewImage}`}
                  alt="product"
                ></img>
              </div>
              <div className="product-wrapper_image-desc-wrapper_product-image-wrapper_product-thumbs">
                {featuredProducts?.map((image, index) => {
                  // console.log("featuredProducts,,,,,,,,,", image);
                  return (
                    <img
                      key={index}
                      className="product-wrapper_image-desc-wrapper_product-image-wrapper_product-thumbs_product-thumb-image"
                      src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${image?.images[1]}`}
                      onClick={(e) => {
                        handleImageChange(e, image);
                      }}
                      alt="product"
                    />
                  );
                })}
              </div>
            </div>
            {featuredProducts.map((data, index) => {
              console.log(data, "Price??????????");
              if (data?._id === id) {
                return (
                  <div
                    className="product-wrapper_image-desc-wrapper_product-description"
                    key={index || data?._id}
                  >
                    <div className="product-wrapper_image-desc-wrapper_product-description_top">
                      <h2 className="fs-2">{data?.productName}</h2>

                      <h2 className="fs-2">USD.${data?.price}</h2>
                    </div>
                    <div className="product-wrapper_image-desc-wrapper_product-description_middle">
                      <ul>
                        <li>{data?.description}</li>
                      </ul>
                      <div className="product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper">
                        <h5 className="fs-5 quantity-label">Quantity:</h5>
                        <div>
                          <div className="product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper_qty-wrapper">
                            <button
                              onClick={() => {
                                if (itemQuantity > 0) {
                                  setitemQuantity(itemQuantity - 1);
                                }
                              }}
                              className="icon-btn btn-solid btn-solid-primary-rounded  product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper_qty-wrapper_button"
                            >
                              -
                            </button>
                            <span className="product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper_qty-wrapper_quantity-value">
                              {itemQuantity}
                            </span>
                            <button
                              onClick={() => {
                                setitemQuantity(itemQuantity + 1);
                              }}
                              className="icon-btn btn-solid btn-solid-primary-rounded product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper_qty-wrapper_button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper_wishlist">
                          <div className="icon-btn btn-solid-dark-rounded  btn-circle product-wrapper_image-desc-wrapper_product-description_middle_last-wrapper_wishlist_button">
                            {isFavorite ? (
                              <FaRegHeart
                                onClick={() => {
                                  handleAddToWishlist();
                                }}
                                size="1.6rem"
                              />
                            ) : (
                              <FaHeart
                                onClick={() => {
                                  handleAddToWishlist();
                                }}
                                size="1.6rem"
                              />
                            )}
                          </div>
                          <h5 className="fs-5">
                            {isFavorite
                              ? "Remove From Wishlist"
                              : "Add to Wishlist"}
                          </h5>
                        </div>
                        <div className="instock fs-5">
                          <label>In Stock:</label>
                          <span>&nbsp;{data?.inStock}</span>
                        </div>
                        <button
                         disabled={alreadyPresentCart}
                         state={productDataToSend}
                         className="btn btn-solid btn-solid-primary-rounded py-3 px-5 mb-5"
                         style={{ width: "15rem" }}
                         onClick={() => {
                           let cart_item = { ...data }; // Clone the data object to avoid modifying the original data
                           cart_item.quantity = itemQuantity;
                           cart_item.totalPrice = itemQuantity * data.price;
                           cart_item.deliveryCharges = Number(data.shippingDetails.shippingAndHandling);
                           cart_item.buyerId  = user?._id
                           dispatch(addtoCart(cart_item));
                         }}
                        >
                          {alreadyPresentCart ? "Added" : "Add to Cart"}
                        </button>
                        {/* {isAuthenticated ? (
                          <Link
                            to="/checkout"
                            state={productDataToSend}
                            disabled={alreadyPresentCart}
                            className="btn btn-solid btn-solid-primary-rounded py-3 px-5 "
                            style={{ width: "15rem" }}
                          >
                            Buy Now
                          </Link>
                        ) : (
                          <Link
                            to="/login"
                            disabled={alreadyPresentCart}
                            className="btn btn-solid btn-solid-primary-rounded py-3 px-5 "
                            style={{ width: "15rem" }}
                          >
                            Login
                          </Link>
                        )} */}
                      </div>
                    </div>
                    <div className="product-wrapper_image-desc-wrapper_product-description_bottom">
                      <div className="product-wrapper_image-desc-wrapper_product-description_bottom_rating-wrapper">
                        <h4 className="fs-4product-wrapper_image-desc-wrapper_product-description_bottom_rating-wrapper_heading">
                          Ratings:{" "}
                          {data?.averageRating ? data?.averageRating : 0}
                        </h4>
                        <div className="product-wrapper_image-desc-wrapper_product-description_bottom_rating-wrapper_rating-inner-wrapper mt-4">
                          {" "}
                          <Rating
                            start={0}
                            stop={5}
                            readonly
                            placeholderRating={data?.averageRating}
                            placeholderSymbol={[
                              <img
                                width="30"
                                src={Images.Pictures.plant}
                                alt="full"
                              ></img>,
                            ]}
                            emptySymbol={[
                              <img
                                width="30"
                                src={Images.Pictures.emptyPlant}
                                alt="empty"
                              ></img>,
                            ]}
                            // fullSymbol={[
                            //   <img
                            //     width="30"
                            //     src={Images.Pictures.plant}
                            //     alt="full"
                            //   ></img>,
                            // ]}
                          />
                        </div>
                      </div>
                      <div className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper">
                        <span className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_title">
                          Seller:
                        </span>
                        <h5>
                          {data?.user?.firstName + " " + data?.user?.lastName}
                          &nbsp;
                          {/* <img
                                src={product?.seller?.image?.url}
                                width="20"
                                height="10"
                                alt="flag"
                              ></img> */}
                        </h5>
                        <button
                          onClick={() => setPopupOpen(true)}
                          className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_vendor-btn"
                        >
                          Contact Vendor
                          <FaAngleRight />
                        </button>
                        <div>
                          <Link
                            to="/seller-products"
                            className="product-wrapper_image-desc-wrapper_product-description_bottom_seller-details-wrapper_vendor-btn"
                          >
                            View all items of vendor
                            <FaAngleRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {/* shipping , ratings and reviews start */}
          {featuredProducts.map((shippingandratings, index) => {
            // console.log(shippingandratings, "Price??????????");
            if (shippingandratings?._id === id) {
              return (
                <div className="row product-wrapper_tabs">
                  <div className="col-12">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="shipping-details-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#shipping-details"
                          type="button"
                          role="tab"
                          aria-controls="shipping-details"
                          aria-selected="true"
                        >
                          Shopping Details
                        </button>
                      </li>
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
                          Rate & Reviews
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      {/* shipping tab start */}
                      <div
                        className="tab-pane fade show active"
                        id="shipping-details"
                        role="tabpanel"
                        aria-labelledby="shipping-details-tab"
                      >
                        <div className="tab-content_shipping-details">
                          <div className="row">
                            <div className="col-6">
                              <h4 className="fs-4">Shipping and handling</h4>
                            </div>
                            <div className="col-6 text-end">
                              <p>Item Number:</p>
                              {shippingandratings?._id}
                            </div>
                            <div className="col-12">
                              <div className="row">
                                <div className="col-4">Item Location:</div>
                                <div className="col-8">
                                  {
                                    shippingandratings?.shippingDetails
                                      ?.itemLocation
                                  }
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4">Shipping:</div>
                                <div className="col-8">
                                  {
                                    shippingandratings?.shippingDetails
                                      ?.shippingTo
                                  }
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4">Delivery:</div>
                                <div className="col-8">
                                  <p>
                                    {
                                      shippingandratings?.shippingDetails
                                        ?.delivery
                                    }{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4">Return:</div>
                                <div className="col-8">
                                  {shippingandratings?.shippingDetails?.return}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-4">
                                  Shipping and handling:
                                </div>
                                <div className="col-8">
                                  {shippingandratings?.shippingCharge == 0
                                    ? "Free shipping"
                                    : "$" +
                                      shippingandratings?.shippingDetails
                                        ?.shippingAndHandling}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* shipping tab end */}
                      {/* rating and reviews tab start */}
                      <div
                        className="tab-pane fade"
                        id="ratings-reviews"
                        role="tabpanel"
                        aria-labelledby="ratings-reviews-tab"
                      >
                        <div className="tab-content_ratings-reviews">
                          <div className="tab-content_ratings-reviews_inner-wrapper">
                            <div className="tab-content_ratings-reviews_inner-wrapper_average">
                              <h2 className="fs-2">
                                Total Reviews{" "}
                                {shippingandratings?.reviews?.length >= 0
                                  ? shippingandratings?.reviews?.length
                                  : " 0 "}
                              </h2>
                              <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                                <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                                  Excellent
                                </div>
                                <div className=" tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper">
                                  {[1, 2, 3, 4, 5].map((rnum, index) => {
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
                                  {shippingandratings?.totalReviews?.excellent}
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
                                        key={index}
                                        className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                        src={Images.Pictures.plant}
                                        alt="ratings"
                                      ></img>
                                    );
                                  })}
                                </div>
                                <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                                  {shippingandratings?.totalReviews?.good}
                                  {console.log(
                                    "shippingandratings?.totalReviews?.good",
                                    shippingandratings?.totalReviews?.good
                                  )}
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
                                        key={index}
                                        className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-wrapper_rating"
                                        src={Images.Pictures.plant}
                                        alt="ratings"
                                      ></img>
                                    );
                                  })}
                                </div>
                                <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_rating-number">
                                  {shippingandratings?.totalReviews?.average}
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
                                  {shippingandratings?.totalReviews?.poor}
                                </div>
                              </div>
                              <div className="tab-content_ratings-reviews_inner-wrapper_average_rating">
                                <div className="tab-content_ratings-reviews_inner-wrapper_average_rating_label">
                                  Bad
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
                                  {shippingandratings?.totalReviews?.bad}
                                </div>
                              </div>
                            </div>

                            <div className="tab-content_ratings-reviews_inner-wrapper_review">
                              <div className="row">
                                <div className="col-8">
                                  <h2 className="fs-2">Give your review</h2>
                                </div>
                                <div className="col-4 text-end">
                                  <p>Item Number:</p>
                                  {shippingandratings?._id
                                    .substr(
                                      shippingandratings?._id?.length - 12
                                    )
                                    .toUpperCase()}
                                </div>
                              </div>
                              <textarea
                                value={newReview.review}
                                onChange={(e) => {
                                  setnewReview({
                                    ...newReview,
                                    review: e.target.value,
                                  });
                                }}
                                className="tab-content_ratings-reviews_inner-wrapper_review_input"
                              ></textarea>
                              <div className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper">
                                <div className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_customer-review">
                                  <h3 className="fs-3 tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_customer-review_label">
                                    Rate Product
                                  </h3>
                                  <Rating
                                    onClick={(e) => {
                                      setnewReview({
                                        ...newReview,
                                        rating: e,
                                      });
                                    }}
                                    start={0}
                                    // stop={5}
                                    readonly={
                                      newReview?.rating > 0 ? true : false
                                    }
                                    // placeholderRating={newReview.rating}
                                    emptySymbol={[
                                      <img
                                        width="30"
                                        src={Images.Pictures.emptyPlant}
                                        alt="empty"
                                      ></img>,
                                    ]}
                                    fullSymbol={[
                                      <img
                                        width="30"
                                        src={Images.Pictures.plant}
                                        alt="full"
                                      ></img>,
                                    ]}
                                  />
                                </div>
                                <div className="tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_button-wrapper">
                                  <h4 className="h4 tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_button-wrapper_title">
                                    {commented ? "Your Comment Submitted" : ""}
                                  </h4>{" "}
                                  <button
                                    onClick={() => {
                                      handleAddReview();
                                    }}
                                    className="btn btn-solid btn-solid-primary-rounded px-5 tab-content_ratings-reviews_inner-wrapper_review_customer-review-and-button-wrapper_button-wrapper_button"
                                    disabled={isAuthenticated ? false : true}
                                  >
                                    {commented ? "Submitted" : "Submit"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-content_ratings-reviews_customer-reviews-wrapper">
                            <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_title">
                              Customer
                              <span>Reviews</span>
                            </h3>
                            {shippingandratings?.reviews?.map(
                              (reviewsData, index) => {
                                // console.log(
                                //   "ReviewData <<<<<<<<<<<<<",
                                //   reviewsData
                                // );
                                return (
                                  <div
                                    className="tab-content_ratings-reviews_customer-reviews-wrapper_review"
                                    key={index}
                                  >
                                    <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper">
                                      <h4 className="fs-4tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_name">
                                        {`${reviewsData?.user?.firstName} ${reviewsData?.user?.lastName}`}
                                      </h4>
                                      <div className=" tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapperrating-wrapper">
                                        {Array.apply(
                                          null,
                                          Array(reviewsData?.rating)
                                        ).map((item, index) => {
                                          // console.log("Reviews Item", item);
                                          return (
                                            <>
                                              <img
                                                width="20"
                                                height="20"
                                                className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapperrating-wrapper_rating"
                                                src={Images.Pictures.plant}
                                                alt="ratings"
                                                key={index}
                                              />
                                            </>
                                          );
                                        })}
                                      </div>
                                      <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_date">
                                        {moment(reviewsData?.createdAt).format(
                                          "MMM DD YYYY h:mm A"
                                        )}{" "}
                                      </div>
                                    </div>
                                    <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_content">
                                      {reviewsData?.review}
                                      {/* {console.log(
                                        reviewsData?.review,
                                        " {shippingandratings?.reviews?.review}"
                                      )} */}
                                    </p>
                                  </div>
                                );
                              }
                            )}

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
                                    <label
                                      for="firstName"
                                      className="form-label"
                                    >
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
              );
            }
          })}

          {/* shipping , ratings and reviews end */}
        </div>
        <section
          className="product-carosual-section"
          style={{ marginTop: "10rem" }}
        >
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-left">
                <h2 className="fs-2">
                  Similar <span className="border-title-gradient">Items</span>
                </h2>
              </div>
            </div>

            <ProductCarosual showTitle={false} marginTop="0" />
          </div>
        </section>
      </div>
    </>
  );
}
