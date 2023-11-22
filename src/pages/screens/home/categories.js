import Images from "../../../constants/images";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/productCard";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  GET_CATEGORIES_PRODUCTS,
  GET_All_CATEGORIES,
} from "../../../redux/actions/categories";
export default function Categories() {
  const dispatch = useDispatch();
  const {categoriesProducts, categories, allCategories } = useSelector(
    (state) => state.CategoriesReducers
  );

  {allCategories?.map((d) => {
    console.log("data", d);
  })}

  console.log("allCategories ??????", allCategories);

  const slicedCategoryList = allCategories?.slice(0, 5);

  const [activeCate, setActiveCate] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#14A384");

  const override = css`
    display: block;
    margin: 0 auto;GET_All_CATEGORIES
    border-color: #14a384;
  `;

  const [categoryName, setCategoryName] = useState("Plants");
  const [productsList, setproductsList] = useState([]);

  const activeClassToggle = (e, cat) => {
    setLoading(true);
    setActiveCate(cat._id);
    setCategoryName(cat.category);
    dispatch(GET_CATEGORIES_PRODUCTS(cat._id));
  };

  // Farooq useEffect
  useEffect(() => {
    dispatch(GET_All_CATEGORIES());
  }, []);

  // useEffect(() => {
  //   // dispatch(GET_CATEGORIES_PRODUCTS(categoryName));
  // }, [categoryName]);

  useEffect(() => {
 
      setLoading(false);
      // categoriesProducts?.map((item) => {
        // console.log("Element?????????", [item])
      //   setproductsList([item]);
      // });
      // setActiveCate(slicedCategoryList[0]._id);
    
  }, [categoriesProducts]);

  return (
    <>
      <section className="ratio_asos category-style-3">
        <div className="container">
          <div className="row">
            <div className="col-8 text-left">
              <h2 className="fs-2">
                All Pro<span className="border-title-gradient">ducts</span>
                <p style={{ fontSize: ".9rem", fontWeight: "normal" }}>
                  Top Categories
                </p>
              </h2>
            </div>
            <div className="col-4 " style={{ textAlign: "right" }}>
              {/* <h4 className="fs-4">
                <span className="border-title mt-2">See all</span>
              </h4> */}
            </div>
          </div>
          <div
            className="row  mx-auto px-5 d-flex  justify-content-evenly  "
            style={{ marginTop: "2rem", marginBottom: "5rem" }}
          >
            {allCategories.length <= 0 ? (
              <h2 style={{ textAlign: "center" }}>No data Found</h2>
            ) : (
              allCategories?.slice(0, 5).map((cat, index) => {
                return (
                  <div
                    key={index}
                    className="card d-flex align-items-center mx-2 justify-content-between border-0"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      onClick={(e) => activeClassToggle(e, cat)}
                      className={`category-card mt-5 ${
                        activeCate === cat._id ? "category-card-active" : ""
                      }`}
                    >
                      <img
                        src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${cat?.icon}`}
                        alt="category"
                      />
                    </div>
                    <h4 className="fs-4 mt-3">{cat.categoryName}</h4>
                  </div>
                );
              })
            )}
            <div
              className="card  d-flex align-items-center mx-2 justify-content-between border-0 "
              style={{ width: "fit-content" }}
            >
              <Link to="/categories">
                <div className="category-card d-flex  flex-column justify-content-center align-items-center  mx-4 mt-5">
                  <h5
                    style={{
                      fontSize: "1.4rem",
                      color: "#000",
                      fontWeight: "600",
                    }}
                  >
                    All Categories
                  </h5>
                  <HiOutlineArrowNarrowRight
                    style={{ fontSize: "2.9rem", color: "#000" }}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="featrured-dynamic-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-6 text-left">
              <h2 className="fs-2">
                <span className="border-title">
                  {categories.map((cat, index) => {
                    return activeCate === cat._id && cat.category;
                  })}
                </span>
              </h2>
            </div>
           
            <div className="col-6" style={{ textAlign: "right" }}>
            <Link to="/categories">
              <h4 className="fs-4">
                <span className="border-title mt-2">See all</span>
              </h4>
            </Link>
            </div>
          </div>
          <div
            style={{ display: loading ? "none" : "flex" }}
            className="d-flex justify-content-flex-start flex-wrap"
          >
            <ClipLoader
              color={color}
              loading={loading}
              css={override}
              size={150}
            />

            {categoriesProducts?.length !== 0 ? (
              categoriesProducts?.map((element, index) => {
                // console.log(element, "<<>><><><><><>()")
                if (element?.category?._id === activeCate) {
                  return (
                    <div
                      style={{ display: loading ? "none" : "block" }}
                      className="me-4 mb-5"
                      key={index}
                    >
                      <ProductCard product={element} />
                    </div>
                  );
                }
              })
            ) : (
              <span
                style={{
                  display:
                    loading && categoriesProducts.length === 0 ? "none" : "block",
                }}
                className="fs-4  mt-2"
              >
                No Products Available!
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
