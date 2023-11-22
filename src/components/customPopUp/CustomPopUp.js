import React from "react";
import "./PopUp.css";
import Modal from "@mui/material/Modal";
import {MdOutlineCancel} from "react-icons/md";
import { Grid } from "@mui/material";
import { AiTwotoneStar } from "react-icons/ai";
import { useState } from "react";

const PopUp = ({
  forgot,
  open,
  setOpen,
  onClick,
  passwordChanged,
  navigate,
  rating,
}) => {
  const [ratingData, setRatingData] = useState([
    {
      title: "John",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitasanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam no",
    },
    {
      title: "John",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitasanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam no",
    },
    {
      title: "John",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitasanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam no",
    },
    {
      title: "John",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clitasanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam no",
    },
  ]);
  const handleClose = () => {
    setOpen(false);
    passwordChanged && navigate("/");
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid
            item
            p={2}
            lg={rating ? 8 : 3}
            sm={rating ? 10 : 4}
            md={rating ? 10 : 4}
            xs={rating ? 10 : 8}
            xl={rating ? 8 : 3}
            direction="column"
            alignItems="center"
            sx={{
              display: "flex",
              minHeight: "300px",
              height: rating ? "90vh" : "300px",
              backgroundColor: "#1E1E1E",
              border: passwordChanged ? "0.5px solid #14A384" : "none",
              borderRadius: 5,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
                padding: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "100%",
                }}
              >
                <MdOutlineCancel
                  style={{
                    color: "#A3A3A3",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px",
                  height: "90%",
                  padding: 0,
                }}
              >
                {rating && (
                  <>
                    {/* // Title */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2 style={{ fontWeight: "normal" }}>
                        {" "}
                        New Unread Reviews: 2
                      </h2>
                      <button
                        className="btn btn-solid"
                        style={{
                          backgroundColor: "#4180FE",
                          borderRadius: "5px",
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          console.log("press");
                        }}
                      >
                        View Product/Service Page
                      </button>
                    </div>
                    <hr
                      //  className="hr-rule"
                      style={{
                        // border: 0,
                        // clear:'both',
                        // display:'block',
                        width: "100%",
                        backgroundColor: "#707070",
                        height: "1px",
                      }}
                    />
                    {/* // Ratings Body */}
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        overflowY: "scroll",
                      }}
                      className="ratingPopup"
                    >
                      {ratingData.map((item) => (
                        <div
                          style={{
                            height: "40vh",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <h3>{item.title}</h3>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                <AiTwotoneStar size={20} fill={"#14A384"} />
                                <AiTwotoneStar size={20} fill={"#14A384"} />
                                <AiTwotoneStar size={20} fill={"#14A384"} />
                                <AiTwotoneStar size={20} />
                                <AiTwotoneStar size={20} />
                              </div>
                            </div>
                            {/* <label
                              style={{
                                color: "#E4201E",
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                            >
                              <u>Delete</u>
                            </label> */}
                          </div>
                          <span style={{ fontSize: "12px", color: "#707070" }}>
                            {item.body}{" "}
                          </span>
                          <span style={{ fontSize: "12px" }}>{item.desc}</span>
                          <label
                            style={{
                              color: "#4180FE",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                          >
                            Reply
                          </label>
                          <hr
                            style={{
                              width: "100%",
                              backgroundColor: "#707070",
                              height: "1px",
                              marginBottom: "10px",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default PopUp;
