import Images from "../../../constants/images";
import PlantJewelleryCarosual from "../../../components/PlantJewelleryCarosual";
import TshirtsCarosual from "../../../components/TshirtsCarosual";
import PlantCarosual from "../../../components/PlantCarosual";

export default function Clothing() {
  return (
    <>
      <div
        className="container-fluid mt-5 d-flex justify-content-center py-5"
        style={{
          background: `url(${Images.Pictures.clothing})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 400,
        }}
      >
        <div className="col-6 d-flex justify-content-center align-items-center">
          <div
            className="dark-card"
            style={{
              background: " rgba(51, 53, 52, 0.4) 0% 0% no-repeat padding-box",
              padding: "5rem",
            }}
          >
            <h1
              className=""
              style={{
                fontSize: "5rem",
                textShadow: "0px 3px 2px rgba(0,0,0,0.6)",
              }}
            >
              Arts & Clothing
            </h1>
            <h5
              className="fs-5 py-2 mx-auto"
              style={{ width: "33rem", textAlign: "center" }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </h5>
          </div>
        </div>
      </div>
      <TshirtsCarosual />
      <PlantJewelleryCarosual />
      <PlantCarosual />

      <div
        className="container-fluid mt-5 d-flex justify-content-center py-5"
        style={{
          background: `url(${Images.Pictures.ads})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 400,
        }}
      >
        <div className="col-12 text-center">
          <h1 className="text-light fs-1">Post Your Ad Here...</h1>
        </div>
      </div>
    </>
  );
}
