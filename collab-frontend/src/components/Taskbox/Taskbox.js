import { useEffect,useRef,useState } from "react";
import "./Taskbox.css";
import axios from "axios";
import { connect } from 'react-redux';
import {API_URL} from "../../variables"
import { PartnerImage} from "../TaskCard/taskCard.styles"
import Message from "../message/Message.jsx"
import {io} from "socket.io-client"

function authHeader(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return { "x-access-token": user };
    } else {
      return {};
    }
}

const Taskbox=({match,user})=>{
    let [data,setData]=useState(null);
    let [loading,setLoading]=useState(false);
    let [messages,setMessages]=useState([]);
    let [currentChat, setCurrentChat] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    let scrollRef=useRef();
    const [socket,setSocket]=useState(null);

    // useEffect(()=>{
    //   setSocket(io("ws://localhost:8900"));
    // },[]);
    
    const getMessages = async () => {
      try {
        const res = await axios.get(API_URL+"messages/" + match.params._id);
        console.log("res.data");
        console.log(res.data);
        setMessages(res.data);
        if(res.data.length===0){
          return;
        }
        setCurrentChat(true);
      } catch (err) {
        console.log(err);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        taskId: match.params._id,
      };
      try {
        const res = await axios.post(API_URL + "sendmessages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(async()=>{
        const response=await axios.get(API_URL + "TaskbyId/"+match.params._id,{ headers: authHeader() });
        setData(response.data);
        setLoading(true);
    },[])

    useEffect(() => {
      getMessages();
    }, [currentChat]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    return (
        <div>
        {loading && <div><div style={{display:"flex",alignItems:"baseline"}}>
        <h1>{data.topic.toUpperCase()}</h1>
        <h5 style={{padding:"0 10px 0 20px",fontSize:"16px",color:"darkblue"}}>Progress : {data.completion}%</h5>
        <h5 style={{padding:"0 10px",fontSize:"16px",color:"darkblue"}}>Deadline : {data.deadline}</h5>
        </div>
        <div style={{display:"flex"}}>
        <PartnerImage src={`${API_URL}getProfilepic/Image/${data.owner}`}/>
        {
        data.partner.map((el)=>{
            return (<PartnerImage src={`${API_URL}getProfilepic/Image/${el}`}/>)
        })
        }
        </div>

        <p style={{fontSize:"16px",padding:0,margin:0}}>{data.description}</p>
        </div>}

        <div style={{display:"flex"}} >
           
            <div style={{flex:"6",backgroundColor:"lavender"}}>
            Hello
            </div>

            <div style={{flex:"3.3"}}>
            <div style={{backgroundColor:"black",margin:"0 10px 0 0",color:"white",height:"32px"}}>
            Discussion Box
            </div>
            <div className="chatBox" style={{padding:"10px"}}>
            {currentChat ? (
              <div>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    console.log(m);
                    return (
                      <div ref={scrollRef} >
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    )
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
            </div>
            </div>
        
        </div>

        </div>
    )


}

const mapStateToProps=state=>(
  {user:state.user.currentUser}
)
export default connect(mapStateToProps,null)(Taskbox);
