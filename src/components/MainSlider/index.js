import { Carousel } from "react-bootstrap";
import Images from "../../constants/images";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { banners } from "../../helpers/headerData";

export default function MainSlider() {
  return (
    <>
      <section className="pt-0 Main-Slider">
        <Carousel fade={true} nextIcon={""} prevIcon={""} style={{ zIndex: 0 }}>
          {banners.map((banner, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={Images.Pictures.banner[index]}
                  alt="Second slide"
                  style={{ width: "100%", height: "45rem" }}
                />

                <Carousel.Caption>
                  <h2 className=" fs-2 text-dark" style={{fontSize: "42px"}} >{banner.Heading}</h2>
                  <p>{banner.text}</p>
                  <Link
                    to={banner.link}
                    className="btn btn-solid btn-solid-primary-rounded py-2 px-5"
                  >
                    {banner.button}
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </section>
    </>
  );
}
