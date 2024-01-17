import React, { useEffect, useRef, useState } from "react";
// import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import ChatDesktop from "./ChatDesktop";
// import ChatMobile from "./ChatMobile";
import moment from "moment";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { apiHeader, apiUrl, BaseURL, imageUrl } from "../../config/apiUrl";
import { Get, Post } from "../../Axios/AxiosFunctions";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [isMobile, setIsMobile] = useState(false);
  const userId = useSelector((state) => state.authReducer?.user?._id);
  const userData = useSelector((state) => state.authReducer.user);
  const role = useSelector((state) => state.authReducer?.user?.role);
  // const token = useSelector((state) => state.authReducer?.token);
  const token = localStorage.getItem("token")

  const roomFromLocation = useLocation()?.state?.room;

  const agentIdSet = useLocation()?.state;
  // Loading Room And Chats
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(false);

  const socket = useRef(null);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  console.log("🚀 ~ file: index.js:30 ~ Chat ~ selectedRoom:", selectedRoom)
  const [messages, setMessages] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);

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

  async function sendMessage(msg) {
    const isEmpty = (msg) => !msg.trim().length;
    if (isEmpty(msg)) {
      return;
    }
    const data = {
      text: msg,
      user: {
        _id: userId,
        name: userData?.firstName,
        avatar:userData?.photo,
      },
      _id: Math.ceil(Math.random() * 10),
      createdAt: moment().format(),
    };
    // if (selectedRoom?.user1?._id ) {
      
    // }
    
    setRoomsData((prev) => {
      const updatedRoomLastMessage = prev.map((item) => {
        if (item?._id === selectedRoom?._id) {
          setMessages((prev) => [...prev, data]);
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
      selectedRoom?.user1?._id === userData?._id
        ? selectedRoom?.user2?._id
        : selectedRoom?.user1?._id,
      selectedRoom?._id,
      // userData?._id,
      userData?.role
    );
    console.log(selectedRoom?.user1?._id, "user1");
    console.log(selectedRoom?.user2?._id, "user2");
    console.log(userData?._id, "USER ID MY");
    console.log(
      selectedRoom?.user1?._id === userData?._id
        ? selectedRoom?.user2?._id
        : selectedRoom?.user1?._id,
      "Sending Tooo...."
    );
    
      // Cleanup code here (e.g., disconnect the socket)
   socket.current.off('msg');
    
    // send a message to the server
  }

  const HandleSearch = (searchText) => {};

  const getRooms = async () => {
    // const apiUrl = BaseURL("chat/rooms");
    const apiUrl = BaseURL("chats/rooms"
    );
    const response = await Get(apiUrl, token);
    console.log("🚀 ~ file: index.js:114 ~ getRooms ~ response:", response?.data?.data?.length)
    if (response !== undefined) {
      setRoomsData(response?.data?.data);
    }
  };
  const getMessages = async (mess) => {
    const apiUrl = BaseURL(
      `chats/single-chat?room=${selectedRoom?._id}`
    );
    const maxLength = (page - 1) * limit;

    if (page === 1) {
      const response = await Get(apiUrl, token);
      console.log("🚀 ~ file: index.js:135 ~ getMessages ~ response:", response?.data?.data)
      if (response !== undefined) {
        // setPage((prev) => prev + 1);
        setMessages(response?.data?.data);
        // setTotalRecords(response?.data?.totalRecords);
      }
    } else if (maxLength === mess?.length) {
      const response = await Get(apiUrl, token);
      if (response !== undefined) {
        // setPage((prev) => prev + 1);
        const append = mess.concat(response?.data?.data);
        const appendtwo = mess.concat(response?.data?.totalRecords);
        // setMessages(append);
        setTotalRecords(appendtwo);
      }
    }
  };

  useEffect(() => {
    getRooms();
    socket.current = io(apiUrl);

    socket.current.emit("join", userId);

    // return () => {
    //   socket.current.disconnect();
    // };
  }, []);

  // useEffect(() => {
  //   if(selectedRoom) {
  //     socket.current.emit("join", selectedRoom?._id); 
  //   }
  // }, [selectedRoom])

  useEffect(() => {
    if (selectedRoom !== null) {
      getMessages(messages);
      socket.current.emit("mark-as-read", selectedRoom?._id,userData?.role);
      socket.current.on("msg", (message, roomId) => { 
        if (message.user._id !== userId && selectedRoom?._id === roomId) {
          setMessages((prev) => [...prev, message]);
          socket.current.emit("mark-as-read", selectedRoom?._id,userData?.role);
          console.log("ssss", message, roomId, message.user._id, userId, "....", selectedRoom?._id, roomId )
          console.log('New message received:', message);
        }
      });
    }
    return () => {
      // Cleanup code here (e.g., disconnect the socket)
      socket.current.off('msg');
    };
  }, [selectedRoom]);

console.log(roomsData,"roomsData roomsData roomsData")
  return (
    <>
    <ChatDesktop
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
        />
    </>
  );
};

export default Chat;