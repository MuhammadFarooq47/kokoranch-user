import MultiRangeSlider from "multi-range-slider-react";
import { useState } from "react";
import {  FaPlus, FaRegHeart } from "react-icons/fa";
import Popup from "../../../components/popUp/popUp";
import { Link } from "react-router-dom";
import { category } from "../../../helpers/headerData";
import ServiceCard from "../../../components/serviceCard";
import Images from "../../../constants/images";
import Pagination from "../../../components/pagination";

export default function SellerItems() {
  // SLIDER CODE
  const [minPrice, setMinPrice] = useState(3);
  const [maxPrice, setMaxPrice] = useState(56);
  const [popupOpen, setPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const handleInput = (e) => {
    setMinPrice(e.minValue);
    setMaxPrice(e.maxValue);
  };

  const plant = [1, 2, 3, 4];

  return (
    <>
      <div className="container mt-5">
        <div className="col-12">
          <div className="dark-card">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div
                  className="col-12 d-flex"
                  style={{ justifyContent: "flex-start" }}
                >
                  <div className="profile-image">
                    <img
                      src={Images.Pictures.profile}
                      width={150}
                      height={150}
                      alt="Profile"
                    />
                    <div className="gradient-card plus-sign">
                      <FaPlus />
                    </div>
                  </div>
                  <div
                    className="mt-5"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <h2 className="fs-2">Mark Henry</h2>
                    <p className="title-color">Seller0201</p>
                    <p>
                      <FaRegHeart /> Add to favorites
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <p className="mt-5 text-left">
                  Excellent Service, High-End Products, Fastest Logistics. You
                  will get a positive feedback after your payment in 1 day ：）
                </p>
                <button
                  onClick={() => setPopupOpen(true)}
                  className="btn btn-solid btn-solid-primary-rounded  "
                  style={{
                    width: "20rem",
                    marginTop: "4rem",
                    float: "right",
                    fontWeight: "normal",
                    fontSize: "1.3rem",
                  }}
                >
                  Contact Service Provider
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <p className="mb-3">Filters</p>
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="category-side p-3">
              <div className="categories p-3">
                <div className="filter-section py-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="text-left">
                      <p className="mb-3">Slider</p>{" "}
                    </div>

                    <div className="text-right">
                      <p>
                        ${minPrice} - ${maxPrice}
                      </p>
                    </div>
                  </div>
                  <MultiRangeSlider
                    style={{ boxShadow: "none" }}
                    min={0}
                    max={100}
                    step={5}
                    ruler={false}
                    label={false}
                    preventWheel={false}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
                <div className="filter-section py-3">
                  <div className="d-flex justify-content-between">
                    <div className="text-left">
                      <h4 className="fs-4">Price</h4>
                    </div>
                  </div>

                  <div className=" mt-2 mb-2  price-div">
                    <div className="price-input-div">
                      <div className="d-flex justify-content-start align-items-center">
                        <h3 className="fs-3 d-inline-block mx-2">$</h3>{" "}
                        <input
                          type="number"
                          className="form-control px-2"
                          placeholder="Min"
                        />
                      </div>

                      <h3 className="fs-3 d-inline-block">-</h3>
                      <div className="d-flex justify-content-start align-items-center">
                        <h3 className="fs-3 d-inline-block mx-2"> $</h3>{" "}
                        <input
                          type="number"
                          className="form-control px-2"
                          placeholder="Max"
                        />
                      </div>
                    </div>

                    <button className="btn btn-solid btn-solid-primary px-5">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="filter-section py-3 mb-3">
                  <div className="d-flex flex-column">
                    <h5 className="fs-5">
                      Agricultural Serv
                      <span className="border-title">ice Categories:</span>
                    </h5>
                    <ul className="category-list">
                      {category.map((cat, index) => {
                        return (
                          <li
                            className="mt-3"
                            key={index}
                            style={{ display: "block" }}
                          >
                            <div
                              className="form-check custome-form-check"
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                paddingLeft: "0",
                              }}
                            >
                              <input
                                className="checkbox_animated check-it"
                                type="checkbox"
                                id={`${cat.Category_Name}_box${index}`}
                              />
                              <Link
                                to={`#sub-cat-${cat.Category_ID}${index}`}
                                className="mx-2"
                                data-bs-toggle="collapse"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                {cat.Category_Name}
                              </Link>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-solid btn-solid-primary btn-block mb-4 mx-2">
                CLEAR ALL FILTERS
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-sm-12 mt-5 mt-md-5">
            <h2 className=" fs-2 color-white">
              Services of
              <span className="border-title">&nbsp;Mark Henry</span>
            </h2>
            <div className="row mx-2 mx-md-0 mt-3">
              <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                <p className="mt-2">3,618 items found in Cactus/Succulents</p>
              </div>
              <div className="col-12 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-start justify-content-md-end justify-content-sm-end my-4 my-sm-0 my-md-0 my-lg-0 ">
                <div className="dropdown custom-dropdown">
                  <Link
                    className="btn btn-outline-light dropdown-toggle px-5 fw-light"
                    to="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort By
                  </Link>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="#">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {plant.map((element, index) => {
                return (
                  <div className="col-md-12 col-lg-12 col-sm-12" key={index}>
                    <ServiceCard image={Images.Pictures.service[0]} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12">
            <Pagination />
          </div>
        </div>
      </div>
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
          />
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
