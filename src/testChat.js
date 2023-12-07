import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MessageInputWithButton } from "../../Components/MessageInputWithButton/MessageInputWithButton";
import classes from "./ChatDesktop.module.css";
import { BiMessageDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { fallbackUser, imageUrl } from "../../config/apiUrl";
import moment from "moment";
import NoDataComp from "../../Components/NoDataComp/NoDataComp";
import Loader from "../../Components/NoDataComp/NoDataComp";
import Header from "../../Components/Header";
import Button from "../../Components/Buttons/Buttons";
import Tooltip from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";

export const ChatRoomBox = ({ data, state, setter, index, setRoomsData }) => {
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
    agentContract,
  } = props;
  const [searchText, setSearchText] = useState("");
  const userData = useSelector((state) => state?.authReducer?.user);
  const [message, setMessage] = useState("");
  const check = totalRecords?.length / 5;

  return (
    <div className={classes.chatPage}>
      <Header />
      {/* <AfterLoginHeader
        backgroundColor={"var(--white-color)"}
        containerClass={classes.container}
        className={classes.header}
      /> */}
      {/* SearchBox */}
      {/* <section className={classes.searchBoxSection}>
        <Container className={classes.container}>
          <Row>
            <Col md={6}>
              <InputWithSearch
                setValue={setSearchText}
                value={searchText}
                onSearch={onSearchClick}
              />
            </Col>
          </Row>
        </Container>
      </section> */}
      {/* Chat Section */}
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
                        {[
                          selectedRoom?.user1?.role,
                          selectedRoom?.user2?.role,
                        ].every((item) => item == "agent") &&
                          agentContract && (
                            <>
                              <div className={classes.btn_div}>
                                <Tooltip
                                  style={{ marginRight: "20px" }}
                                  placement="left"
                                  title={
                                    <>
                                      <p>
                                        <Link
                                          style={{
                                            color: "#000",
                                          }}
                                          to={`/property-detail/${selectedRoom?.property}/${selectedRoom?.user1?._id}`}
                                        >
                                          Click To See Property
                                        </Link>
                                      </p>
                                    </>
                                  }
                                >
                                  <div>{<ErrorOutlineIcon />}</div>
                                </Tooltip>
                                <Button
                                  style={{ marginRight: "20px" }}
                                  disabled={
                                    selectedRoom?.agreementStatus != "not-sent"
                                  }
                                  label={"Send Agreement"}
                                  className={classes.sendAgreementBtn}
                                  onClick={() => setAgreementModal(true)}
                                />
                              </div>
                            </>
                          )}
                        {messages?.map((item, i) => {
                          return (
                            <>
                              {
                                // For Company Messages
                                (
                                  userData?.role == "brokerage"
                                    ? item?.user?._id !==
                                      selectedRoom?.user2?._id // user1 msg (agent or sp)
                                    : item?.user?._id !== userData?._id
                                ) ? (
                                  <div className={[classes.mb32].join(" ")}>
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
                                          src={item?.user?.avatar}
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
                                        "DD MMM YYYY hh:mm"
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
                                          src={item?.user?.avatar}
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
                                        "DD MMM YYYY hh:mm"
                                      )}
                                    </p>
                                  </div>
                                )
                              }
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
                    {userData?.role !== "brokerage" && (
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
                  </div>
                ) : (
                  <>
                    <div className={[classes.noRoomSelected].join(" ")}>
                      <div className={[classes.noRoomInnerSelected].join(" ")}>
                        <div>
                          <BiMessageDetail
                            size={100}
                            color={"var(--darkblue-button)"}
                          />
                        </div>
                        <h3>Welcome To Chat</h3>
                      </div>
                    </div>
                  </>
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