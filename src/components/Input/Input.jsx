import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./input.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AiFillCloseCircle } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import { info_icon } from "../Constant/imagePath";
import { numberRegEx } from "../../config/apiUrl";

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  type,
  label,
  value,
  setter,
  noBorder,
  placeholder = "Enter here...",
  disabled,
  customStyle,
  inputStyle,
  labelStyle,
  error,
  errorText,
  label2,
  leftIcon,
  deleteIcon,
  handleDelete,
  small,
  maxLength,
  variant, //default white
  regexType, // number
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);
  let inputContainerStyleObject = Object.assign(
    {},
    error && { border: `1px solid red ` },
    leftIcon && { paddingLeft: "50px" }
  );
  return (
    <>
      <div className={`${[classes.Container].join(" ")}`}>
        <div>
          {label && (
            <label
              htmlFor={`input${label}`}
              className={`mb-2  ${[
                classes.labelText,
                disabled && classes.disabled,
              ].join(" ")}`}
              style={{ ...labelStyle }}
            >
              {label} {label2 && label2}
            </label>
          )}
          {small && (
            <Tooltip
              style={{ marginLeft: "20px" }}
              title="Please Enter Exact Amount In Dollars"
              placement="right-start"
            >
              <img src={info_icon} />
            </Tooltip>
          )}
        </div>
        <div
          className={`${[classes.inputPassContainer].join(" ")} ${
            variant === "black" && classes?.blackVariantContainer
          }`}
          style={{ ...customStyle }}
        >
          {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
          <input
            maxLength={maxLength}
            value={value}
            onChange={(e) => {
              if (regexType === "number" || type == "number") {
                setter(e?.target?.value?.replace(numberRegEx, ""));
              } else {
                setter(e.target.value);
              }
            }}
            disabled={disabled}
            placeholder={placeholder}
            type={passToggle == true ? "text" : type}
            id={`input${label}`}
            className={` ${[
              classes.inputBox,
              noBorder && classes.noBorder,
            ].join(" ")}`}
            style={{ ...inputContainerStyleObject, ...inputStyle }}
            {...props}
          />
          {type == "password" && passToggle == false && (
            <VisibilityOffIcon
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
          {type == "password" && passToggle && (
            <VisibilityIcon
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
          {deleteIcon && (
            <AiFillCloseCircle
              className={classes?.deleteIcon}
              onClick={handleDelete}
            />
          )}
        </div>
        {error && (
          <p className={`mt-2 ${[classes.errorText].join(" ")}`}>{errorText}</p>
        )}
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setter: PropTypes.func,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  label2: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "enter text",
  value: "",
  noBorder: false,
  disabled: false,
  error: false,
  errorText: "An error has occurred, check your details!",
};