import React, { useState, useEffect } from 'react'
import UserSideMenu from '../../../../components/userSideMenu'
import { FaCartPlus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import Images from '../../../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import {
  GET_USER_WISHLIST,
  WISHLIST_REMOVE_ITEM,
} from '../../../../redux/actions/wishlist';
import { addtoCart, alreadyInCart } from '../../../../redux/actions/cart'

export default function MyWishlist() {
  const dispatch = useDispatch()

  const {user, isAuthenticated} = useSelector((state) => state.authReducer);
  const { wishlist, removeItemWishList } = useSelector((state) => state.WishlistReducers);
  console.log(wishlist, "WishList")
  const {alreadyPresentCart} = useSelector((state) => state.CartReducers);
  const { cartItems } = useSelector((state) => state.CartReducers);

  const wishlistFilters = wishlist.filter((item) => item?.user?._id === user?.id)

  const [itemRemoved, setitemRemoved] = useState(false)
  
  const handleRemoveFromWishlist = (id) => {
    dispatch(
      WISHLIST_REMOVE_ITEM({ productId: id }, localStorage.getItem('token')),
    )
  }
  
  useEffect(() => {
    if (isAuthenticated || user) {
      dispatch(GET_USER_WISHLIST(localStorage.getItem('token')))
    }
  }, []);

  useEffect(() => {
    {wishlist.map((wishlistData) => {
      dispatch(alreadyInCart(wishlistData?.product?._id));
    })}
  
  }, [cartItems]);

  return (
    <UserSideMenu>
      <div className=" wishist-wrapper">
        <div className="col-12" style={{ height: 'min-content' }}>
          <h2 className="fs-2 mb-3">My Wishlist</h2>
        </div>
        <div className="col-12 wishist-wrapper_inner-wrapper ">
          {wishlistFilters.length != 0 ? (
            wishlist?.map((element, index) => {
              console.log("Element from wishlist", element)
              return (
                <div
                  className="row wishist-wrapper_inner-wrapper_item"
                  key={index}
                >
                  <div className="col-6 wishist-wrapper_inner-wrapper_item_inner-wrapper">
                    <img src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${element?.product?.images[0]}`} alt="product"></img>
                    <div className="wishist-wrapper_inner-wrapper_item_inner-wrapper_item-title-desc-wrapper">
                      <h5 className="fs-5">{element?.product?.productName}</h5>
                      <h6 className="fs-6">{element?.product?.description}</h6>
                    </div>
                  </div>

                  <div className="col-3">
                    <h3
                      className="fs-3"
                      style={{ fontWeight: 'bold', textAlign: 'center' }}
                    >
                      {element?.product?.price} USD
                    </h3>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div
                        className="col-12"
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginBottom: '.5rem',
                        }}
                      >
                        <button
                        // disabled={alreadyPresentCart}
                          className="btn"
                          style={{ backgroundColor: '#CAEAE3', color:"#000000" }}
                          onClick={() => {
                            let cart_item = element
                            cart_item.quantity = 1;
                            cart_item.totalPrice = element?.product?.price;
                            cart_item.deliveryCharges = Number(element?.product?.shippingDetails?.shippingAndHandling);
                            // dispatch(addtoCart(cart_item));
                          }}
                        >
                          <FaPlus></FaPlus>
                          <FaCartPlus></FaCartPlus>
                        </button>
                      </div>
                      <div
                        className="col-12"
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {' '}
                        <button
                          onClick={() => {
                            handleRemoveFromWishlist(element.product?._id)
                            setitemRemoved(true)
                          }}
                          className="btn btn-solid-light"
                          // style={{backgroundColor: "#fff"}}
                        >
                          <FaRegTrashAlt></FaRegTrashAlt>&nbsp;Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className=""> No Items In Wishlist!</p>
          )}
        </div>
      </div>
    </UserSideMenu>
  )
}
