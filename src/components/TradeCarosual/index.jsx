import TradeCard from "../TradeCard";
import Images from "../../constants/images";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function TradeCarosual() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 997 },
      items: 2,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 997, min: 0 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
  };
  const plant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <>
      <section className="trade-section mt-5 mb-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-8 text-left">
              <h2 className=" fs-2 color-white">
                Similar <span className="border-title"> Trades</span>
              </h2>
            </div>
          </div>
          <Carousel
            className="mx-2"
            infinite={true}
            focusOnSelect={true}
            responsive={responsive}
          >
            {plant.map((element, index) => {
              return (
                <TradeCard key={index} image={Images.Pictures.tradeImage} />
              );
            })}
          </Carousel>
        </div>
      </section>
    </>
  );
}
