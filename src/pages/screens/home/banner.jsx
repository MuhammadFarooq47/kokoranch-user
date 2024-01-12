import { Link } from "react-router-dom";
import Images from "../../../constants/images";

export default function HomeBanner() {
  return (
    <>
      <section className="about-section">
        <div className="container home-banner ">
          <div className="home-banner_left">
            <img
              src={Images.Pictures.homeBanner[0]}
              className=" blur-up lazyloaded"
              alt="home banner"
            />
          </div>
          <div className="home-banner_right">
            <h2 className=" fs-2 theme-color  ">INFORMATION</h2>
            <h1 className="mt-3 fs-1">
              About Koko Ranch{" "}
              <img src={Images.Pictures.verified} alt="verified"></img>
            </h1>
            <p
              className="mt-4  "
              style={{
                letterSpacing: 2,
                lineHeight: 1.3,
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
            </p>
            <Link
              to="/about"
              className="btn btn-solid btn-solid-primary-rounded py-3 px-5 mt-5"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
