import AgriculturalCard from "../../../components/productCard/agriculturalCard";
import Images from "../../../constants/images";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { GET_All_SERVICES } from "../../../redux/actions/services";

export default function AgricultureServices() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.ServicesReducers);
  const { categories } = useSelector((state) => state.CategoriesReducers);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  useEffect(() => {
    const arr = [1, 2, 3, 4, 5, 6];
    // dispatch(GET_All_SERVICES(localStorage.getItem("token")));
  }, []);

  return (
    <div
      className="container mt-5"
      style={{
        position: "relative",
      }}
    >
      <img
        src={Images.Pictures.brownLeftLeaf}
        style={{
          position: "absolute",
          bottom: "-5rem",
          left: "-8rem",
          width: "55rem",
        }}
        alt="leaf"
      ></img>
      <div className="dark-card">
        <div className="row">
          <div
            className="col-lg-12 col-md-12 col-sm-12"
            style={{ textAlign: "left" }}
          >
            <h2 className="fs-2">
              Agricultural <span className="border-title"> Services</span>
            </h2>
          </div>
          {/* {services?.map((element, index) => {
            return (
              <div className="col-md-4 col-sm-6 col-lg-4" key={index}>
                <AgriculturalCard
                  id={element?._id}
                  image={element?.image}
                  title={element.title}
                  content={truncate(element.description, 100)}
                />
              </div>
            );
          })} */}
          {categories
            ?.filter((x) => x.type === "service")
            .map((element, index) => {
              return (
                <div className="col-md-4 col-sm-6 col-lg-4" key={index}>
                  <AgriculturalCard
                    id={element?._id}
                    image={element?.image?.url}
                    title={element?.category}
                    content={truncate(element.description, 100)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
