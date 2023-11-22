import { useState } from "react";
import Messages from "./chat";
import Navbar from "../NavBar";
import { FaEllipsisV } from "react-icons/fa";
export default function MyProfile({ setSidebar, sidebar }) {
  const [innerSidebar, setInnerSidebar] = useState(true);
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
              <div
                className="edit-product-container"
                style={{ height: "70vh", overflowY: "scroll" }}
              >
                {[
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },

                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Muhammad",
                    lastName: "Ali",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
                  },
                  {
                    firstName: "Shayan",
                    lastName: "Shayan",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg",
                  },
                  {
                    firstName: "Moiz",
                    lastName: "Moiz",
                    image:
                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_03.jpg",
                  },
                ].map((element, index) => {
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
                          <img src={element.image} alt="User" />
                          <span className="unread-count">2</span>
                        </div>
                        <div>
                          <h2 className="name-div">
                            {`${element.firstName} ${element.lastName}`}{" "}
                            <span>25 min</span>
                          </h2>
                          <h3>Lorem ipsum dolor sit.</h3>
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
              </div>
            </ul>
          </aside>
          <Messages
            recipient={recipient}
            innerSidebar={innerSidebar}
            setInnerSidebar={setInnerSidebar}
          />
        </div>
      </div>
    </>
  );
}
