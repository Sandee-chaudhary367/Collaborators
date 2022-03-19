import "./checkbox.css"
import { useEffect,useState } from "react";
import axios from "axios";
import {API_URL} from "../../variables"
function authHeader(){
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { "x-access-token": user };
  } else {
    return {};
  }
}

let CheckBox=(taskId)=>{
    const [onAddSubtask, setonAddSubtask] = useState(false);
    const [newSubTask, setNewSubTask] = useState("");
    const [newSubTaskArr, setNewSubTaskArr] = useState([]);

    let timeofCompletion=(com)=>{
        if(com.completion){
          return "Took "+Math.floor(Math.abs((new Date(com.start)-new Date(com.end))/(1000 * 3600 * 24)))+" days";
        }else{
          return "Not Completed Yet"
        }
    }

    let getSubTasks=async () => {
      const response=await axios.get(API_URL + "myAllsubTasks/"+taskId.taskId,{ headers: authHeader() });
      setNewSubTaskArr(response.data);
    }

    useEffect(() => {
        getSubTasks();
    }, []);

    const deleteSubTasks= async (e)=>{
      try{
         console.log(e.target.id)
          const res = await axios.delete(API_URL + "deleteSubTasks/"+e.target.id,{ headers: authHeader() });
          getSubTasks();
        }catch(err){
          console.log(err);
        }
    }

    const completionfn1= async (e) => {
      try{
      console.log(e.target.id)
        const res = await axios.put(API_URL + "subTasksCompletionToTrue/"+e.target.id,null,{ headers: authHeader() });
        const res1 = await axios.put(API_URL + "changeHeatdataOntrue",null,{ headers: authHeader() });
        getSubTasks();
      }catch(err){
        console.log(err);
      }
    }

    const completionfn2= async (e) =>{
      try{
       // console.log(e.target.id)
        const res = await axios.put(API_URL + "subTasksCompletionToFalse/"+e.target.id,null,{headers: authHeader()});
        let aa={end:res.data.end};
        const res1 = await axios.put(API_URL + "changeHeatdataOnfalse",aa,{ headers: authHeader() });
        getSubTasks();
      }catch(err){
        console.log(err);
      }
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
       
        try {
          //console.log(newSubTask)
          setonAddSubtask(false)
          setNewSubTask("");
        } catch (err) {
          console.log(err);
        }
      }

      const handleSubmit2 = async (e) => {
        e.preventDefault();
        let subtaskobj={
          description:newSubTask,
          taskId:taskId.taskId,
          completion:false,
          start:new Date(),
          end:null
        }
        try {
          //console.log(subtaskobj);
          const res = await axios.post(API_URL + "addSubtask", subtaskobj,{ headers: authHeader() });
          getSubTasks();
          setNewSubTask("");
        } catch (err) {
          console.log(err);
        }
      }

    return (
        <div class="container">
        
        <div class="items">

        <h2 aria-hidden="true">Done</h2>
        {newSubTaskArr.map((ele,i)=>{
          if(!ele.completion){
            return;
          }
          return <>
            
            <div class="ccl" style={{display:"flex",justifyContent:"space-between"}} ><div id={ele._id} onClick={completionfn2} >{ele.description}</div>
            <div>{timeofCompletion(ele)}</div>
            <div id={ele._id} style={{padding:" 0 10px"}} onClick={deleteSubTasks} >X</div>
            </div>
            
          </>
        })}
           
            <h2  aria-hidden="true">Not Done <button onClick={() => setonAddSubtask(true)}>
            Add
            </button></h2>
            {onAddSubtask && <div class='undone1' >
            <input onChange={(e) => setNewSubTask(e.target.value)} value={newSubTask} placeholder="write something..." style={{width:"80%",margin:"15px 10px"}} type="Text" />
            <button style={{margin:"0 3px"}} onClick={handleSubmit1}> X </button>
            <button style={{margin:"0 3px"}} onClick={handleSubmit2}> Add </button>
            </div>}
            {newSubTaskArr.map((ele,i)=>{
              if(ele.completion){
                return;
              }
              return <>
              <div class="ccl" style={{display:"flex",justifyContent:"space-between"}} ><div id={ele._id} onClick={completionfn1} >{ele.description}</div>
              <div>{timeofCompletion(ele.completion)}</div>
              <div id={ele._id} style={{padding:" 0 10px"}} onClick={deleteSubTasks}>X</div>
              </div>
              </>
            })}
        </div>
        </div>
    )
   

}

export default CheckBox;