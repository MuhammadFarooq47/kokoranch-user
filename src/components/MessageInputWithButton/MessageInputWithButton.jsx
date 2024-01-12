import React, { useState } from "react";
import classes from "./MessageInputWithButton.module.css";
import { Input } from "../Input/Input";
// import { Button } from "../Button/Button";
import Button from "../Buttons/Buttons";
import InputClasses from "../Input/input.module.css";
import { FiSend } from "react-icons/fi";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import Picker from 'emoji-picker-react'
import { BsEmojiSmileFill } from "react-icons/bs";

export const MessageInputWithButton = ({ state, setter, onClick }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e, emoji) => {

    let message = state;
    message += emoji.emoji;
    setter(message);
  }

  return (
    <div className={[classes.relative, classes.passConti_b].join(" ")}>
      <style jsx>{`
        .${InputClasses.inputPassContainer} input::placeholder {
          color: var(--text-color-black) !important;
        }
      `}</style>
      
      {/* <BsEmojiSmileFill size={20} color="#14a384" onClick={() => alert("hello")} /> */}
      <Input
        autofocus={'true'}
        placeholder="Message..."
        value={state}
        setter={setter}
        type="text"
        customStyle={{
          borderRadius: "50px",
          background: "#2d2f31",
          height: "50px",
          color: "#0000"
        }}
        inputStyle={{
          border: "none",
          fontSize: "18px",
          padding: "15px 15px 15px 24px",
          fontFamily: "Poppins, sans-serif",
          background: "#2D2F31",
        }}
        onKeyDown={(e) =>
          ["Enter", "NumpadEnter"].includes(e.code) && onClick()
        }
        
      />
      <div className={[classes.sendBtnDiv].join(" ")}>
        {/* <Button
          label={matches && "Sent"}
          customStyle={{
            backgroundColor: "var(--main-color)",
            color: "var(--black-color)",
            width: matches ? "130px" :  "50px",
            height: "50px",
            padding: "0px",
            fontFamily: "Poppins, sans-serif",
            fontSize: "18px",
            borderRadius: "30px",
          }}
          onClick={onClick}
        /> */}
        {/* <BsEmojiSmileFill
          style={{
            top: !matches && "20px",
            right: !matches && "17px",
            marginRight: "35px"
          }}
          onClick={handleEmojiPickerHideShow}
          className={classes.agent} size="25px" color="#14a384" />
          { showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/> } */}

        <FiSend
          style={{
            top: !matches && "20px",
            right: !matches && "17px",
            marginLeft: "10px",
          }}
          onClick={onClick}
          className={classes.agent} size="25px" color="#14a384" />
        {/* <BsEmojiSmileFill size={20} color="#14a384" onClick={() => alert("hello")} /> */}
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