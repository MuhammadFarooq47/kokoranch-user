import { useEffect, useState } from "react";
import { FaRegPaperPlane, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GET, POST } from "../../../../apis/requests";
import { io } from "socket.io-client";
import { BASE_URL } from "../../../../apis/constant";
import Images from "../../../../constants/images";

export default function Messages(props) {
  const { recipient } = props; // recipient is the user who is currently chatting with
  const { user, token } = useSelector((state) => state.authReducer); // CURRENT USER
  const [message, setMessage] = useState(""); // new message
  const [messages, setMessages] = useState([]); // all messages

  // CONNECTING WITH SOCKET & GETIING MESSAGES
  useEffect(() => {
    const socket = io(BASE_URL); // socket connection
    // RESPONSE
    recipient?._id && // CHEING IF RECIPIENT IS NOT NULL
      GET(`/chats/get/`, token, recipient._id) // request to get messages
        .then((res) => {
          console.log(res);
          setMessages(res.chat);
        })
        .catch((err) => {
          toast.error(err.message);
        });

    return () => {
      socket.disconnect(); // disconnecting socket when component unmounts
    };
  }, [recipient]); // eslint-disable-line react-hooks/exhaustive-deps

  const onsubmit = (e) => {
    e.preventDefault();
    // CHECKING IF MESSAGE IS EMPTY
    if (message.trim() !== "") {
      const data = {
        message: message,
        recipient: recipient._id,
        sender: user._id,
      }; // data to be sent to server

      POST("/chats/create", token, data)
        .then((res) => {
          if (res.success) {
            setMessages([...messages, res.message]);
            setMessage("");
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };
  return (
    <>
      <main>
        <header>
          <nav className="navbar top-navbar ">
            <div
              className="border-0 mx-4"
              id="menu-btn"
              onClick={() => {
                props.setSidebar(!props.sidebar);
              }}
            >
              <FaBars />
            </div>
            <img src={recipient.image} width={55} height={55} alt="" />
            <div className="info-wrapper">
              <h2>
                {recipient.firstName} {recipient.lastName}
              </h2>
              <h3>offline 45 min ago</h3>
            </div>
          </nav>
        </header>
        <ul id="chat">
          {messages.length > 0 ? (
            messages.map((element, index) => {
              return (
                <div>
                  <li className="you" key={index}>
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor.
                    </div>
                  </li>
                  <li className="me">
                    <div className="message">{element.message}</div>
                  </li>
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center  align-items-center">
              <center>
                <img
                  src={Images.Pictures.chat}
                  alt="misssing chat"
                  width={230}
                  height={230}
                />
                <br />
                <p className="mt-4">
                  You Haven't Started a Convesaton with {recipient.firstName}{" "}
                  {recipient.lastName}
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
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type your message here..."
            >
              {message}
            </textarea>
            <button
              className="btn"
              disabled={message.length === 0}
              onClick={onsubmit}
            >
              <FaRegPaperPlane style={{ size: "2rem" }} />
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}
