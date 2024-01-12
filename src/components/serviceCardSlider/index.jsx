import ServiceCard from "../serviceCard";
import Images from "../../constants/images";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Slider({
  title1 = "Featured",
title2 = "Products",
showTitle = true,
marginTop = "7rem",}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 0, // this is needed to tell the amount of px that should be visible.
    },
  };
  const plant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <>
      <section className="service-section">
        <div className="container">
          {showTitle && <div className="row mb-5">
            <div className="col-8 text-left">
              <h2 className="fs-2">
                Featured <span className="border-title">Products</span>
              </h2>
            </div>
            <div className="col-4" style={{ textAlign: "right" }}>
              <h4 className="fs-4">
                <span className="border-title mt-2">See all</span>
              </h4>
            </div>
          </div>}
          <Carousel
            className="mx-2"
            infinite={true}
            focusOnSelect={true}
            responsive={responsive}
          >
            {plant.map((element, index) => {
              return (
                <ServiceCard key={index} image={Images.Pictures.service[0]} />
              );
            })}
          </Carousel>
        </div>
      </section>
    </>
  );
}
