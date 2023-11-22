import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GET } from "../../../../apis/requests";
import UserSideMenu from "../../../../components/userSideMenu";
import Messages from "./chat";

export default function MyProfile() {
  const [sidebar, setSidebar] = useState(true);

  // CURRENT USERS
  const { user, token } = useSelector((state) => state.authReducer);

  // FOR ALL USER EXCEPT CURRENT USER
  const [users, setUsers] = useState([]);

  // THE ONE WITH CHAT
  const [recipient, setRecipient] = useState({});

  // handle classchange on active recipient
  const handleClassChange = (e) => {
    console.log(e.target.tagName);
    const elems = document.querySelectorAll(".recipient-item");
    elems.forEach((elem) => {
      elem.classList.remove("recipient-item-active");
    });
    e.target.tagName === "IMG"
      ? e.target.parentElement.classList.add("recipient-item-active")
      : e.target.tagName === "LI"
      ? e.target.classList.add("recipient-item-active")
      : e.target.parentElement.parentElement.classList.add(
          "recipient-item-active"
        );
  };

  const get_messages = async () => {
    await GET("/users/get", token, "")
      .then((res) => {
        if (res.success) {
          let filtered_users = res.users.filter(
            (data) => data._id !== user._id
          );
          setUsers(filtered_users);
          setRecipient(filtered_users[0]);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    get_messages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <UserSideMenu>
      <div className="my-profile-wrapper">
        <h2 className="fs-2 mb-5">Inbox</h2>
        <div id="container">
          <aside
            className={`side-navbar ${sidebar && "active-nav"}`}
            id="sidebar"
          >
            <ul className="nav  text-white">
              <input
                className="chat-search-input form-control"
                placeholder="Search for contacts"
              />
              {users.map((element, index) => {
                return (
                  <li
                    className="recipient-item"
                    onClick={(e) => {
                      setRecipient(element);
                      handleClassChange(e);
                    }}
                  >
                    <img src={element.image} alt="User" />
                    <div>
                      <h2>{`${element.firstName} ${element.lastName}`}</h2>
                      <h3>Lorem ipsum dolor sit.</h3>
                    </div>
                    <div>
                      <div>25 min</div>
                      <div className="unread-count">2</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
          <Messages
            recipient={recipient}
            sidebar={sidebar}
            setSidebar={setSidebar}
          />
        </div>
      </div>
    </UserSideMenu>
  );
}
