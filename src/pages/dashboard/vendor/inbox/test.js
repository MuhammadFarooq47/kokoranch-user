import { useState } from "react";

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



{
    // For Company Messages
    (
      user?.role == "vendor" || user?.role === 'trader' || user?.role === "admin"
        ? item?.user?._id !==
          selectedRoom?.user2?._id // user1 msg (agent or sp)
        : item?.user?._id !== user?._id
    ) ? (
    //   <div className={[classes.mb32].join(" ")}>
    //     <div
    //       className={[
    //         classes.roomMessageMainDiv,
    //       ].join(" ")}
    //     >
    //       <div
    //         className={[
    //           classes.roomMessageimgDiv,
    //         ].join(" ")}
    //       >
    //         <img
    //           src={item?.user?.avatar}
    //           alt="..."
    //           onError={(e) => {
    //             e.target.onerror = null;
    //             e.target.src = fallbackUser;
    //           }}
    //         />
    //       </div>
    //       <div>
    //         <p
    //           className={[classes.roomMessage].join(
    //             " "
    //           )}
    //         >
    //           {item?.text}
    //         </p>
    //       </div>
    //     </div>

    //     <p className={[classes.time]}>
    //       {moment(item?.createdAt).format(
    //         "DD MMM YYYY hh:mm"
    //       )}
    //     </p>
    //   </div>
    <div>
    <li
      className={[
       "you"
      ].join(" ")}
    >
      <div className="message">
           {element?.text}
          </div>
    </li>
  </div>
    ) : (
        <div>
        <li
          className={[
           "me"
          ].join(" ")}
        >
          <div className="message">
               {element?.text}
              </div>
        </li>
      </div>
    //   <div className={[classes.mb32].join(" ")}>
    //     <div
    //       className={[
    //         classes.roomMessageRightMainDiv,
    //       ].join(" ")}
    //     >
    //       <div
    //         className={[
    //           classes.roomMessageimgDiv,
    //         ].join(" ")}
    //       >
    //         <img
    //           src={item?.user?.avatar}
    //           alt="..."
    //           onError={(e) => {
    //             e.target.onerror = null;
    //             e.target.src = fallbackUser;
    //           }}
    //         />
    //       </div>
         
    //     </div>

    //     <p className={[classes.rightime]}>
    //       {moment(item?.createdAt).format(
    //         "DD MMM YYYY hh:mm"
    //       )}
    //     </p>
    //   </div>
    )
  }