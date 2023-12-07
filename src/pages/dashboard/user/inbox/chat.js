import { useState, useRef } from "react";
import { FaRegPaperPlane, FaBars } from "react-icons/fa";
// import { useSelector } from "react-redux";
import Images from "../../../../constants/images";
import { useEffect } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChatFooter from "./ChatFooter";
import moment from "moment";

// const socket = io.connect('http://192.168.100.33:3030');

export default function Messages(props) {
  const { recipient, filteredRoom, socketMessages, setMessages, socket } = props;
  // console.log("🚀 ~ file: chat.js:15 ~ Messages ~ socketMessages:", socketMessages)
  console.log("🚀 ~ file: chat.js:15 ~ Messages ~ recipient:", recipient);

  const { user } = useSelector((state) => state.authReducer);
  console.log("🚀 ~ file: chat.js:20 ~ user:", user)


  const [selectedRoom, setSelectedRoom] = useState({
    "_id": "6569ab8d078c201299775b5c",
    "user1": {
        "_id": "65269402a684f1576cc0ef9c",
        "photo": "c80a5031-4069-4b64-a060-e8e203601edb.jpeg",
        "storeName": "Kahoo Digital",
        "firstName": "testing",
        "lastName": "vendor",
        "role": "vendor",
        "email": "testingvendor@gmail.com",
        "isActive": true,
        "isVerified": true,
        "passwordResetCode": null,
        "isOnline": true,
        "lastLogin": "2023-10-13T09:50:06.070Z",
        "createdAt": "2023-10-11T12:24:34.768Z",
        "updatedAt": "2023-12-06T09:44:03.972Z",
        "__v": 1,
        "phoneNumber": "03022637908",
        "favourites": [],
        "passwordChangedAt": "2023-11-07T10:55:15.851Z",
        "isBlockedByAdmin": false,
        "socketId": "Oky-PKjNrCSKcNnpAABH",
        "id": "65269402a684f1576cc0ef9c"
    },
    "user2": {
        "_id": "651eb40ea9318aafa25ac368",
        "firstName": "Muhammad",
        "lastName": "Farooq",
        "role": "user",
        "email": "m.farooq.h8@gmail.com",
        "phoneNumber": "923022637909",
        "isActive": true,
        "isVerified": true,
        "passwordResetCode": 824855,
        "isOnline": true,
        "lastLogin": "2023-10-05T13:02:46.846Z",
        "createdAt": "2023-10-05T13:03:10.536Z",
        "updatedAt": "2023-12-06T09:47:58.726Z",
        "__v": 0,
        "favourites": [
            "651fdd89e3b1983b707c6430",
            "652532e845c76cd8b7782d04"
        ],
        "isBlockedByAdmin": false,
        "passwordChangedAt": "2023-11-07T10:18:28.500Z",
        "socketId": "hP5pYnjRI0ku4qArAABJ",
        "id": "651eb40ea9318aafa25ac368"
    },
    "user1UnreadCount": 1,
    "user2UnreadCount": 0,
    "lastMessage": {
        "text": "Abcd",
        "user": {
            "_id": "651eb40ea9318aafa25ac368",
            "name": "Muhammad Farooq"
        },
        "_id": "657042c9fb75a5512f5169de",
        "createdAt": "2023-12-06T09:45:45.227Z",
        "updatedAt": "2023-12-06T09:45:45.227Z"
    },
    "lastChatted": "2023-12-06T09:45:45.227Z",
    "createdAt": "2023-12-01T09:46:53.246Z",
    "updatedAt": "2023-12-06T09:45:45.227Z",
    "__v": 0
})

const [message, setMessage] = useState(recipient?.data)



const sendMessage = (e, msg) => {
e.preventDefault();
// const isEmpty = (msg) => !msg?.length;

// setMessage((prevMessage) => {
//   if (isEmpty(prevMessage)) {
//     return prevMessage;
//   }

  let data, msgTo, roomId, currentUser;
  // ... rest of your code
  socket.current.emit('msg',
  data={
    text: message,
    user:{
      _id: user?._id,
      // avatar: user?.photo,
      avatar: user?.photo,
      name: `${user?.firstName} ${user?.lastName}`
    },
    // _id: Math.ceil(Math.random() * 10),
    createdAt: moment().format(),
  },
  msgTo= filteredRoom?.user1?._id,
  roomId=filteredRoom?._id,
 currentUser=user?.role
 )
 setMessage("");
 setMessages((prev) => [...prev?.data,data]);
//  console.log("prevData",messages);
//  setMessages((prev) => console.log(prev, "sdgr"));
 console.log("🚀 ~ file: chat.js:27 ~ sendMessage ~ msg,msgTo,roomId,currentUser;:", msg,msgTo,roomId,currentUser)
  // return ""; // Clear the message after sending
// });

// Rest of your code
};
  
  
  return (
    <>
      <main style={{ height: "78vh" }}>
        <header>
          <nav className="navbar ">
            <div className="navbar_left">
              <div
                className=" border-0 mx-4"
                id="menu-btn"
                onClick={() => {
                  props.setInnerSidebar(!props.innerSidebar);
                }}
              >
                <FaBars />
              </div>
              {recipient?.image && (
                <img src={recipient?.image} width={55} height={55} alt="" />
              )}
              <div className="info-wrapper">
                <h2 className="fs-2">
                  {recipient?.firstName} {recipient?.lastName}
                </h2>
                <h4 className="fs-4">offline 45 min ago</h4>
              </div>
            </div>
            <div className="navbar_right">
              <button className="btn btn-solid btn-solid-primary">
                Delete
              </button>
            </div>
          </nav>
        </header>
        <ul id="chat" className="bg-black-pad my-5 " style={{ height: "60vh" }}>
          {recipient?.data?.map((item, index) => {
            // console.log(element)
            return (
              <>
                {
                  // For Company Messages
                  (
                    user?.role == "vendor" || user?.role === 'trader' || user?.role === "admin"
                    ? item?.user?._id !==
                      selectedRoom?.user1?._id // user1 msg (agent or sp)
                    : item?.user?._id !== user?._id
                ) ?  (
                    <div>
                      <li
                        className={[
                          "me"
                        ].join(" ")}
                      >
                        <div className="message">
                          {item?.text}
                        </div>
                      </li>
                    </div>
                  ) : (
                    <div>
                      <li
                        className={[
                          "you"
                        ].join(" ")}
                      >
                        <div className="message">
                          {item?.text}
                        </div>
                      </li>
                    </div>

                  )
                }
              </>
            );
          })}

          {/* {!recipient?.data.length(
            <div className="d-flex justify-content-center  align-items-center">
              <center>
                <img
                  src={Images?.Pictures?.chat}
                  alt="misssing chat"
                  style={{ width: "20rem", height: "17rem" }}
                />
                <br />
                <p className="mt-4">
                  You Haven't Started a Convesaton with {recipient?.firstName}{" "}
                  {recipient?.lastName}
                </p>
              </center>
            </div>
          )

          } */}
          {/* {socketMessages?.map((user2msgs, index) => {
                    console.log("🚀 ~ file: chat.js:148 ~ {socketMessages?.data?.map ~ user2msgs:", user2msgs)
                    return(
                      <li className="you" key={index}>
                      <div className="message">
                       {user2msgs?.text}
                      </div>
                    </li>
                    )
                 
                  })} */}

        </ul>
{/* <ChatFooter /> */}
        <footer>
          <div className="input-wrapper">
            <textarea
              rows="1"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            ></textarea>
            <button
              type="submit"
              className="btn"
              // disabled={message.length == 0}
              onClick={sendMessage}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}