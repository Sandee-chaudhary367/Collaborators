import {PartnerImage} from "./taskCard.styles"
const TaskCard2=({data})=>{
 
   return (
    <div class="card" style={{width: "20rem",margin:"5px 10px",borderRadius:"13px",boxShadow:"2px 3px #ebe8e8"}}>
   <div class="card-body">
    <div>
    <div style={{display:'flex',justifyContent:"space-between"}}>
    <p style={{fontSize:"0.8rem",padding:0,margin:0}}>{data.topic.toUpperCase()}</p>
    <p style={{fontSize:"0.8rem",color:"darkblue",padding:"0",margin:0}}>{data.completion}%</p>
    </div>
    </div>
  </div>
</div>
    
   )
}
export default TaskCard2;