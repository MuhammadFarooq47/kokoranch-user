import { Link } from 'react-router-dom'
import Images from '../../constants/images'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  GET_USER_WISHLIST,
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from '../../redux/actions/wishlist'
import Popup from '../../components/popUp/popUp';
import ProductImg from "../../assets/images/product.png";

export default function ProductCard({ product }) {
  // console.log("Prop product", product[0]?.category?.categoryName)

  const [productName, setProductName] = useState([product]);
  // console.log("ProductName State", productName)

  // {productName?.map((d) => {
  //   return (console.log(d, "ddddddddddddddd"))
  // })}
  
  const { wishlist } = useSelector((state) => state.WishlistReducers)
  // Create a new Set object.
  const categoryNameSet = new Set();

  // Add the product category name to the Set object.
  categoryNameSet.add(product?.category?.categoryName);
  // console.log("categoryNameSet", categoryNameSet)

  // console.log(wishlist, ">>>>>>>>>>>>>>>>>>>>>") // Only console wishlist when it's defined
  // useEffect(() => {
  //   if (wishlist) {
  //     console.log(wishlist, ">>>>>>>>>>>>>>>>>>>>>") // Only console wishlist when it's defined
  //   } else{
  //     console.log("wishlist error")
  //   }
  // }, [wishlist]);

 

  const {user, isAuthenticated} = useSelector(
    (state) => state.authReducer
  );


  const { allCategories } = useSelector((state) => state.CategoriesReducers);
  // console.log("Allproducts", allCategories)

  // {allCategories.map((allcat) => {
  //   console.log(allcat._id, "{{{{{{{{{{{{{}}}}}}}}}}}}}}}}")
  // })}
  const [popupOpenLogin, setPopupOpenLogin] = useState(false)
  const [isPresentWishlist, setisPresentWishlist] = useState(false)
  const plant = [1, 2, 3, 4, 5]
  const dispatch = useDispatch()
  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      setPopupOpenLogin(true)
      return
    } else {
      dispatch(
        WISHLIST_ADD_ITEM(product?._id),
      )
    }
  }
  const handleRemoveFromWishlist = () => {
    dispatch(
      WISHLIST_REMOVE_ITEM(product?._id),
    )
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(GET_USER_WISHLIST(localStorage.getItem('token')));
   
  //   }

  //   // wishlist?.map((item) => {
  //   //   // console.log(item?.product?._id, "/////////////////////////")
  //   //   if (item?.product?._id === product?._id) {
  //   //     setisPresentWishlist(true)
  //   //     console.log('Ids are same')
  //   //   } else {
  //   //     setisPresentWishlist(false)
  //   //     console.log("Ids are not equal")
  //   //   }
  //   // })
  // }, [])

  useEffect(() => {
    if (isAuthenticated) {
      wishlist?.map((item) => {
        if (item?.product?._id === product?._id) {
          setisPresentWishlist(true)
          console.log('Ids are same')
        } 
        // else {
        //   setisPresentWishlist(false)
        //   console.log("Ids are not equal")
        // }
      })
    }
   
  }, [])

  return (
    <>
    
      <Popup open={popupOpenLogin} setOpen={setPopupOpenLogin}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.userIcon}
            className="model-wrapper_image"
            alt="user-icon"
          />
          <p className="model-wrapper_text">Please Login to Leave Review!</p>
          <Link
            to="/login"
            onClick={() => setPopupOpenLogin(false)}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
            Sign In
          </Link>
        </div>
      </Popup>
        {/* <h2> {categoryNameSet[0]} </h2> */}
      <div className="card-flyer card-flyer_product">
        <div className="icon-btn card-flyer_wishlist-icon-wrapper">
          {isPresentWishlist ? (
            <FaHeart
              onClick={() => {
                console.log("remov e");
                setisPresentWishlist(false);
                handleRemoveFromWishlist();
              }}
            />
          ) : (
            <FaRegHeart
              onClick={() => {
                setisPresentWishlist(true);

                handleAddToWishlist();
              }}
            />
          )}
        </div>
        <Link to={"/product/" + product?._id}>
          <div className="text-box">
          <div className="image-box">
      {product?.images && product.images.length > 0 ? (
        <img
          src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${product.images[0]}`}
          alt=""
          style={{
            borderTopLeftRadius: "2.5rem",
            borderTopRightRadius: "2.5rem",
          }}
        />
      ) : (
        <img
          src={Images.Pictures.product[0]}
          alt=""
          style={{
            borderTopLeftRadius: "2.5rem",
            borderTopRightRadius: "2.5rem",
          }}
        />
      )}
    </div>
            <div className="text-container">
              <h4 className="fs-4 ellipsis">
                {product?.description
                  ? product?.description
                  : "Koko Ranch Products Name Here Koko Ranch Products Name Here KokoRanch Products Name Here"}
              </h4>
              <h6 className="fs-6">
                $ {product?.discountedPrice ? product?.discountedPrice : 123}
                <span
                  className="font-dark mx-2"
                  style={{ textDecoration: "line-through", fontSize: "1.5rem" }}
                >
                  ${product?.price ? product?.price : 77}
                </span>
              </h6>
              <div className="row mt-3">
                <div className="col-5">
                  {plant.map((element, index) => {
                    return (
                      <img
                        key={index}
                        src={Images.Pictures.plant}
                        alt="Plant Icon"
                        width={11}
                        height={11}
                      />
                    );
                  })}
                </div>
                <div className="col-7" style={{ textAlign: "right" }}>
                  <p>
                    <strong>In Stock : </strong>{" "}
                    {product?.inStock ? product?.inStock : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
