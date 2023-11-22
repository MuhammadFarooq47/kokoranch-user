import Images from "../../../constants/images";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { GET_All_SERVICES } from "../../../redux/actions/services";
import { GET_AGRICULTURAL_SERVICES } from "../../../redux/actions/services";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function Agricultural() {
  const { categories } = useSelector((state) => state.CategoriesReducers);
const {agricultural} = useSelector((state) => state.ServicesReducers)

console.log("agricultural Services", agricultural)

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    dispatch(GET_AGRICULTURAL_SERVICES())
  }, [])
  // useEffect(() => {
  //   dispatch(GET_All_SERVICES(localStorage.getItem("token")));
  // }, []);
  return (
    <>
      <div className="agricultural-section container">
        <div className="col-12" >
          <div className="row">
            <div className="col-8 text-left">
              <h2 className="fs-1">
                Agricultural <span className="border-title">Services</span>
              </h2>
            </div>
            <div className="col-4" style={{ textAlign: "right" }}>
              {/* <h4 className="fs-4">
                <span className="border-title mt-2">See all</span>
              </h4> */}
            </div>
          </div>
          <div className="row mt-4 d-sm-flex justify-content-sm-center">
            {categories
              .filter((x) => x.type === "service")
              .map((element, index) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                    <Link to={"/services/" + element?._id}>
                      <div className="dark-card mt-4">
                        <img
                          src={element?.image.url}
                          style={{
                            width: "15.4rem",
                            height: "13rem",
                            objectFit: "contain",
                          }}
                          alt=""
                        />
                        <h2 className=" fs-2 mt-5">{element?.category}</h2>
                        <p
                          className="mt-3 font-dark fs-4"
                          style={{
                            letterSpacing: 1.5,
                            lineHeight: 1.3,
                          }}
                        >
                          {truncate(element?.description, 100)}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="container w-75">
          <div
            className="row mt-4 delivery-card-container"
            style={{
              textAlign: "left",
            }}
          >
            {agricultural.map((element, index) => {
              return (
               
                <div
                  className="col-lg-4 col-md-6 col-sm-12  delivery-card"
                  key={index}
                >
                  <div className="dark-card mt-4" style={{height: "350px"}}>
                    <img
                      src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${element.image}`}
                      style={{ width: "10.7rem", height: "11.4rem" }}
                      alt=""
                    />
                    <h2
                      className="fs-4"
                      style={{
                        marginTop: 25,
                        marginBottom: 25,
                        whiteSpace: "nowrap",
                      }}
                    >
                     {element?.title}
                    </h2>
                    <p
                      className="mt-2 font-dark fs-6"
                      style={{
                        letterSpacing: 1.5,
                        lineHeight: 1.5,
                      }}
                    >
                     {element?.description}
                    </p>
                  </div>

                
                </div>
                
              );
            })}
              {/* Last Card */}
              <div
                  className="col-lg-4 col-md-6 col-sm-12 delivery-card"
                  // key={index}
                >
                  <div className="dark-card mt-4" style={{height: "350px", background: 'linear-gradient(to right, #BEDC7C, #14A384)',padding: '1rem', justifyContent: "center", alignSelf: "center", display: "flex", flexDirection: "column" }}>
                   <h2>
                     All Services
                    </h2>
                    <HiOutlineArrowNarrowRight style={{ fontSize: "4.9rem", color: "#fff" }} />
                  </div>

                
                </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
