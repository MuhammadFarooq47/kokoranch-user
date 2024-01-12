import HomeBanner from "./banner";
import Categories from "./categories";
import Agricultural from "./agriculture";
import Trade from "./trade";
import Delevery from "./delevery";
import Clothing from "./clothing";
import Contact from "./contact";
import MainSlider from "../../../components/MainSlider";
import ProductCarosual from "../../../components/ProductCarosual";
import { GET_USER_WISHLIST } from "../../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  const { removeItemWishList, addWishlist } = useSelector(
    (state) => state.WishlistReducers
  );
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (user) {
      dispatch(GET_USER_WISHLIST(localStorage.getItem("token")));
    }
  }, [addWishlist, removeItemWishList]);

  return (
    <>
      <MainSlider />
      <ProductCarosual />
      <HomeBanner />
      <Categories />
      {/* <Plants /> */}
      <Agricultural />
      <Trade />
      <Delevery />
      <Clothing />
      <Contact />
    </>
  );
}
