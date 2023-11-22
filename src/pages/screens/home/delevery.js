import Images from "../../../constants/images";

export default function Delevery() {
  return (
    <>
      <div
        className="container delivery-section "
        style={{ margin: "9rem auto" }}
      >
        <div
          className="col-12"
          style={{
            textAlign: "left",
            position: "relative",
          }}
        >
          <img
            src={Images.Pictures.greenRightUpLeaf}
            style={{
              position: "absolute",
              top: "3rem",
              right: "-9rem",
              width: "15rem",
              zIndex: "-1",
            }}
            alt="greenRightUpLeaf"
          ></img>
          <img
            src={Images.Pictures.greenRightUpLeaf}
            style={{
              position: "absolute",
              bottom: "-6rem",
              left: "-9rem",
              width: "15rem",
              zIndex: "-1",
            }}
            alt="greenRightUpLeaf"
          ></img>
          <div className="row">
            <div className="col-8 text-left">
              <h2 className="fs-1">
                Delivery <span className="border-title">Services</span>
              </h2>
            </div>
            <div className="col-4" style={{ textAlign: "right" }}>
              {/* <h4 className="fs-4">
                <span className="border-title mt-2">See all</span>
              </h4> */}
            </div>
          </div>
          <div
            className="row mt-4 delivery-card-container"
            style={{
              textAlign: "left",
            }}
          >
            {Images.Pictures.delevery.map((element, index) => {
              return (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 delivery-card"
                  key={index}
                >
                  <div className="dark-card mt-4">
                    <img
                      src={element}
                      style={{ width: "10.7rem", height: "11.4rem" }}
                      alt=""
                    />
                    <h2
                      className="fs-4"
                      style={{
                        marginTop: 25,
                        marginBottom: 25,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {index === 0
                        ? "Best Pricing"
                        : index === 1
                        ? "100% Organic"
                        : index === 2
                        ? "Exceptional Marketplace"
                        : index === 3
                        ? "Certified Products"
                        : null}
                    </h2>
                    <p
                      className="mt-2 font-dark fs-6"
                      style={{
                        letterSpacing: 1.5,
                        lineHeight: 1.5,
                      }}
                    >
                      {index === 0
                        ? "You can't beat our prices! Come in and see for yourself why we're the best around. Our prices are unbeatable."
                        : index === 1
                        ? "Grown without the use of synthetic pesticides, herbicides, or fertilizers 100% organic products."
                        : index === 2
                        ? "If you're looking to buy or sell your agricultural and natural products. Koko Ranch is the best marketplace."
                        : index === 3
                        ? "Certified agricultural products that are grown and produced in accordance with certain standards."
                        : null}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
