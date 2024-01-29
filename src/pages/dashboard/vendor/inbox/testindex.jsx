import { useState } from "react";
import Messages from "./chat";
import Navbar from "../NavBar";
import { FaEllipsisV } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io.connect("http://192.168.100.33:3030");

export default function MyProfile({ setSidebar, sidebar }) {
  const [innerSidebar, setInnerSidebar] = useState(true);
  const { user } = useSelector((state) => state.authReducer);
  const [filteredRoom,setFilteredRoom]=useState()
  console.log("🚀 ~ file: index.js:17 ~ MyProfile ~ filteredRoom:", filteredRoom)

  const [recipient, setRecipient] = useState({});
  // handle classchange on active recipient
  const handleClassChange = (e) => {
    const elems = document.querySelectorAll(".recipient-item");
    elems.forEach((elem) => {
      elem.classList.remove("recipient-item-active");
    });
    e.target.tagName === "IMG" ||
      e.target.tagName === "H2" ||
      e.target.tagName === "H3" ||
      e.target.tagName === "SPAN"
      ? e.target.parentElement.parentElement.parentElement.classList.add(
        "recipient-item-active"
      )
      : e.target.tagName === "LI"
        ? e.target.classList.add("recipient-item-active")
        : e.target.parentElement.parentElement.classList.add(
          "recipient-item-active"
        );
  };

  const handleBtnActie = (e) => {
    console.log(e.target.tagName);
    console.log(
      e.target.tagName === "path"
        ? e.target.parentElement.parentElement.childNodes
        : e.target.tagName === "svg"
          ? e.target.parentElement.childNodes
          : e.target.childNodes[1]
    );
    // const elems = document.querySelectorAll(".chat-dropdown-delete-btn");
    // elems.forEach((elem) => {
    //   elem.classList.remove("chat-dropdown-delete-btn_active");
    // });
    e.target.tagName === "path"
      ? e.target.parentElement.parentElement.childNodes[2].classList.toggle(
        "chat-dropdown-delete-btn_active"
      )
      : e.target.tagName === "svg"
        ? e.target.parentElement.childNodes[2].classList.toggle(
          "chat-dropdown-delete-btn_active"
        )
        : e.target.childNodes[2].classList.toggle(
          "chat-dropdown-delete-btn_active"
        );
  };

  const [lastMessage, setLastMessage] = useState();
  // console.log("lastMessage??????", lastMessage?.data.at(-1));
  const [specificData, setSpecificData] = useState();

  // {lastMessage.map((roomdata) => {
  //   console.log("Room data", roomdata)
  // })}

  useEffect(async () => {
    try {

      const response = await axios.get(
        "https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/chats/rooms",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLastMessage(response?.data);    } catch (error) {
      console.log(error, "error from chat room");
    }
  }, []);

  const [roomId, setRoomId] = useState(lastMessage?.data[0]?._id);
  const [messages, setMessages] = useState();

  const roomFunction = async () => {
    try {
      socket.emit("chatJoin", user?._id, '6566e0f517264e9165d8c850')
      socket.emit("mark-as-read", '6566e0f517264e9165d8c850', user?.role)
      const response = await axios.get(
        `https://kokoranch-backend-45665121adb2.herokuapp.com/api/v1/chats/single-chat?room=6566e0f517264e9165d8c850`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(response?.data);

      const filteredRoomData=lastMessage?.data.find((ele)=>ele?._id=="6566e0f517264e9165d8c850")
      console.log("🚀 ~ file: index.js:111 ~ roomFunction ~ filteredRoomData:", filteredRoomData)

      setFilteredRoom(filteredRoomData);

    } catch (error) {
      console.log("Error from rooms", error);
    }
  };


  return (
    <>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} title="Messages" />
      <div className="my-profile-wrapper">
        <div id="trader-inbox-container">
          <aside className={`side-navbar ${innerSidebar && "active-nav"}`}>
            <ul className="nav  text-white">
              <input
                className="chat-search-input form-control"
                placeholder="Search for contacts"
              />
              <Link
                className="edit-product-container"
                style={{ height: "70vh", overflowY: "scroll" }}
                onClick={roomFunction}
                state={filteredRoom}
              >
                {lastMessage?.data?.map((element, index) => {
                
                  return (
                    <li
                      key={index}
                      className="recipient-item"
                      onClick={(e) => {
                        setRecipient(element);
                        handleClassChange(e);
                      }}
                    >
                      <div className="recipient-item_left">
                        <div className="image-wrapper">
                          <img
                            src={element?.lastMessage?.user?.avatar}
                            alt="User"
                          />

                          {element?.user2UnreadCount !== 0 && (
                            <span className="unread-count">
                              {user?.role === "user" ? element?.user2UnreadCount : element?.user1UnreadCount}
                            </span>
                          )}
                        </div>
                        <div>
                          <h2 className="name-div">
                          {user?.role === "user" ? element?.user1?.firstName : element?.user2?.firstName}
                            <span>25 min</span>
                          </h2>
                          <h3> {element?.lastMessage?.text} </h3>
                        </div>
                      </div>
                      <div className="recipient-item_right">
                        {" "}
                        <FaEllipsisV
                          className="dropown-dots"
                          onClick={(e) => handleBtnActie(e)}
                        />
                        <button className="chat-dropdown-delete-btn">
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </Link>
            </ul>
          </aside>
          <Messages
            recipient={messages}
            filteredRoom={filteredRoom}
            innerSidebar={innerSidebar}
            setInnerSidebar={setInnerSidebar}
          />
        </div>
      </div>
    </>
  );
}