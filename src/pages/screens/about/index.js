import Images from "../../../constants/images";

export default function About() {
  return (
    <>
      <div
        className="container mt-5 about-wrapper"
        style={{ position: "relative" }}
      >
        <img
          src={Images.Pictures.brownLeftLeaf}
          style={{
            position: "absolute",
            top: "-7rem",
            right: "0",
            width: "66rem",
            zIndex: "1",
          }}
          alt="brownLeftLeaf"
        ></img>
        <div
          className="row dark-card px-5"
          style={{
            textAlign: "left",
          }}
        >
          <div className="col-lg-4 col-md-6 col-sm-12 px-5">
            <img
              src={Images.Pictures.logo}
              className="img-fluid lazyload"
              width={300}
              height={300}
              alt="logo"
            />
          </div>
          <div
            className="col-lg-8 col-md-12 col-sm-12 px-5  mt-5 mt-md-5  mt-sm-5"
            style={{
              textAlign: "left",
            }}
          >
            <h2 className=" fs-2 theme-color">ABOUT KOKO RANCH</h2>
            <p className="mt-3" style={{ lineHeight: 1.7 }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.Lrem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd.
            </p>
          </div>
          <div className="row mt-5">
            <div
              className="col-lg-4 col-md-12 col-sm-12 mt-md-4"
              style={{ zIndex: "2" }}
            >
              <div className="about-card">
                <h2 className="fs-2">
                  Our <span className="border-title">Mission</span>
                </h2>
                <p className="mt-2 card-text">
                  To provide a unique platform for commerce of agricultural
                  products and services
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-12 col-sm-12 mt-md-4"
              style={{ zIndex: "2" }}
            >
              <div className="about-card">
                <h2 className="fs-2">
                  Our <span className="border-title">Vision</span>
                </h2>
                <p className="mt-2 card-text">
                  The platform we envision provides the individual or company
                  the ability to find agricultural products and services locally
                  and globally enabling commerce expansion
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-12 col-sm-12 mt-md-4"
              style={{ zIndex: "2" }}
            >
              <div className="about-card">
                <h2 className="fs-2">
                  Our <span className="border-title">Value</span>
                </h2>
                <p className="mt-2 card-text">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row dark-card  mt-5"
          style={{
            textAlign: "left",
            paddingLeft: "7rem",
            position: "relative",
          }}
        >
          <img
            src={Images.Pictures.brownLeftLeaf}
            style={{
              position: "absolute",
              top: "33%",
              left: "-10rem",
              width: "66rem",
              zIndex: "1",
            }}
            alt="brownLeftLeaf"
          ></img>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-md-4 about-panel">
            <div className="about-text">
              <h2 className=" fs-2 theme-color">OPPORTUNITIES AT KOKO RANCH</h2>
              <p className="mt-3">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.Lrem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd.
              </p>
              <h2 className=" fs-2 mt-5">
                Buy <span className="border-title">Products</span>
              </h2>
              <p className="mt-3 lh-lg">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.Lrem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd.
              </p>

              <h2 className=" fs-2 mt-5">
                Sale <span className="border-title">Products</span>
              </h2>
              <p className="mt-3 lh-lg">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.Lrem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd.
              </p>

              <h2 className=" fs-2 mt-5">
                Offer <span className="border-title">Services</span>
              </h2>
              <p className="mt-3 lh-lg">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.Lrem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd.
              </p>

              <h2 className=" fs-2 mt-5">
                Trade <span className="border-title">Products</span>
              </h2>
              <p className="mt-3 lh-lg">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.Lrem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
