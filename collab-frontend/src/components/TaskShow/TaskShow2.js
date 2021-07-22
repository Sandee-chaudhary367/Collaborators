import TaskCard2 from "../TaskCard/TaskCard2";
import {TaskContainer2} from "./TaskShow.styles"

let TaskShow2=({task})=>{
    
    return (
    <TaskContainer2 >
        {task.length!==0 ? task.map((el,i)=>(
            <TaskCard2 data={task[i]}></TaskCard2>
        )):
        <div style={{height:"200px",margin:"43px auto"}}>
        No deadlines today
        </div>
    }
    </TaskContainer2>
    )
}

export default TaskShow2;