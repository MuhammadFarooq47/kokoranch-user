import { useState, useRef } from "react";
import { FaRegPaperPlane, FaBars } from "react-icons/fa";
// import { useSelector } from "react-redux";
import Images from "../../../../constants/images";
import { useEffect } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// const socket = io.connect('http://192.168.100.33:3030');

export default function Messages(props) {
  const { recipient, filteredRoom, socketMessages } = props;
  console.log("🚀 ~ file: chat.js:15 ~ Messages ~ socketMessages:", socketMessages)
  console.log("🚀 ~ file: chat.js:15 ~ Messages ~ recipient:", recipient)
 
  // const location = useLocation();
  // const { user } = useSelector((state) => state?.authReducer);
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState('');
  // const messagesRef = useRef(messages);
  // const socketRef = useRef(io('http://192.168.100.33:3030'));


//   const sendMessage = () => {
//     let msg,msgTo,roomId,currentUser;
//     socket.emit('msg',
//     msg={
//       text: message,
//       user:{
//         _id: user?._id,
//         // avatar: user?.photo,
//         avatar: user?.photo,
//         name: `${user?.firstName} ${user?.lastName}`
//       }
//     },
//     msgTo= filteredRoom?.user2?._id,
//     roomId=filteredRoom?._id,
//    currentUser=user?.role
//    )

//    // On method
// // socket.on('msg', (msg) => {
// //   console.log('User Incoming Message:', msg);
// //   setMessages((prevMessages) => [...prevMessages, msg]);
// //  });
//   }


  // useEffect(() => {
  //   // Update messagesRef whenever messages change
  //   messagesRef.current = messages;

  //   // Initialize the socket connection
  //   // socket = io('http://192.168.100.33:3030');

  //   // Listen for incoming messages
  //   socket.on('msg', (msg) => {
  //     console.log('Vendor Incoming Message:', msg);

  //     // Update the state with the new message
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   // return () => {
  //   //   socket.disconnect();
  //   //   socket.off('msg'); // Remove the event listener
  //   // };
  // }, [socket, messages]);






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
              // console.log(element)
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

        {/* <footer>
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
              disabled={message.length === 0}
              onClick={sendMessage}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </footer> */}
      </main>
    </>
  );
}