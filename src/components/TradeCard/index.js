import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
export default function ProductCard({ props }) {
  return (
    <Link to={"/trade/" + props?._id}>
      <div className="trade-card-wrapper">
        <div className="trade-card-wrapper_image-box ">
          <img src={props?.images[0].url} style={{ width: "25rem" }} alt="" />
        </div>
        <div className="trade-card-wrapper_text-container-wrapper">
          <div className="trade-card-wrapper_text-container-wrapper_text-container-1">
            <h3 className="fs-3 text-uppercase">In Search of:</h3>
            <p style={{ fontSize: "1rem" }}>{props?.inSearchOf}</p>
          </div>
          <div className="trade-card-wrapper_text-container-wrapper_text-container-2">
            <h3 className="fs-3 text-uppercase"> To Exchange with:</h3>
            <p style={{ fontSize: "1rem" }}>{props?.toExchangeWith}</p>
            <div className="trade-date">
              {moment(props?.createdAt).format("MMM DD YYYY h:mm A")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
