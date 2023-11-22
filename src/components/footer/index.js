import Images from "../../constants/images";
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer-sm-space" style={{ marginTop: "15rem" }}>
        <div className="main-footer">
          <div
            className="inner-wrapper"
            style={{ width: "90%", margin: "0 auto" }}
          >
            <div className="child-1">
              <div className="footer-contact">
                <div className="brand-logo footerLogo">
                  <Link to="/" className="footer-logo">
                    <img
                      src={Images.Pictures.logo_dark}
                      className="img-fluid lazyload"
                      width={100}
                      height={100}
                      alt="logo"
                    />
                  </Link>
                </div>
                <ul className="contact-lists">
                  <li>
                    <span className="font-dark description">
                    We only Sale natural herbs product.
                    </span>
                  </li>
                  <li>
                    <span className="icon-wraper">
                      <div>Follow Us</div>
                      <span className="light-icon">
                        <FaFacebook /> <FaTwitterSquare /> <FaLinkedin />{" "}
                        <FaInstagramSquare />
                      </span>
                    </span>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>

            <div className="child-2">
              <div className="footer-links">
                <div className="footer-title">
                  <h3 className="fs-3 "> Quick Links</h3>
                </div>
                <div className="footer-content">
                  <ul>
                    <li>
                      <Link to="/" className="font-dark">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories" className="font-dark">
                        All Categories
                      </Link>
                    </li>
                    <li>
                      <Link to="/agricultural-services" className="font-dark">
                        Agricultural Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/medical-mariguana" className="font-dark">
                        Medical Marijuana
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="font-dark">
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="child-3">
              <div className="footer-links">
                <div className="footer-title">
                  <h3 className="fs-3 "> More From Koko Ranch</h3>
                </div>
                <div className="footer-content">
                  <ul>
                    <li>
                      <Link to="/contact" className="font-dark">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/vendor-register" className="font-dark">
                        Join Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq" className="font-dark">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms" className="font-dark">
                        Terms and Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/policy" className="font-dark">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="child-4">
              <div className="footer-links">
                <div className="footer-title">
                  <h3 className="fs-3 "> Let's Talk</h3>
                </div>
                <div className="footer-content">
                  <ul>
                    <li>
                      <div className="d-flex font-dark">
                        <h2 className="fs-2">
                          <FaPhoneAlt />
                        </h2>
                        <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                          Contact Number
                          <br />
                          (123) 456-7890
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex mt-4 font-dark">
                        <h2 className="fs-2">
                          <FaEnvelope />
                        </h2>
                        <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                          Email Address
                          <br />
                          www.kokoranch.com
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex font-dark">
                        <h2 className="fs-2">
                          <FaMapMarkerAlt />
                        </h2>
                        <span className="mx-4" style={{ fontSize: "1.5rem" }}>
                          Address
                          <br />
                          123 street ABC State USA
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-footer">
          <div className="container">
            <div className="row gy-3">
              <div className="col-md-4 col-sm-12">
                <p className="mb-0 font-dark">
                  Copyright ©{" "}
                  <strong style={{ fontWeight: "bold", color: "white" }}>
                    Koko Ranch
                  </strong>{" "}
                  All Rights Reserved. We only Sale natural herbs product.
                </p>
              </div>
              <div
                className="col-md-8 col-sm-12"
                // style={{ textAlign: "right" }}
              >
                <ul className="payment-images">
                  {Images.Pictures.payments.map((element, index) => {
                    return (
                      <li key={index}>
                        <Link to="/">
                          <img
                            src={element}
                            className="img-fluid  lazyload"
                            alt="payment icon"
                            width={31}
                            height={30}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
