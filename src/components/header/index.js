import { useEffect, useState } from "react";
import Images from "../../constants/images";
import { GET_All_CATEGORIES } from "../../redux/actions/categories";
import {  btn_List, btn_sub_List } from "../../helpers/headerData";
// btn_List,
import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import {
//   // GET_All_PRODUCTS,
//   GET_SEARCH_PRODUCTS_ACTION,
// } from "../../redux/actions/products";

import {
  FaUserAlt,
  FaAngleDown,
  FaAngleUp,
  FaAngleRight,
  FaRegHeart,
  FaOpencart,
  FaBars,
  FaRegWindowClose,
} from "react-icons/fa";
import Popup from "../../components/popUp/popUp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartItems } from "../../redux/actions/cart";
 
    

export default function Header() {
  const Navigate = useNavigate();

  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(false);
  const [mobile, setMobile] = new useState(false);
  const [searchText, setSearchText] = new useState("");
  const [searchType, setsearchType] = useState("");
  const { isAuthenticated, userType, user } = useSelector(
    (state) => state.authReducer
  );

  console.log("User reducer", user)

  const { categories, subCategories, subSubCategories, allCategories } = useSelector(
    (state) => state.CategoriesReducers
  );
  const { cartItems } = useSelector((state) => state.CartReducers);
  const { Allproducts } = useSelector((state) => state.ProductsReducers);
  const { wishlist } = useSelector((state) => state.WishlistReducers);
  
  const filteredCartItems = cartItems.filter(item => item?.buyerId === user?._id);
  const wishlistItems = wishlist.filter((item) => item?.user?._id === user?._id)

  if(wishlistItems){
    console.log("Yes both ids are same")
  }


  const dispatch = useDispatch();
  const closeSideBar = (e) => {
    e.preventDefault();
    setMobile(false);
    document.getElementsByTagName("html")[0].style.overflowY = "scroll";
  };
  const handleSearchProducts = () => {
    const token = localStorage.getItem("token");
    const condition = {
      searchText: searchText,
      category: searchType,
    };
    if (searchText && searchType) {
      console.log("Search Text")
      // dispatch(GET_SEARCH_PRODUCTS_ACTION(condition, token));
    }
  };
  const detectElementPosition = (e) => {
    let bodyRect = document.body.getBoundingClientRect();
    const element = e.target;
    if (element.parentNode.tagName === "UL") {
      const elemRect = element.getBoundingClientRect();
      const offset = elemRect.right - bodyRect.right;
      if (Math.floor(offset) >= -200) {
        element.children[1].classList.remove("sub-menu-left");
        element.children[1].classList.add("sub-menu-right");
      }
    }
  };
  const handleSelectSearchType = (searchType) => {
    setsearchType(searchType);
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
  };
  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setSearchText(item.name);
    setsearchType(item.category.category);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ textAlign: "left", display: "block" }}>{item.name}</span>
        {/* <span style={{ textAlign: 'left', display: 'block' }}>
          Category Type :{item.category.category}
        </span> */}
      </>
    );
  };

  // GETING DATA
  useEffect(() => {
    dispatch(GET_All_CATEGORIES());
    // dispatch(GET_All_PRODUCTS());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(getAllCartItems(localStorage.getItem("token")));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToTopFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const scrollFunction = () => {
      let mybutton = document.getElementById("Arrow-up-btn");
      if (
        document.body.scrollTop > 30 ||
        document.documentElement.scrollTop > 30
      ) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    };
  
    if (location.pathname === "/") {
      window.addEventListener("scroll", scrollFunction);
    }
  
    return () => {
      if (location.pathname === "/") {
        window.removeEventListener("scroll", scrollFunction);
      }
    };
  }, [location.pathname]);   // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <header id="home" className="main-header" style={{ paddingInline: 35 }}>
        {/* Cheching path for diffrent HEADER  */}
        {location.pathname !== "/vendor-register" &&
        location.pathname !== "/vendor-signup-success" ? (
          <>
            {/* TOP HEADER  */}
            <div className="top-header top-header-black">
              <div className="container-fluid-lg">
                <div className="row">
                  <div className="col-auto">
                    {/* d-xl-block d-none */}
                    <ul className="top-header_border-list">
                     
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/vendor-register">
                          <div className="title-color">
                            Become a Vendor or Trader
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-auto">
                    <h5 className="h5">Welcome! We Only Sale Natural Herbs Product.</h5>
                  </div>
                  <div className="col-auto">
                    <ul className="top-header_border-list">
                      <li>
                        <Link to="/about">
                          <button
                            type="button"
                            className="btn btn-solid btn-solid-primary-rounded btn-sm px-5 "
                          >
                            About Us
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">
                          <strong>
                            <FaUserAlt className="icon-light" />{" "}
                            {isAuthenticated ? "My Account" : "LOGIN"}
                          </strong>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* MID HEADER  */}
            <div className="mid-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mid-header_main-menu">
                      <div className="mid-header_main-menu_menu-left">
                        <div className="brand-logo">
                          <Link to="/">
                            <img
                              src={Images.Pictures.logo}
                              className="img-fluid lazyload"
                              width={95}
                              height={95}
                              alt="logo"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="mid-header_main-menu_search-box1 d-lg-block d-none">
                        <div className="the-basics input-group">
                          {/* <input
                            type="text"
                            className="form-control typeahead"
                            id="exampleInputPassword1"
                            placeholder="Search anthing you want"
                          /> */}
                          <div
                            style={{
                              width: "75%",
                            }}
                          >
                            <ReactSearchAutocomplete
                              className="wrapper"
                              items={Allproducts}
                              onSearch={handleOnSearch}
                              onSelect={handleOnSelect}
                              autoFocus
                              formatResult={formatResult}
                            />
                          </div>
                          <div className="mid-header_main-menu_search-box1_category-menu">
                            <div className="dropdown ">
                              <button
                                style={{ height: "46px" }}
                                className="btn btn-secondary dropdown-toggle "
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                              >
                                {searchType == ""
                                  ? "Select Category"
                                  : searchType}
                                <FaAngleDown />
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li
                                  onClick={() => {
                                    handleSelectSearchType("All");
                                  }}
                                >
                                  <Link className="dropdown-item" to="#">
                                    All
                                  </Link>
                                </li>
                                <li
                                  onClick={() => {
                                    handleSelectSearchType(" Vendor / Trader");
                                  }}
                                >
                                  <Link className="dropdown-item" to="#">
                                    Vendor / Trader
                                  </Link>
                                </li>

                                {categories
                                  ?.filter((element) => {
                                    if (searchType !== "") {
                                      return element.category === searchType;
                                    } else {
                                      return element;
                                    }
                                  })
                                  .map((item) => {
                                    return (
                                      <li
                                        onClick={() => {
                                          handleSelectSearchType(item.category);
                                        }}
                                        key={item._id}
                                      >
                                        <Link className="dropdown-item" to="#">
                                          {item.category}
                                        </Link>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>

                          <Link
                            to={
                              searchType && searchText
                                ? `/search/${searchType}/${searchText}`
                                : `/products`
                            }
                          >
                            <button
                              onClick={() => handleSearchProducts()}
                              type="button"
                              className="btn btn-solid btn-solid-primary-rounded d-sm-block d-none mx-3"
                              style={{ paddingInline: "4rem" }}
                            >
                              Search
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* REACT SEARCH COMPONEN */}

                      <div className="mid-header_main-menu_menu-right">
                        <ul>
                          <li>
                            <div className="toggle-nav">
                              <Link
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setMobile(true);
                                  // document.body.style.overflowY = "hidden";
                                  document.getElementsByTagName(
                                    "html"
                                  )[0].style.overflow = "hidden";
                                }}
                              >
                                <FaBars className="light-icon" />
                              </Link>
                            </div>
                          </li> 
                          <li className="onhover-dropdown wislist-dropdown">
                            <div
                              className="cart-media"
                              onClick={() => {
                                if (isAuthenticated) {
                                  Navigate("/wishlist");
                                } else {
                                  setPopupOpen(true);
                                }
                              }}
                            >
                              <div className="cart-icon">
                                <FaRegHeart className="light-icon" />
                                <span className="label label-theme rounded-pill">
                                  {wishlistItems?.length !==0 ? wishlist?.length : 0}
                                </span>
                              </div>
                            </div>
                          </li>

                          <li className="onhover-dropdown wislist-dropdown">
                            <div
                              className="cart-media"
                              onClick={() => {
                                if (isAuthenticated) {
                                  Navigate("/cart");
                                } else {
                                  setPopupOpen(true);
                                }
                              }}
                            >
                              <div className="cart-icon">
                                <FaOpencart className="light-icon" />
                                <span className="label label-theme rounded-pill">
                                  {filteredCartItems?.length != 0 ? filteredCartItems?.length : 0}
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom HEADER  */}
            <div className="bottom-header container-fluid-lg">
              <nav className="main-navbar">
                <ul className="nav-menu">
                  {/* {renderCategoryList(Data)} */}
                  {categories.length > 0 &&
                    subCategories.length > 0 &&
                    subSubCategories.length > 0 &&
                    categories
                      .filter((x) => x.type === "product")
                      .map((cat, index) => {
                        return (
                          <li
                            key={`cat-${cat._id}`}
                            className="nav-menu-li"
                            onMouseOver={(e) => {
                              detectElementPosition(e);
                            }}
                          >
                            <Link to={"/"}>
                              {cat.category}{" "}
                              {subCategories.filter(
                                (subcat) => subcat.category._id === cat._id
                              ).length > 0 && <FaAngleDown></FaAngleDown>}
                            </Link>

                            {subCategories.filter(
                              (subcat) => subcat.category._id === cat._id
                            ).length > 0 && (
                              <ul className="sub-menu sub-menu-left">
                                {subCategories.map((sub_cat, sub_cat_index) => {
                                  return (
                                    cat._id === sub_cat.category._id && (
                                      <li key={`sub-cat${sub_cat_index}`}>
                                        {sub_cat.subCategory}
                                        {subSubCategories.filter(
                                          (subSubCat) =>
                                            subSubCat.subCategory._id ===
                                            sub_cat._id
                                        ).length > 0 && (
                                          <FaAngleRight></FaAngleRight>
                                        )}
                                        {subSubCategories.filter(
                                          (subSubCat) =>
                                            subSubCat.subCategory._id ===
                                            sub_cat._id
                                        ).length > 0 && (
                                          <ul className="sub-menu sub-menu-left">
                                            {subSubCategories.map(
                                              (
                                                sub_sub_cat,
                                                sub_sub_cat_index
                                              ) => {
                                                return (
                                                  sub_cat._id ===
                                                    sub_sub_cat.subCategory
                                                      ._id && (
                                                    <li
                                                      key={`
                                                      sub-sub-cat${sub_sub_cat_index}`}
                                                    >
                                                      {
                                                        sub_sub_cat.subSubCategory
                                                      }
                                                    </li>
                                                  )
                                                );
                                              }
                                            )}
                                          </ul>
                                        )}
                                      </li>
                                    )
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                </ul>
              </nav>
            </div>
            {/* Dropdown header start here */}

            {/* Farooq code start*/}
            <div className="row my-4">
            <div className="col-12" style={{ display: "flex", flexDirection: "row" }}>
    {allCategories.map((cat, index) => (
      // console.log(cat.categoryName)
      <li
        className="btn btn-solid-dark-rounded f-bold header-bottom-dropdown-button"
        type="button"
        id="dropdownMenuButton2"
        data-toggle="dropdown"
        key={cat._id}
      >
        {cat.categoryName}
        <FaAngleDown />
        {cat.subCategories && (
          <ul className="sub-menu sub-menu-left">
            {cat.subCategories.map((subCat, subCatIndex) => (
              <li key={subCat?.category?._id}>
                {subCat.subCategoryName}
                {subCat.subCategories && <FaAngleRight />}
                {subCat.subCategories && (
                  <ul className="sub-menu sub-menu-left">
                    {subCat.subSubCategories.map((subSubCat, subSubCatIndex) => (
                      <li key={subSubCat._id}>
                        {subSubCat.subSubCategoryName}
                        {/* Check for sub-sub-categories here and add FaAngleRight accordingly */}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </div>
</div>
 {/* Farooq code end*/}
 <div className="row my-4">
              <div className="col-12">
                <li
                  className="btn btn-solid-light-rounded mx-auto f-bold header-bottom-dropdown-button"
                  type="button"
                  id="dropdownMenuButton2"
                  databstoggle="dropdown"
                >
                  <FaAngleDown /> &nbsp; Arts & Clothing &nbsp;
                  <FaAngleDown />
                  <div className="header-bottom-dropdown-button_dot"></div>
                  <ul className="sub-menu sub-menu-left">
                    {btn_List.map((sub_cat, sub_cat_index) => {
                      return (
                        <li key={`btn-sub-cat${sub_cat.Category_ID}`}>
                          {sub_cat.Category_Name}
                          {sub_cat.children && <FaAngleRight></FaAngleRight>}
                          {sub_cat.children && (
                            <ul className="sub-menu sub-menu-left">
                              {btn_sub_List.map(
                                (sub_sub_cat, sub_sub_cat_index) => {
                                  return (
                                    sub_cat.Category_ID ===
                                      sub_sub_cat.Category_Parent_ID && (
                                      <li
                                        key={`btn-sub-sub-cat${sub_sub_cat_index}`}
                                      >
                                        {sub_sub_cat.Category_Name}
                                        {sub_sub_cat.children && (
                                          <FaAngleRight></FaAngleRight>
                                        )}
                                      </li>
                                    )
                                  );
                                }
                              )}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </div>
            </div>

    {/* Dropdown header end here */}
            {/* <div className="row my-4">
              <div className="col-12">
                <li
                  className="btn btn-solid-light-rounded mx-auto f-bold header-bottom-dropdown-button"
                  type="button"
                  id="dropdownMenuButton2"
                  databstoggle="dropdown"
                >
                  <FaAngleDown /> &nbsp; Arts & Clothing &nbsp;
                  <FaAngleDown />
                  <div className="header-bottom-dropdown-button_dot"></div>
                  <ul className="sub-menu sub-menu-left">
                    {btn_List.map((sub_cat, sub_cat_index) => {
                      return (
                        <li key={`btn-sub-cat${sub_cat.Category_ID}`}>
                          {sub_cat.Category_Name}
                          {sub_cat.children && <FaAngleRight></FaAngleRight>}
                          {sub_cat.children && (
                            <ul className="sub-menu sub-menu-left">
                              {btn_sub_List.map(
                                (sub_sub_cat, sub_sub_cat_index) => {
                                  return (
                                    sub_cat.Category_ID ===
                                      sub_sub_cat.Category_Parent_ID && (
                                      <li
                                        key={`btn-sub-sub-cat${sub_sub_cat_index}`}
                                      >
                                        {sub_sub_cat.Category_Name}
                                        {sub_sub_cat.children && (
                                          <FaAngleRight></FaAngleRight>
                                        )}
                                      </li>
                                    )
                                  );
                                }
                              )}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </div>
            </div> */}
          </>
        ) : (
          <div className="top-header top-header-black">
            <div className="container-fluid-lg">
              <div className="row">
                <div className="col-auto d-xl-block">
                  <div className="brand-logo">
                    <Link to="/">
                      <img
                        src={Images.Pictures.logo}
                        className="img-fluid lazyload"
                        width={75}
                        height={75}
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-auto d-xl-block d-none">
                  <ul className="border-list">
                    <li> Welcome ! </li>
                  </ul>
                </div>

                <div className="col-auto">
                  <ul className="border-list">
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {mobile ? (
        <>
          <div className="bg-overlay show" onClick={closeSideBar}></div>
          <div className={`side-bar ${mobile ? "side-bar-show" : null}`}>
            <div className="m-3 fs-2" style={{ cursor: "pointer" }}>
              <FaRegWindowClose onClick={closeSideBar} />
            </div>
            <div className="d-flex flex-column">
              <h4 className="fs-4">
                Cate<span className="border-title">gory:</span>
              </h4>
              <ul className="category-list">
                {categories.map((cat, index) => {
                  return (
                    <li
                      className="mt-3"
                      key={`mobile-cat${cat._id}`}
                      style={{ display: "block" }}
                    >
                      <div
                        className="form-check custome-form-check justify-content-between"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "max-content 1fr",
                          gridTemplateRows: "1fr",
                        }}
                      >
                        <label
                          onClick={closeSideBar}
                          className="form-check-label"
                          htmlFor={`${cat.category}_box${index}`}
                        >
                          <Link to={"/"}>{cat.category}</Link>
                        </label>
                        {subCategories.filter(
                          (subcat) => subcat.category._id === cat._id
                        ).length > 0 && (
                          <Link
                            to={`#sub-cat-${cat._id}${index}`}
                            className="mx-2"
                            data-bs-toggle="collapse"
                          >
                            <FaAngleDown style={{ float: "right" }} />
                          </Link>
                        )}
                      </div>
                      {/* sub category start */}
                      <div
                        className="collapse mx-4 mt-3"
                        id={`sub-cat-${cat._id}${index}`}
                      >
                        <ul>
                          {subCategories.map((sub_cat, index) => {
                            return (
                              cat._id === sub_cat.category._id && (
                                <li
                                  className="mt-3"
                                  key={`mobile-sub-cat${sub_cat._id}`}
                                  style={{ display: "block" }}
                                >
                                  <div
                                    className="form-check custome-form-check justify-content-between"
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "max-content 1fr",
                                      gridTemplateRows: "1fr",
                                    }}
                                  >
                                    <label
                                      onClick={closeSideBar}
                                      className="form-check-label"
                                      htmlFor={`${sub_cat.subCategory}_box${index}`}
                                    >
                                      <Link to={"/"}>
                                        {sub_cat.subCategory}
                                      </Link>
                                    </label>
                                    {subSubCategories.filter(
                                      (subSubcat) =>
                                        subSubcat.subCategory._id ===
                                        sub_cat._id
                                    ).length > 0 && (
                                      <Link
                                        to={`#sub-sub-cat-${sub_cat._id}${index}`}
                                        className="mx-2"
                                        data-bs-toggle="collapse"
                                      >
                                        <FaAngleDown
                                          style={{ float: "right" }}
                                        />
                                      </Link>
                                    )}
                                  </div>
                                  {/* sub sub category start */}
                                  <div
                                    className="collapse mx-4 mt-3"
                                    id={`sub-sub-cat-${sub_cat._id}${index}`}
                                  >
                                    <ul>
                                      {subSubCategories.map(
                                        (sub_sub_cat, index) => {
                                          return (
                                            sub_cat._id ===
                                              sub_sub_cat.subCategory._id && (
                                              <li
                                                className="mt-3"
                                                key={`mobile-sub-sub-cat${sub_sub_cat._id}`}
                                                style={{ display: "block" }}
                                              >
                                                <div
                                                  className="form-check custome-form-check justify-content-between"
                                                  style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                      "max-content 1fr",
                                                    gridTemplateRows: "1fr",
                                                  }}
                                                >
                                                  <label
                                                    onClick={closeSideBar}
                                                    className="form-check-label"
                                                    htmlFor={`${sub_sub_cat.subSubCategory}_box${index}`}
                                                  >
                                                    <Link to={"/"}>
                                                      {
                                                        sub_sub_cat.subSubCategory
                                                      }
                                                    </Link>
                                                  </label>
                                                  {sub_sub_cat.children && (
                                                    <Link
                                                      to={`#${sub_sub_cat.Category_ID}${index}`}
                                                      className="mx-2"
                                                      data-bs-toggle="collapse"
                                                    >
                                                      <FaAngleDown
                                                        style={{
                                                          float: "right",
                                                        }}
                                                      />
                                                    </Link>
                                                  )}
                                                </div>
                                              </li>
                                            )
                                          );
                                        }
                                      )}
                                    </ul>
                                  </div>
                                  {/* sub sub category end */}
                                </li>
                              )
                            );
                          })}
                        </ul>
                      </div>
                      {/* subcategory end */}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      ) : null}
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.userIcon}
            className="model-wrapper_image"
            alt="user-icon"
            style={{width: 100}}
          />
          <p className="model-wrapper_text">
            Please Login First
          </p>
          <Link
            to="/login"
            onClick={() => setPopupOpen(false)}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
            Login
          </Link>
        </div>
      </Popup>
      {location.pathname === "/" && (
  <div id="Arrow-up-btn" onClick={scrollToTopFunction}>
    <FaAngleUp />
  </div>
)}

    </>
  );
}
