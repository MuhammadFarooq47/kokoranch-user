import React from "react";

const FilterProp = (props) => {
  return (
    <div>
      <div
        className={
          props.featured
            ? "filter-prop"
            : props.featured1
            ? "filter-prop1"
            : "filter-prop2"
        }
      >
        <p
          className="cursor-pointer"
          onClick={() => {
            props.setSortData && props.setSortData("asc");
          }}
        >
          New To Old
        </p>
        <p
          className="cursor-pointer"
          onClick={() => {
            props.setSortData && props.setSortData("dec");
          }}
        >
          Old To New
        </p>
        {!props.featured && (
          <>
            <p
              className="cursor-pointer"
              onClick={() => {
                props.setSortData && props.setSortData("high");
                console.log("click Price Low To High ");
              }}
            >
              Price Low To High
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                props.setSortData && props.setSortData("low");
                console.log("click Price High To Low ");
              }}
            >
              Price High To Low
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterProp;
