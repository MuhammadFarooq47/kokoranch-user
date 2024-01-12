import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

export default function CartItem({ props }) {
  const dispatch = useDispatch();
  const [itemQuantity, setitemQuantity] = useState();

  useEffect(() => {
    if (props.type == "Product") {
      setitemQuantity(props?.quantity);
    }
  }, [props]);

  return (
    <div className="cart-item" key={props._id}>
      <img
        className="cart-item_image"
        width="80"
        src={props.type == "Product" ? props?.images[0] : props?.image}
        alt="Products"
      />
      <div className="cart-item_content">
        <h3 className="fs-3 ">
          {" "}
          {props.type == "Product" ? props?.name : props?.title}
        </h3>
        <div className="cart-item_content_wrapper">
          <h5 className="fs-5 cart-item_content_wrapper_price">
            USD{props.type == "Product" ? props?.price : props?.cost}
          </h5>{" "}
          <button
            onClick={() => {
              dispatch(removeFromCart(props?._id));
            }}
            className="btn btn-solid-light cart-item_content_wrapper_button"
          >
            <FaTrash />
            &nbsp;Remove
          </button>
        </div>
        <div>
          {props.type == "Product" ? (
            <div className="cart-item_content_qty-wrapper">
              <button
                onClick={() => {
                  if (props.type == "Product") {
                    setitemQuantity(itemQuantity - 1);
                  }
                }}
                className="icon-btn btn-solid btn-solid-primary-rounded px-4"
              >
                -
              </button>
              <span className="cart-item_content_qty-wrapper_quantity-value">
                {itemQuantity}
              </span>
              <button
                onClick={() => {
                  setitemQuantity(itemQuantity + 1);
                }}
                className="icon-btn btn-solid btn-solid-primary-rounded px-4"
              >
                +
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
