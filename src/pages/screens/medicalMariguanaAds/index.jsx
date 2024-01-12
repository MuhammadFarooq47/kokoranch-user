import React, { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import Images from "../../../constants/images";
import Popup from "../../../components/popUp/popUp";
import Pagination from "../../../components/pagination";
import { Link } from "react-router-dom";

export default function MedicalMariguanaAds() {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 text-left">
          <h2 className="fs-2">
            Medical <span className="border-title">Marijuana Ads</span>
          </h2>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button className="btn btn-solid btn-solid-primary px-5 py-3 d">
            Post Your Ads
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12 col-sm-12 col-lg-3">
          <p>Search</p>
          <div className="col-12 search-card p-4">
            <label>Search Ads by State or City</label>
            <input className="form-control mt-2" placeholder="Search" />
            <hr className="text-light mt-3" />
            <p className="pb-1">Search Your Nearby</p>
            <button className="btn btn-solid btn-solid-primary btn-full fs-5">
              <FaSearchLocation /> Your Location
            </button>
          </div>
          <div className="col-12 search-card p-4 mt-4">
            <h4 className="fs-4title-color">How this section works?</h4>
            <p className="mt-3 lh-base">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore.
            </p>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-lg-9">
          <div className="col-12 d-flex justify-content-end">
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

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
          {[1, 2, 1, 2].map((elem, index) => {
            return (
              <div
                className="col-12 mt-2"
                style={{ cursor: "pointer" }}
                onClick={() => setPopupOpen(true)}
                key={index}
              >
                <div
                  className="ads p-5"
                  style={{
                    background: `url(${Images.Pictures.banner[elem]})`,
                  }}
                >
                  <h2 className=" fs-2 text-dark">
                    Increase You Product Visibility Get More Buyers Post Your Ad
                    Here.. In Just $100 a month
                  </h2>
                </div>
              </div>
            );
          })}
          <Popup open={popupOpen} setOpen={setPopupOpen} fullwidth={true}>
            <div className="ad-popup-wrapper">
              <img
                width="20"
                className="ad-popup-wrapper_image"
                src={Images.Pictures.banner[1]}
                alt="alt"
              />
              <div className="ad-popup-wrapper_description-wrapper">
                <div className="ad-popup-wrapper_description-wrapper_title-button-wrapper">
                  <h3 className="fs-3 ad-popup-wrapper_description-wrapper_title-button-wrapper_title">
                    Desctiption:
                  </h3>{" "}
                  <button className="btn btn-solid btn-solid-primary-rounded ad-popup-wrapper_description-wrapper_title-button-wrapper_button">
                    Visit Us
                  </button>{" "}
                </div>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like)
                </p>
              </div>
            </div>
          </Popup>
          <div className="col-12">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
