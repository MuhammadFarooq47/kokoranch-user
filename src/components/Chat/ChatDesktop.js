

import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MessageInputWithButton } from "../../components/MessageInputWithButton/MessageInputWithButton";
import classes from "./ChatDesktop.module.css";
import { BiMessageDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { fallbackUser, imageUrl } from "../../config/apiUrl";
import moment from "moment";
import NoDataComp from "../../components/NoDataComp/NoDataComp";
import Loader from "../../components/NoDataComp/NoDataComp";
// import Header from "../header/index";
import Button from "../../components/Buttons/Buttons";
import Tooltip from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import Robot from "../../assets/images/robot.gif";

export const ChatRoomBox = ({ data, state, setter, index, setRoomsData }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const role = useSelector((item) => item?.authReducer?.user?.role);
  const isVendorOrTraderOrAdmin = role == "trader" || role == "vendor" || role == "admin"; // User1
  const userData = useSelector((state) => state.authReducer?.user);

  const chatRoomBoxPhoto =
    data?.user1?._id == userData?._id ? data?.user2?.photo : data?.user1?.photo;
  const chatRoomBoxFullName =
    data?.user1?._id == userData?._id
      ? data?.user2?.firstName
      : data?.user1?.firstName;
  // console.log(data,"data  vdatadata data")

  return (
    <div
      className={`${[
        classes.chatRoomBox,
        state?._id == data?._id && classes.selectedRoom,
      ].join(" ")}`}
      onClick={() => {
        setRoomsData((prev) => {
          const updatedRoomLastMessage = prev.map((item) => {
            if (item?._id == data?._id) {
              console.log(item, "2333333333");
              return {
                ...item,
                user1UnreadCount: 0,
                user2UnreadCount: 0,
              };
            }
            return item;
          });

          return updatedRoomLastMessage;
        });

        setter(data);
      }}
      style={{
        borderTopLeftRadius: index === 0 ? "20px" : "20px",
        borderTopRightRadius: index === 0 ? "20px" : "20px",
        // backgroundColor:
        //   userData?._id == data?.user1?._id && data?.user1UnreadCount > 0
        //     ? "#fff"
        //     : userData?._id == data?.user2?._id &&
        //     data?.user2UnreadCount > 0 &&
        //     "#383838",
      }}
    >
      <div className={[classes.SideRoomDiv]}>
        <div>
          <img
            src={imageUrl(chatRoomBoxPhoto)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackUser;
            }}
          />
        </div>
        <div className={[classes.SideRoomInnerDiv]}>
          <div className={classes.nameAndMsg}>
            <h6 style={{ color: "#fff", fontSize: "14px !important" }}>{`${chatRoomBoxFullName}`}</h6>
            <p className="maxLine1">
              {data?.lastMessage !== null
                ? data?.lastMessage?.text
                : "You haven't chat with this user"}
            </p>
            <div className={classes.timeAndCount}>
            <p>{moment(data?.updatedAt).format("hh:mm a")}</p>
          </div>
          </div>
          <div className="recipient-item_right">
           <FaEllipsisV
             className="dropown-dots"
             onClick={() => setShowDeleteButton(current => !current)}
           />
           {showDeleteButton && <button style={{ backgroundColor: "#383838",  color: '#f61616', padding: '0.5rem 1rem',  borderRadius: '1rem', border: "none", fontSize: "10px", marginLeft: "-25px", marginTop: "5px"}}>Delete</button>}
         </div>
        </div>
      </div>
    </div>
  );
};

const ChatDesktop = (props) => {
  const {
    onSearchClick,
    roomsData,
    selectedRoom,
    setSelectedRoom,
    setRoomsData,
    HandleLoadMoreMsg,
    messages,
    sendMsg,
    isLoadingChats,
    isLoadingRooms,
    totalRecords,
    limit,
    page,
    setAgreementModal,
  } = props;
  const [searchText, setSearchText] = useState("");
  const userData = useSelector((state) => state?.authReducer?.user);
  const [message, setMessage] = useState("");
  const check = totalRecords?.length / 5;

  return (
    <div className={classes.chatPage}>
      <section className={classes.chatSection}>
        <Container className={classes.container}>
          <Row>
            <Col md={4} xl={3}>
              <div className={classes.chatRooms}>
                {!isLoadingRooms && roomsData?.length == 0 && (
                  <div className={classes.noDataContainer}>
                    <NoDataComp
                      title={"No Rooms Found"}
                      className={classes.noData}
                    />
                  </div>
                )}

                {isLoadingRooms ? (
                  <Loader className={classes.loader} />
                ) : (
                  roomsData?.length > 0 &&
                  roomsData?.map((item, i) => {
                    return (
                      <ChatRoomBox
                        setRoomsData={setRoomsData}
                        data={item}
                        state={selectedRoom}
                        setter={setSelectedRoom}
                        index={i}
                      />
                    );
                  })
                )}
              </div>
            </Col>
            <Col md={8} xl={9}>
              <div className={classes.inbox}>
                {selectedRoom !== null ? (
                  <div className={classes.chattingDiv}>
                    {isLoadingChats ? (
                      <Loader className={classes.loader} />
                    ) : (
                      <>
                       
                        {[...messages].reverse()?.map((item, i) => {
                          console.log("🚀 ~ file: ChatDesktop.js:162 ~ {messages[selectedRoom?._id]?.map ~ item:", item)
                          return (
                            <>
                              {
                                // For Company Messages
                                (
                                  userData?.role === "vendor" || userData?.role === "trader" || userData?.role === "admin" 
                                    ? item?.user?._id !==
                                    selectedRoom?.user2?._id // user1 msg (agent or sp)
                                    : item?.user?._id !== userData?._id
                                ) ? (
                                  <div>
                                    <div
                                      className={[
                                        classes.roomMessageMainDiv,
                                      ].join(" ")}
                                    >
                                      <div
                                        className={[
                                          classes.roomMessageimgDiv,
                                        ].join(" ")}
                                      >
                                        <img
                                          src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${item?.user?.avatar}`}
                                          alt="..."
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallbackUser;
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <p
                                          className={[classes.roomMessage].join(
                                            " "
                                          )}
                                        >
                                          {item?.text}
                                        </p>
                                      </div>
                                    </div>

                                    <p className={[classes.time]}>
                                      {moment(item?.createdAt).format(
                                        "DD MMM hh:mm a"
                                      )}
                                    </p>
                                  </div>
                                ) : (
                                  <div className={[classes.mb32].join(" ")}>
                                    <div
                                      className={[
                                        classes.roomMessageRightMainDiv,
                                      ].join(" ")}
                                    >
                                      <div
                                        className={[
                                          classes.roomMessageimgDiv,
                                        ].join(" ")}
                                      >
                                        <img
                                          src={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${item?.user?.avatar}`}
                                          alt="..."
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallbackUser;
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <p
                                          className={[
                                            classes.roomRightMessage,
                                          ].join(" ")}
                                        >
                                          {item?.text}
                                        </p>
                                      </div>
                                    </div>

                                    <p className={[classes.rightime]}>
                                      {moment(item?.createdAt).format(
                                        "DD MMM hh:mm a"
                                      )}
                                    </p>
                                  </div>
                                )
                              }
                               <div className={[classes.sendBtnDiv]}>
                                <MessageInputWithButton
                                  state={message}
                                  setter={setMessage}
                                  onClick={() => {
                                    sendMsg(message);
                                    setMessage("");
                                  }}
                                />
                              </div>
                            </>
                          );
                        })}
                        {totalRecords?.length > limit && (
                          <div className={classes.loadMore_btn_main}>
                            <button
                              className={classes.loadMore_btn}
                              onClick={HandleLoadMoreMsg}
                            >
                              Load more
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {userData?.role == "vendor" || userData?.role == "trader" || userData?.role == "admin" && (
                      <div className={[classes.sendBtnDiv]}>
                        <MessageInputWithButton
                          state={message}
                          setter={setMessage}
                          onClick={() => {
                            sendMsg(message);
                            setMessage("");
                          }}
                        />
                      </div>
                    )}
                    {/* <div className={[classes.sendBtnDiv]}>
                        <MessageInputWithButton
                          state={message}
                          setter={setMessage}
                          onClick={() => {
                            sendMsg(message);
                            setMessage("");
                          }}
                        />
                      </div> */}
                  </div>
                )
                  : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "white"}}>
                        <img src={Robot} alt="welcome" style={{height: '30rem'}} />
        <h2>
            Welcome, <span style={{color: "#14a384", textTransform: "capitalize"}}> {userData?.firstName} !</span>
            {/* {currentUser.username} */}
        </h2>
        <h3>Please select a chat to start Messaging.</h3>
                    </div>
                    // <div className={[classes.sendBtnDiv]}>
                    //     <MessageInputWithButton
                    //       state={message}
                    //       setter={setMessage}
                    //       onClick={() => {
                    //         sendMsg(message);
                    //         setMessage("");
                    //       }}
                    //     />
                    //   </div>

                  )}

              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ChatDesktop;