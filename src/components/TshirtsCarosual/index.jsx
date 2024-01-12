import ProductCard from "../productCard";
import { useState, useEffect } from "react";
import Images from "../../constants/images";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { GET_All_PRODUCTS } from "../../redux/actions/products";
import { GET_USER_WISHLIST } from "../../redux/actions/wishlist";
export default function TshirtsCarosual({
  showTitle = true,
  marginTop = "7rem",
}) {
  const dispatch = useDispatch();

  const { Allproducts } = useSelector((state) => state.ProductsReducers);
  const [products, setProducts] = useState([]);
  const { wishlist, removeItemWishList, addWishlist } = useSelector(
    (state) => state.WishlistReducers
  );
  const responsive = {
    bigdesktop: {
      breakpoint: { max: 3000, min: 1900 },
      items: 4,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    desktop: {
      breakpoint: { max: 1900, min: 1440 },
      items: 5,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 5,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptopMd: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptopSm: {
      breakpoint: { max: 768, min: 500 },
      items: 2,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    laptopXs: {
      breakpoint: { max: 500, min: 425 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    phone: {
      breakpoint: { max: 425, min: 375 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    phoneMd: {
      breakpoint: { max: 375, min: 320 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    phoneSm: {
      breakpoint: { max: 320, min: 0 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
  };
  const plant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // useEffect(() => {
  //   dispatch(GET_All_PRODUCTS());
  // }, []);

  useEffect(() => {
    if (Allproducts?.length > 0) {
      setProducts(Allproducts);
    }
  }, [wishlist, removeItemWishList, addWishlist]);
  // useEffect(() => {
  //   if (Allproducts) {
  //     let result = Allproducts?.filter((o1) =>
  //       wishlist?.some((o2) => {
  //         if (o1?._id == o2?.product._id) {
  //           const update = { ...o2.product, isFavourite: true }
  //           return update
  //         }
  //       }),
  //     )
  //     result.forEach((element) => {
  //       element.isFavourite = true
  //     })

  //     let filtered = Allproducts?.filter(
  //       ({ _id }, index) => !result.includes(_id, index + 1),
  //     )

  //     setProducts(filtered)
  //   }
  // }, [Allproducts, addWishlist])

  return (
    <>
      <section
        className="product-carosual-section"
        style={{ marginTop: marginTop }}
      >
        <img
          src={Images.Pictures.greenRightUpLeaf}
          style={{
            position: "absolute",
            // top: "-1rem",
            transform: "translateY(50%) rotate(-90deg)",
            right: "9rem",
            // width: "15rem",
            zIndex: "-1",
          }}
          alt="greenRightUpLeaf"
        ></img>
        <img
          src={Images.Pictures.greenRightUpLeaf}
          style={{
            position: "absolute",
            transform: "translateY(50%) rotate(90deg)",
            // bottom: "-6rem",
            left: "9rem",
            // width: "15rem",
            zIndex: "-1",
          }}
          alt="greenRightUpLeaf"
        ></img>
        <div className="container">
          {showTitle && (
            <div className="row mb-0">
              <div className="col-8 text-left">
                <h2 className="fs-1">
                  {/* {title1} <span className="border-title">{title2}</span> */}
                  T-Sh<span className="border-title-gradient">irts</span>
                </h2>
              </div>
              <div className="col-4" style={{ textAlign: "right" }}>
                <h4 style={{ fontSize: "2rem" }}>
                  {Allproducts && Allproducts?.length !== 0 && (
                    <Link to="/products" className="border-title-brown mt-2">
                      See All
                    </Link>
                  )}
                </h4>
              </div>
            </div>
          )}
          {Allproducts && Allproducts?.length !== 0 ? (
            <Carousel className="mx-2" infinite={true} responsive={responsive}>
              {Allproducts?.map((element, index) => {
                return (
                  <ProductCard
                    key={index}
                    product={element}
                    image={Images.Pictures.product[0]}
                  />
                );
              })}
            </Carousel>
          ) : (
            <span className="fs-4  mt-2">No Products Available!</span>
          )}
        </div>
      </section>
    </>
  );
}
