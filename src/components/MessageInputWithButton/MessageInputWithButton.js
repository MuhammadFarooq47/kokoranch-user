import React, { useState } from "react";
import classes from "./MessageInputWithButton.module.css";
import { Input } from "../Input/Input";
// import { Button } from "../Button/Button";
import Button from "../Buttons/Buttons";
import InputClasses from "../Input/input.module.css";
import { FiSend } from "react-icons/fi";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";

export const MessageInputWithButton = ({ state, setter, onClick }) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div className={[classes.relative, classes.passConti_b].join(" ")}>
      <style jsx>{`
        .${InputClasses.inputPassContainer} input::placeholder {
          color: var(--text-color-black) !important;
        }
      `}</style>
      <Input
        placeholder="Message..."
        value={state}
        setter={setter}
        type="text"
        customStyle={{
          borderRadius: "46px",
          background: "#2d2f31",
          height: "64px",
          color:"#0000"
        }}
        inputStyle={{
          border: "none",
          fontSize: "18px",
          padding: "15px 15px 15px 24px",
          fontFamily: "plus-jakarta-display-regular",
          background: "#2D2F31",
        }}
        onKeyDown={(e) =>
          ["Enter", "NumpadEnter"].includes(e.code) && onClick()
        }
      />
      <div className={[classes.sendBtnDiv].join(" ")}>
        <Button
          label={matches && "Sent"}
          customStyle={{
            backgroundColor: "var(--main-color)",
            color: "var(--black-color)",
            width: matches ? "130px" :  "50px",
            height: "50px",
            padding: "0px",
            fontFamily: "plus-jakarta-display-regular",
            fontSize: "18px",
            borderRadius: "30px",
          }}
          onClick={onClick}
        />

        <FiSend 
        style={{
          top: !matches && "16px",
          right: !matches && "17px",
        }}
        
        className={classes.agent} size="20px" />
      </div>
    </div>
  );
};
MessageInputWithButton.propTypes = {
  onClick: PropTypes.func,
};
MessageInputWithButton.defaultProps = {
  onClick: () => console.log(),
};