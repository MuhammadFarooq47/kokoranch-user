import { Link } from "react-router-dom";

export default function CategoryCard(props) {
  return (
    <div className="card-flyer card-flyer_category ">
      <Link to={props.params}>
        <div className="text-box">
          <div className="image-box">
            <img src={props.image} alt="" style={{borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem"}} />
          </div>
          <div className="text-container text-center p-5">
            <h5 style={{ fontWeight: 100, textTransform: "capitalize" }}>
              {props.name}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}
