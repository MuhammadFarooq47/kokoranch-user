import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ProductCard from "../../../components/productCard/index";
import Images from "../../../constants/images";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TabContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartTotalAction,
  getDeliveryCharges,
  getCartItemsTotal,
} from "../../../redux/actions/cart";
import CartItem from "../../../components/cartItem/CartItem";
import {
  alreadyInCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../redux/actions/cart";
import { FaTrash } from "react-icons/fa";
import DataNotFound from "../../../components/datanotfound/index";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Cart() {
  // const {
  //   cartData,
  //   cartTotal,
  //   deliveryTotalCharges,
  //   cartItemsTotal,
  // } = useSelector((state) => state.CartReducers)

  const { cartItems } = useSelector((state) => state.CartReducers);
  // console.log("cartItems <<<<<<<<<<<<<<", cartItems?.buyerId);
  const {user} = useSelector((state) => state?.authReducer);
  
  const filteredCartItems = cartItems.filter(item => item.buyerId === user._id);

console.log("user", user?._id)
  // Calculate the total price of all items in the cart
  const totalCartPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalCartPriceWishList = cartItems?.product?.reduce((total, item) => {
    console.log(item, total, ">>>>>>>");
    return total + item.price * item.quantity;
  }, 0);

  console.log(totalCartPriceWishList);

  const [deliveryCharges, setDeliveryCharges] = useState(30);

  // console.log(totalCartPrice, "????????????")

  let productDataToSend2 = null;

  {
    cartItems.map((productData, index) => {
      // console.log("Current product data", productData?.buy);
      // const sumOfProduct = productData?.price * itemQuantity;
      // console.log("Test Total price", sumOfProduct);

      // Update dataToSend object within the loop
      productDataToSend2 = {
        productId: productData?._id,
        user: productData?.user?._id,
        productOf: productData?.user?.role,
        quantity: productData?.quantity,
        price: productData?.price,
        totalPrice: totalCartPrice,
        deliveryCharges: deliveryCharges,
      };
    });
  }

  console.log("product data to send object data", productDataToSend2)

  let productDataToSend = [];

  {
    cartItems.map((productData, index) => {
      console.log("Current product data", productData?.price);
  
      // Update dataToSend object within the loop and push it to the array
      productDataToSend.push({
        productId: productData?._id,
        user: productData?.user?._id,
        productOf: productData?.user?.role,
        quantity: productData?.quantity,
        price: productData?.price,
        totalPrice: totalCartPrice,
        deliveryCharges: deliveryCharges,
      });
    });
  }
  
  console.log("product data to send object data", productDataToSend);

  const [wishlistCartItems, setwishlistCartItems] = useState([cartItems]);
  console.log("Wishlist product data", wishlistCartItems);

  let wishListProductPrice = null;

  {
    wishlistCartItems.map((a) => {
      {
        a.map((b) => {
          console.log("bbbbbbbbb", b);
          if (b?.product) {
            wishListProductPrice = {
              images: b?.product?.images,
              productName: b?.product?.productName,
              price: b?.product?.price,
              totalPrice: totalCartPrice + b?.product?.price,
            };
            console.log("Yes product is avaialble");
          } else {
            console.log("Product is not avaialable");
          }
        });
      }
    });
  }

  console.log("wishListProductPrice", wishListProductPrice?.price);


  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [activeTab] = useState("all");
  const [data, setData] = useState([]);

  const [cartItemsState, setCartItemsState] = useState(cartItems);

  // console.log(cartItemsState, "MMMMMMMMMMMMMMMMMMM")

  const handleQuantityChange = (itemId, newQuantity) => {
    // Implement the logic to update the quantity for the item with itemId
    const updatedCartItems = cartItemsState.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    console.log(newQuantity);
    setCartItemsState(updatedCartItems);
  };

  const handleremoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleincreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handledecreaseQuantity = (itemId) => {
    console.log("hello", itemId);
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <>  
      <TabContainer id="left-tabs-example" defaultActiveKey="second">
        {filteredCartItems?.length <= 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: 50,
            }}
          >
            <RiDeleteBin5Fill size={50} className="mb-4" color="#fff" />
            <h2 style={{ textAlign: "center", color: "#757575" }}>
              Cart is Empty
            </h2>
          </div>
        ) : (
          <div
            className="container orderInfo mt-5"
            style={{
              textAlign: "left",
              position: "relative",
            }}
          >
            <img
              src={Images.Pictures.brownLeftLeaf}
              style={{
                position: "absolute",
                top: "0",
                right: "-9rem",
                width: "60rem",
                transform: "rotate(180deg)",
                zIndex: "-1",
              }}
              alt="leaf"
            />
            <div className="row">
              <div className="col-6">
                <h2 className=" fs-2 mb-4">My Cart</h2>
              </div>
              <div className="col-3">
                <h3
                  className="fs-3 mb-4"
                  onClick={() => navigate("/my-profile")}
                  style={{
                    textAlign: "right",
                    width: "fit-content",
                    float: "right",
                    cursor: "pointer",
                  }}
                >
                  <FaArrowLeft style={{ color: "#14a384" }}></FaArrowLeft>{" "}
                  &nbsp;Back To Dashboard
                </h3>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-7 col-sm-12 mr-2">
                {filteredCartItems?.map((item, index) => {
              
                  return (
                    <>
                      {/* <CartItem props={item} /> */}
                      <div className="cart-item" key={index}>
                        <img
                          className="cart-item_image"
                          width="80"
                          src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${item?.images[0]}`}
                          alt="Products"
                        />
                        <div className="cart-item_content">
                          <h3 className="fs-3 ">
                            {" "}
                            {item?.productName || item?.product?.productName}
                          </h3>
                          <div className="cart-item_content_wrapper">
                            <h5 className="fs-5 cart-item_content_wrapper_price">
                              USD $
                              {item?.price * item?.quantity ||
                                item?.product?.price * item?.quantity}
                            </h5>{" "}
                            <button
                              onClick={() => {
                                handleremoveFromCart(item?._id);
                              }}
                              className="btn btn-solid-light cart-item_content_wrapper_button"
                            >
                              <FaTrash />
                              &nbsp;Remove
                            </button>
                          </div>
                          <div>
                            <div className="cart-item_content_qty-wrapper">
                              <button
                                className="icon-btn btn-solid btn-solid-primary-rounded px-4"
                                onClick={() => {
                                  handledecreaseQuantity(item?._id);
                                }}
                              >
                                -
                              </button>
                              <span className="cart-item_content_qty-wrapper_quantity-value">
                                {item?.quantity}
                              </span>
                              <button
                                className="icon-btn btn-solid btn-solid-primary-rounded px-4"
                                onClick={() => {
                                  handleincreaseQuantity(item?._id);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="col-md-5 col-sm-12 p-2 mt-sm-4">
                <div className="cart-summery-wrapper">
                  <h3 className="fs-3 ">Summary</h3>
                  <div className="cart-summery-wrapper_inner-wrapper">
                    <p>
                      Price{" "}
                      {cartItems.length != 0
                        ? "( " + cartItems.length + " ) Item"
                        : ""}
                    </p>
                    {/* <h5 className="fs-5">usd.{cartItemsTotal}</h5> */}
                    <h5 className="fs-5">${totalCartPrice}</h5>
                  </div>
                  <div className="cart-summery-wrapper_inner-wrapper">
                    <p>Delivery Charges</p>
                    {/* <h5 className="fs-5">usd{deliveryTotalCharges}</h5> */}
                    <h5 className="fs-5">${deliveryCharges}</h5>
                  </div>
                  <div className="cart-summery-wrapper_inner-wrapper">
                    <p>Total Price</p>
                    {/* <h5 className="fs-5">usd {cartTotal}</h5> */}
                    <h5 className="fs-5">
                      ${totalCartPrice + deliveryCharges}
                    </h5>
                  </div>
                  <Link
                    to="/checkout"
                    state={{productDataToSend, productDataToSend2}}
                    className="btn btn-solid btn-solid-primary-rounded px-5 cart-summery-wrapper_button"
                  >
                    Proceed
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      
        <section
          className="product-carosual-section"
          style={{
            position: "relative",
          }}
        >
          <img
            src={Images.Pictures.brownLeftLeaf}
            style={{
              position: "absolute",
              top: "5rem",
              left: "5rem",
              width: "60rem",
              // transform: "rotate(270deg)",
              zIndex: "-1",
            }}
            alt="leaf"
          ></img>
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 text-left">
                <h2 className="fs-2">
                  Similar <span className="border-title">Items</span>
                </h2>
              </div>
            </div>
            <div className="d-flex justify-content-center justify-content-sm-left justify-content-md-left justify-content-lg-left flex-wrap">
              {[1, 2, 3, 4, 5].map((element, index) => {
                return (
                  <div className="me-4" key={index}>
                    <ProductCard image={Images.Pictures.product[0]} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </TabContainer>
   </>
  );
}
