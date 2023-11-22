import { useState } from "react";
import { FaRegPaperPlane, FaBars } from "react-icons/fa";
// import { useSelector } from "react-redux";
import Images from "../../../../constants/images";

export default function Messages(props) {
  const { recipient } = props; // recipient is the user who is currently chatting with
  // const { user, token } = useSelector((state) => state.authReducer); // CURRENT USER

  const [message, setMessage] = useState(""); // new message
  const [messages, setMessages] = useState([
    { message: "hello", sendBy: "niaz" },
  ]); // all messages

  const onsubmit = () => {
    let arr = [...messages];
    arr.push({ message: message, sendby: "niaz" });
    setMessages(arr);
    setMessage("");
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
              onClick={onsubmit}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}
