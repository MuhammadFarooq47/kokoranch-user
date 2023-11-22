import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination";
import TradeCard from "../../../components/TradeCard";
import Images from "../../../constants/images";

import { useEffect, useState } from "react";
// import { GET_All_TRADES } from "../../../redux/actions/trades";
import { useSelector, useDispatch } from "react-redux";
export default function AgricultureServices() {
  const dispatch = useDispatch();
  const { trades } = useSelector((state) => state.TradesReducers);

  // useEffect(() => {
  //   dispatch(GET_All_TRADES());
  // }, []);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="container mt-5">
      <div className="dark-card">
        <div className="row">
          <div
            className="col-12 col-lg-6 col-md-6 col-sm-6"
            style={{ textAlign: "left" }}
          >
            <h2 className="fs-2">
              All Trade <span className="border-title"> Products</span>
            </h2>
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
          {trades?.map((element, index) => {
            return (
              <div className="col-md-6 col-sm-12 col-lg-6" key={index}>
                <TradeCard props={element} image={Images.Pictures.tradeImage} />
              </div>
            );
          })}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
