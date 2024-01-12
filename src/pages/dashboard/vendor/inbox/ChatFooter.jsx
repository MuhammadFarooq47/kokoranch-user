import React , {useState} from 'react';
import { FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from 'react-redux';
import moment from 'moment';

function ChatFooter(props) {
    const [message, setMessage] = useState("")
    const { user } = useSelector((state) => state?.authReducer);
    const {  filteredRoom, socket, setMessages, recipient } = props;
    // console.log("🚀 ~ file: ChatFooter.js:9 ~ ChatFooter ~ recipient:", recipient)

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
        msgTo= filteredRoom?.user2?._id,
        roomId=filteredRoom?._id,
       currentUser=user?.role
       )
       setMessage("");
       setMessages((prev) => [data, ...prev?.data]);
      // setMessages((prev) => console.log(prev, "sdgr"));
      //  console.log("🚀 ~ file: chat.js:27 ~ sendMessage ~ msg,msgTo,roomId,currentUser;:", msg,msgTo,roomId,currentUser)
        // return ""; // Clear the message after sending
      // });
    
      // Rest of your code
    };
    
    
  return (
    <div>
         <footer>
          <form className="input-wrapper" onSubmit={sendMessage}>
            <textarea
              rows="1"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            ></textarea>
            <button
            //   type="submit"
              className="btn"
              disabled={message.length === 0}
            //   onClick={sendMessage}
            >
              <FaRegPaperPlane />
            </button>
          </form>
        </footer>
    </div>
  )
}

export default ChatFooter;