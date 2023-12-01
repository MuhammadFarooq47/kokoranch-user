import React, { useEffect, useRef, useState } from "react";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import ChatDesktop from "./ChatDesktop";
import ChatMobile from "./ChatMobile";
import moment from "moment";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { apiHeader, apiUrl, BaseURL, imageUrl } from "../../config/apiUrl";
import { Get, Post } from "../../Axios/AxiosFunctions";
import { useLocation } from "react-router-dom";
import AgreementModal from "../../Components/AgreementModal";

const Chat = () => {
  const [isMobile, setIsMobile] = useState(false);
  const userId = useSelector((state) => state.authReducer?.user?._id);
  const userData = useSelector((state) => state.authReducer?.user);
  const role = useSelector((state) => state.authReducer?.user?.role);
  const token = useSelector((state) => state.authReducer?.access_token);
  const isAgentOrSp = role == "service-provider" || role == "agent"; // User1

  const roomFromLocation = useLocation()?.state?.room;

  // agreement loader
  const [agreementLoader, setAgreementLoader] = useState(false);

  const agentIdSet = useLocation()?.state;
  // Loading Room And Chats
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(false);

  const socket = useRef(null);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  // console.log(messages, "messages messages messages");
  // console.log(selectedRoom, "selectedRoom selectedRoom selectedRoom");
  const [totalRecords, setTotalRecords] = useState([]);

  const [agreementModal, setAgreementModal] = useState(false);

  const [page, setPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    if (roomFromLocation) {
      setSelectedRoom(roomFromLocation);
    }
  }, []);
  // to scroll top up when page refreshed
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

//   console.log(
//     [selectedRoom?.user1?.role, selectedRoom?.user2?.role].every(
//       (item) => item == "agent"
//     )
//   );

  async function sendMessage(msg) {
    const isEmpty = (msg) => !msg.trim().length;
    if (isEmpty(msg)) {
      return;
    }
    const data = {
      text: msg,
      user: {
        _id: userId,
        name: userData?.fullName,
        avatar: imageUrl(userData?.photo),
      },
      _id: Math.ceil(Math.random() * 10),
      createdAt: moment().format(),
    };
    setMessages((prev) => [data, ...messages]);

    setRoomsData((prev) => {
      const updatedRoomLastMessage = prev.map((item) => {
        if (item?._id == selectedRoom?._id) {
          return { ...item, lastMessage: data, updatedAt: Date.now() };
        }
        return item;
      });

      return updatedRoomLastMessage;
    });

    // setRoomsData((prev) => {
    //   return [...prev, {...prev[0], lastMessage: data}];
    // });

    delete data?._id;
    delete data?.createdAt;

    socket.current.emit(
      "msg",
      data,
      selectedRoom?.user1?._id == userData?._id
        ? selectedRoom?.user2?._id
        : selectedRoom?.user1?._id,
      selectedRoom?._id,
      userData?.role
    );
    // console.log(isAgentOrSp, "isAgentOrSp");
    // console.log(selectedRoom?.user1?._id, "user1");
    // console.log(selectedRoom?.user2?._id, "user2");
    // console.log(userData?._id, "USER ID MY");
    // console.log(
    //   selectedRoom?.user1?._id == userData?._id
    //     ? selectedRoom?.user2?._id
    //     : selectedRoom?.user1?._id,
    //   "Sending Tooo...."
    // );

    // send a message to the server
  }

  useEffect(() => {
    isMobileViewHook(setIsMobile);
  }, []);

  const HandleSearch = (searchText) => {};

  // const getBrokerageRoom = async () => {
  //   const apiUrl = BaseURL("chat/rooms/brokerage");
  //   const response = await Get(apiUrl, token);
  //   if (response !== undefined) {
  //     setRoomsData(response?.data?.data);
  //   }
  // };

  // useEffect(() => {
  //   getBrokerageRoom();
  // }, []);

  const getRooms = async () => {
    // const apiUrl = BaseURL("chat/rooms");
    const apiUrl = BaseURL(
      role == "brokerage"
        ? `chat/rooms/agent/${agentIdSet?.agent?._id}`
        : "chat/rooms"
    );
    const response = await Get(apiUrl, token);
    if (response !== undefined) {
      setRoomsData(response?.data?.data);
    }
  };
  const getMessages = async (mess) => {
    const apiUrl = BaseURL(
      `chat/single-chat?room=${selectedRoom?._id}&page=${page}&limit=${limit}`
    );
    const maxLength = (page - 1) * limit;

    if (page == 1) {
      const response = await Get(apiUrl, token);
      if (response !== undefined) {
        // setPage((prev) => prev + 1);
        setMessages(response?.data?.data);
        setTotalRecords(response?.data?.totalRecords);
      }
    } else if (maxLength == mess?.length) {
      const response = await Get(apiUrl, token);
      if (response !== undefined) {
        // setPage((prev) => prev + 1);
        const append = mess.concat(response?.data?.data);
        const appendtwo = mess.concat(response?.data?.totalRecords);
        setMessages(append);
        setTotalRecords(appendtwo);
      }
    }
  };

  useEffect(() => {
    getRooms();
    socket.current = io(apiUrl);

    socket?.current?.emit("join", userId);
  }, []);

  useEffect(() => {
    if (selectedRoom !== null) {
      getMessages(messages);
      socket.current.emit("mark-as-read", selectedRoom?._id);
      socket?.current.on("msg", (message, roomId) => {
        if (message.user._id !== userId && selectedRoom?._id == roomId) {
          setMessages((prev) => [message, ...prev]);
          socket.current.emit("mark-as-read", selectedRoom?._id);
        }
      });
    }
  }, [selectedRoom, page]);

  const sendAgreement = async (text) => {
    const url = BaseURL("users/send-agreement-to-agent");
    const params = {
      propertyId: selectedRoom?.property,
      agentId:
        userId == selectedRoom?.user1?._id
          ? selectedRoom?.user2?._id
          : selectedRoom?.user1?._id,
      text,
    };
    setAgreementLoader(true);
    const response = await Post(url, params, apiHeader(token));
    if (response !== undefined) {
      getRooms();
    }
    setAgreementLoader(false);
  };
console.log(roomsData,"roomsData roomsData roomsData")
  return (
    <>
      {isMobile ? (
        <ChatMobile
          onSearchClick={HandleSearch}
          roomsData={roomsData}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          HandleLoadMoreMsg={() => {
            setPage((prev) => prev + 1);
          }}
          messages={messages}
          sendMsg={sendMessage}
          isLoadingChats={isLoadingChats}
          isLoadingRooms={isLoadingRooms}
          totalRecords={totalRecords}
          limit={limit}
          page={page}
          setAgreementModal={setAgreementModal}
          agentContract={userData?._id == selectedRoom?.user1?._id}
        />
      ) : (
        <ChatDesktop
          agentContract={userData?._id == selectedRoom?.user1?._id}
          onSearchClick={HandleSearch}
          roomsData={roomsData}
          setRoomsData={setRoomsData}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          HandleLoadMoreMsg={() => {
            setPage((prev) => prev + 1);
          }}
          messages={messages}
          sendMsg={sendMessage}
          isLoadingChats={isLoadingChats}
          isLoadingRooms={isLoadingRooms}
          totalRecords={totalRecords}
          limit={limit}
          page={page}
          setAgreementModal={setAgreementModal}
        />
      )}
      {agreementModal && (
        <AgreementModal
          // setRoomsData={setRoomsData}
          show={agreementModal}
          setShow={setAgreementModal}
          sendAgreement={sendAgreement}
          loading={agreementLoader}
        />
      )}
    </>
  );
};

export default Chat;