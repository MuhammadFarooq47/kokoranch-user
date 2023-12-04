import { useState } from "react";
import { FaRegPaperPlane, FaBars } from "react-icons/fa";
// import { useSelector } from "react-redux";
import Images from "../../../../constants/images";
import { useEffect } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const socket = io.connect('http://192.168.100.33:3030');

export default function Messages(props) {
  // console.log("Prop......", props)
  const { recipient, filteredRoom } = props; // recipient is the user who is currently chatting with
  // const { user, token } = useSelector((state) => state.authReducer); // CURRENT USER
  console.log(filteredRoom, "receipt.........")

  const location = useLocation();
  console.log("location", location);
  // console.log("lastMessage??????", location?.state?.user2?.email);
  const {user} = useSelector((state) => state?.authReducer);
// console.log("User", user)
  const [message, setMessage] = useState(""); // new message
  console.log("🚀 ~ file: chat.js:25 ~ Messages ~ message:", message)
  // const [messages, setMessages] = useState([
  //   { message: "hello", sendBy: "niaz" },
  // ]); // all messages

  // const onsubmit = () => {
  //   // let arr = [...messages];
  //   arr.push({ message: message, sendby: "niaz" });
  //   // setMessages(arr);
  //   // setMessage("");
  // };

  // const [id, setId] = useState();
  // console.log("ID<<<<<<<<<<<<<<", id)

const [messages, setMessages] = useState([]);
console.log("messages", messages)

const sendMessage = () => {
  let msg,msgTo,roomId,currentUser;
socket.emit('msg',
  msg={
    text: message,
    user:{
      _id: user?._id,
      // avatar: user?.photo,
      avatar: user?.photo,
      name: `${user?.firstName} ${user?.lastName}`
    }
  },
  msgTo= filteredRoom?.user2?._id,
  roomId=filteredRoom?._id,
 currentUser=user?.role
 )
}

useEffect(() => {
  console.log("Vendor UseEfect")
  // const socket = io.connect('http://192.168.100.33:3030');

  // Listen for incoming messages
  socket.on('msg', (msg, roomId) => {
    // Handle the incoming message
    console.log('User Incoming Message:', msg, roomId);

    // Update the state with the new message
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  // Cleanup by removing the event listener when the component unmounts
  // return () => {
  //   socket.off('msg');
  // };
}, [socket]);



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
          {recipient?.data?.length > 0 ? (
            recipient?.data?.map((element, index) => {
              console.log(element)
              return (
                <div>
                  <li className="you" key={index}>
                    <div className="message">
                     {element?.text}
                    </div>
                  </li>
                  <li className="me">
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor.
                    </div>
                  </li>
                </div>
              );
            })
          ) : (
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
          )}
        </ul>

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
              className="btn"
              disabled={message.length === 0}
              onClick={() => {
                sendMessage();
                // socketOn();
              }}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}