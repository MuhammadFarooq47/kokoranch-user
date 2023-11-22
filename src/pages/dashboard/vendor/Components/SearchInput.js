import React from "react";
import { FaSearch } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import ReactTooltip from "react-tooltip";

const SearchInput = () => {
  return (
    <div>
      <div className="ven-so-s">
        <input
          placeholder="You can search orders by User Id and Order No"
          type="text"
        />
        <span className="ven-so-icon">
          <FaSearch />
        </span>
        <span data-tip data-for="search-info">
          <ReactTooltip
            id="search-info"
            place="bottom"
            backgroundColor="#14a384"
          >
            Tooltip for the register button
          </ReactTooltip>
          <BiInfoCircle size={25} color="#14a384" style={{ marginLeft: 10 }} />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
