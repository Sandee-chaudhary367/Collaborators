import {TaskContainer} from "./TaskShow.styles"

let TaskShow=({task,Component})=>{
    console.log(Component.name);
    return (
    <TaskContainer ss={Component.name}>
        { task.length!==0 ? task.map((el,i)=>(
                <Component data={task[i]}></Component>
        )):
        <div style={{height:`${Component.name==="TaskCard" ? "550px":"200px"}`,margin:`${Component.name==="TaskCard"?"130px auto":"43px auto"}`}}>
        {Component.name==="TaskCard" ?  "No Task":"No deadlines today"}
        </div>
    }
    </TaskContainer>
    )
}

export default TaskShow;