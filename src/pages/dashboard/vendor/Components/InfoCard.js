import React from "react";

const InfoCard = ({
  topText = "Top Text",
  bottomText = "22",
  active,
  setActiveCard,
}) => {
  return (
    <div
      className={`vendor-infocard ${active && "border-primary"}`}
      // style={{ width: "fit-content" }}
      onClick={() => {
        // console.log(active, topText);
        return !active ? setActiveCard(topText) : null;
      }}
    >
      <h5>{topText}</h5>
      <div className="infocard-divider"></div>
      <h3>{bottomText}</h3>
    </div>
  );
};

export default InfoCard;
