import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
export default function ProductCard({ props }) {
  return (
    <Link to={"/trade/" + props?._id}>
      <div className="trade-card-wrapper">
        <div className="trade-card-wrapper_image-box ">
          <img src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${props?.images[0]}`} style={{ width: "25rem", borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px'}} alt="Service Image" />
        </div>
        <div className="trade-card-wrapper_text-container-wrapper">
          <div className="trade-card-wrapper_text-container-wrapper_text-container-1">
            <h3 className="fs-3 text-uppercase">In Search of:</h3>
            <p style={{ fontSize: "1rem" }}>{props?.isSearchOf
                          .substr(props?.isSearchOf.length - 133)}</p>
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
