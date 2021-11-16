import { useEffect,useRef,useState } from "react";
import "./Taskbox.css";
import "./TextArea.css"
import axios from "axios";
import { connect } from 'react-redux';
import {API_URL} from "../../variables"
import { PartnerImage} from "../TaskCard/taskCard.styles"
import Message from "../message/Message.jsx"
import {io} from "socket.io-client"
import CheckBox from "../checkBox/checkbox.jsx";
import { format } from "timeago.js";

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
    const [arrivalMessage, setArrivalMessage] = useState(null);

    let scrollRef=useRef();
    const socket=useRef();

    //It tells the socket server the a user has been connect  
    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        console.log("getting message");
        console.log(data);
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);

    useEffect(() => {
      arrivalMessage && 
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, data]);


    useEffect(() => {
      socket.current.emit("addUser", {
        userId:user._id,
        taskId:match.params._id
      });
    }, [user]);
  

    const getMessages = async () => {
      
      try {
        const res = await axios.get(API_URL+"messages/" + match.params._id);
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

      let groupMem=[...data.partner,data.owner]

      const receiverId = groupMem.filter(
        (member) => member !== user._id
      );

      console.log({
        senderId: user._id,
        receiverId,
        text: newMessage,
        taskId:match.params._id,
      })

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
        taskId:match.params._id,
      });

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
    }, []);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    return (
        <div>
        {loading && <div><div style={{display:"flex",alignItems:"baseline",margin:"5px 13px"}}>
        <h1>{data.topic.toUpperCase()}</h1>
        <h5 style={{padding:"0 10px",fontSize:"18px",color:"darkred"}}>(Deadline : {format(data.deadline)})</h5>
        </div>
        {/*<div style={{display:"flex"}}>
        <PartnerImage src={`${API_URL}getProfilepic/Image/${data.owner}`}/>
        {
        data.partner.map((el)=>{
            return (<PartnerImage src={`${API_URL}getProfilepic/Image/${el}`}/>)
        })
        }
      </div>*/}

       {/*<p style={{fontSize:"16px",padding:0,margin:0}}>{data.description}</p>*/}
        </div>}

        <div style={{display:"flex"}} >
           
            <div style={{flex:"6",display:"flex",flexDirection:"column",alignItems:"center"}}>
            {
              loading?<div style={{height:"138px",padding:"10px",width:"98%",background:"white", border:"solid 2px black", borderRadius: "1%"}}>
              {<p style={{fontSize:"16px",padding:0,margin:0}}>{data.description}</p>}
              </div>:<div>
              
              </div>
            }
            
            <div className="CheckBox">
                <CheckBox taskId={match.params._id} ></CheckBox>
            </div>
           
            </div>

            <div style={{flex:"3.6"}}>
            
            {/*chatBox*/}
            <div className="chatBox" style={{padding:"0 20px 10px 20px"}}>
            { messages.length!==0 ? (
              <div>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef} >
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    )
                  })}
                </div>
                </div>
            ) : (
              <div className="noConversationText">
                Discuss here...
              </div>
            )}
            <div className="chatBoxBottom">
          <textarea class="form__input" id="name" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="write something..."/>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              
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
