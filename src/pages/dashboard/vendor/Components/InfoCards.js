import React, { useState } from "react";
import InfoCard from "./InfoCard";
import { ReactComponent as FilterIcon } from "../../../../assets/images/icons/filter-icon.svg";
import FilterProp from "./FilterProp";

const InfoCards = ({
  data,
  activeCard,
  setActiveCard,
  featured1,
  sortData,
  setSortData,
}) => {
  const [showFilterProp, setShowFilterProp] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <FilterIcon
            width={20}
            onClick={() => setShowFilterProp(!showFilterProp)}
          />
        </div>
        {/* <div className="infocard-container col-12 col-sm-4 col-md-4 col-lg-4"> */}
        <div className="col-11">
          <div className="row">
            {data.map((data, index) => {
              return activeCard === data.topText ? (
                <div
                  key={index}
                  className="col-6 col-sm-4 col-md-2 col-lg-2 mt-2  "
                >
                  <InfoCard
                    topText={data.topText}
                    bottomText={data.bottomText}
                    active
                    setActiveCard={setActiveCard}
                  />
                </div>
              ) : (
                <div
                  key={index}
                  className="col-6 col-sm-4 col-md-2 col-lg-2 mt-2 "
                >
                  <InfoCard
                    topText={data.topText}
                    bottomText={data.bottomText}
                    setActiveCard={setActiveCard}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showFilterProp && (
        <FilterProp
          featured1={featured1}
          sortData={sortData}
          setSortData={setSortData}
        />
      )}
    </>
  );
};

export default InfoCards;
