// import React from "react";
// import styles from "./Buttons.module.css";
// const Buttons = ({ text, width }) => {
//   return (
//     <>
//       <button style={{ width: width }} className={styles.button__main}>
//         {text}
//       </button>
//     </>
//   );
// };

// export default Buttons;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./Buttons.module.css";

const Buttons = ({
  backgroundColor,
  type,
  size,
  label,
  customStyle,
  onClick,
  disabled,
  className,
  isGradiant,
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        className={`${[
          classes.btn,
          classes[`btn${size}`],
          isGradiant && classes.gradiant,
        ].join(" ")} ${className && className}`}
        style={{
          background: backgroundColor,
          ...customStyle,
        }}
        onClick={onClick}
        disabled={disabled ? disabled : false}
        {...props}
      >
        {label && label}
      </button>
    </>
  );
};

Buttons.propTypes = {
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["Small", "Medium", "Large"]),
  label: PropTypes.string.isRequired,
  customStyle: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Buttons.defaultProps = {
  backgroundColor: null,
  size: "Medium",
  onClick: undefined,
  customStyle: {},
};

export default Buttons;
