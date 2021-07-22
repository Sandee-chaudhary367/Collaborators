import TaskCard from "../TaskCard/TaskCard";
import {TaskContainer} from "./TaskShow.styles"

let TaskShow=({task})=>{
    
    return (
    <TaskContainer>
        { task.length!==0 ? task.map((el,i)=>(
                <TaskCard data={task[i]}></TaskCard>
        )):
        <div style={{height:"550px",margin:"130px auto"}}>
        No Task
        </div>
    }
    </TaskContainer>
    )
}

export default TaskShow;