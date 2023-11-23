import Images from "../../../constants/images";
import { Link } from "react-router-dom";
import TradeCard from "../../../components/TradeCard";
import { useEffect, useState } from "react";
// import { GET_All_TRADES } from "../../../redux/actions/trades";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Trade() {
  const dispatch = useDispatch();
//   const { trades } = useSelector((state) => state.TradesReducers);
// console.log("trades", trades)

let [traderTrades, setTraderTrades] = useState();
console.log("Trader Trades", traderTrades)

useEffect( async () => {
  try {
    const response = await axios.get("https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/trades/my-trades", {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    setTraderTrades(response?.data);
    // navigate(-1)
    // console.log("Response from trade get request", response?.data)
  } catch (error) {
    console.log("Error from trade get request", error)
  }
    }, [])
  // useEffect(() => {
  //   dispatch(GET_All_TRADES());
  // }, []);
  return (
    <>
      <section
        className="trade-section trade-background "
        style={{ background: `url(${Images.Pictures.trade})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-left">
              <h2 className="fs-1">
                Trade <span className="border-title"> Products Or Plants</span>
              </h2>
              <p className="mt-3 fs-4">
                Koko Ranch is an agricultural product marketplace. We offer
                products that are derived from natural renewable resources,
                plants or animals, or other agricultural processes. Our products
                have a natural resource (water, air, Earthen products), plant or
                animal beginning. We are a marketplace that is dedicated to
                providing the highest quality agricultural products possible.
              </p>
              <Link
                to="/vendor-register"
                className="btn btn-solid btn-solid-primary-rounded px-5  fs-5"
                style={{
                  width: "20rem",
                }}
              >
                Become a Trader
              </Link>
            </div>
          </div>
          <div className="row mt-5">
            {traderTrades?.data?.slice(0, 4).map((element, index) => {
              return (
                <div className="col-lg-6 col-md-6  col-sm-12" key={index}>
                  <TradeCard props={element} image={element?.images[0]} />
                </div>
              );
            })}
            <div className="col-12  text-center my-3">
              <Link
                to="/trades"
                className="btn btn-solid btn-solid-primary-rounded px-5 py-3 mx-auto fs-5"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
