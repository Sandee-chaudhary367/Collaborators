import "./message.css";
import { format } from "timeago.js";
import {API_URL} from "../../variables"
import { PartnerImage} from "./message.styles.js"

let Message =({message,own}) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <PartnerImage src={`${API_URL}getProfilepic/Image/${message.sender}`}/>
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
export default Message;