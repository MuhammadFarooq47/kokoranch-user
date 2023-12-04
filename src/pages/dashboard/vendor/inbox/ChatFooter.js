import React , {useState} from 'react';
import { FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from 'react-redux';

function ChatFooter(props) {
    const [message, setMessage] = useState("")
    const { user } = useSelector((state) => state?.authReducer);
    const {  filteredRoom, socket } = props;

    
    const sendMessage = (e) => {
        e.preventDefault()
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
    //    sendMessage("")
       console.log("🚀 ~ file: chat.js:27 ~ sendMessage ~ msg,msgTo,roomId,currentUser;:", msg,msgTo,roomId,currentUser)
       // On method
      }
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