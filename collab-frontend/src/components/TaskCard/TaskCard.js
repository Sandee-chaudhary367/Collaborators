import { PartnerImage} from "./taskCard.styles"
const TaskCard=({data})=>{
 
   return (
    <div class="card" style={{width: "35rem",margin:"5px 10px",borderRadius: "20px",boxShadow:"2px 3px #ebe8e8"}}>
   <div class="card-body">
   <div style={{padding:"10px"}}>
   <div>
   <div style={{display:'flex',justifyContent:"space-between"}}>
   <p style={{fontSize:"1rem",padding:0,margin:0}}>{data.topic.toUpperCase()}</p>
   <p style={{fontSize:"1rem",padding:0,margin:0}}>:</p>
   </div>
   <p style={{fontSize:"0.85rem",fontWeight:"200",color:"grey",padding:0,margin:0}}>{data.description}</p>
   </div>
    <PartnerImage/>
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