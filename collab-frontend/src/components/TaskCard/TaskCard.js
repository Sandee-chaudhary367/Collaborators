import { PartnerImage} from "./taskCard.styles"
import {API_URL} from "../../variables"
import { useState } from "react"
import axios from "axios";

function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { "x-access-token": user };
  } else {
    return {};
  }
}

const TaskCard=({data})=>{
   let [menu,setmenu]=useState(false)

   let deleteThisTask=async()=>{
    let res=await axios.delete(API_URL + "deleteTasks/"+data._id,{ headers: authHeader(),data});
    window.location.reload();
   }

   return (
    <div class="card" style={{width: "95%",minWidth:"400px",margin:"5px 10px",borderRadius: "20px",boxShadow:"2px 3px #ebe8e8"}}>
   <div class="card-body">
   <div style={{padding:"10px"}}>
   <div>
   <div style={{display:'flex',justifyContent:"space-between"}}>
   <p style={{fontSize:"1rem",padding:0,margin:0}}>{data.topic.toUpperCase()}</p>
   <p style={{fontSize:"1rem",padding:0,margin:0}}><span style={{padding:"0 10px",cursor:"pointer"}} onClick={()=>{setmenu(!menu)}}>:</span>
   {menu && <div id={data._id} style={{width:'100px',border:"2px solid",background:"white",position:"absolute",right:"28px"}} >
     <ul style={{listStyleType: "none",margin: 0,padding: 0}}>
     <a style={{color:"black",textDecoration:"none"}} href={`/Taskbox/${data._id}`}><li style={{padding: "8px 10px",cursor:"pointer",borderBottom: "1px solid #ddd"}}>Open</li></a>
   <li onClick={deleteThisTask} style={{padding: "8px 10px",cursor:"pointer"}}>Delete</li>
     </ul>
   </div>}
   </p>
   
     </div>
    <p style={{fontSize:"0.85rem",fontWeight:"200",color:"grey",padding:0,margin:0}}>{data.description}</p>
    </div>
    <div style={{display:"flex"}}>
    <PartnerImage src={`${API_URL}getProfilepic/Image/${data.owner}`}/>
    {
       data.partner.map((el)=>{
          return (<PartnerImage src={`${API_URL}getProfilepic/Image/${el}`}/>)
       })
    }
    </div>
    <div>
    <div style={{display:'flex',justifyContent:"space-between"}}>
    <p style={{fontSize:"0.8rem",padding:"0 0 7px 0",margin:0}}>Progress</p>
    <p style={{fontSize:"0.8rem",color:"darkblue",padding:"0 0 7px 0",margin:0}}>{data.completion}%</p>
    </div>
    <div style={{height:"6px"}} class="progress">
    <div class="progress-bar" role="progressbar" style={{background:"darkblue",width: `${data.completion}%`}} aria-valuenow={data.completion} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    </div>
    </div>
  </div>
</div>
    
   )
}
export default TaskCard;