import {Greeter,LighterText,SearchTaskContainer,BoldText,TaskTabs,Tabs,TaskContainer} from "./previewTasks.styles"
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskShow from "../TaskShow/TaskShow";
import TaskCard from "../TaskCard/TaskCard";
import {API_URL} from "../../variables"

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user) {
      // For Spring Boot back-end
      // return { Authorization: "Bearer " + user.Token };
  
      // for Node.js Express back-end
      return { "x-access-token": user };
    } else {
      return {};
    }
  }

const PreviewTasks=({user})=>{
    let PreviewTasksStyles={
        width:"58%",
        maxWidth:"592px",
        minWidth:"450px",  
    }

    let textInput = React.createRef();
    const [Loading,setLoading]=useState(true);
    const [searchMode,setSearchMode]=useState(false);
    const [task,setTask]=useState([]);
    const [task2,setTask2]=useState([]);
    const [url,setUrl]=useState("myAllTasks");

    const loadTask=async()=>{
        try{
        const response=await axios.get(API_URL + url,{ headers: authHeader() });
            setTask(response.data)
            setLoading(false);
        }catch(e){
            console.log(e);
        }

    }
 
    useEffect(()=>{
       loadTask();
    },[url])

    const searchpath=(e)=>{
        console.log(e.target.id)
        setUrl(e.target.id)
    }

    let enableSearchMode=async()=>{
        try{
        let topic=textInput.current.value;
        console.log(textInput);
        if(topic===""){
            setSearchMode(!searchMode);  
            return;
        }
        const response=await axios.post(API_URL + "searchTasks",{searchString:topic},{ headers: authHeader() });
        setTask2(response.data)
        setSearchMode(!searchMode);
        
        }catch(e){
            setSearchMode(!searchMode);  
        }
    }

    return (
    
    <div style={PreviewTasksStyles}>
        <Greeter>
        <LighterText>Hello, <span id="nm1">{user.name}</span>!!</LighterText>
        <BoldText>You've got</BoldText>
        <BoldText>8 tasks today 📄</BoldText>
        </Greeter>

        <div  style={{width:"100%",maxWidth:"592px",minWidth:"450px", paddingLeft:"10px"}} class="input-group mt-4 mb-1">
        <input type="text" ref={textInput} class="form-control" placeholder="Search Tasks"/>
        <div class="input-group-append">
          <span class="input-group-text" onClick={enableSearchMode} id="basic-addon2">{searchMode?"x":"-->"}</span>
        </div>
      </div> 
      
     {searchMode?<TaskShow Component={TaskCard} task={task2}></TaskShow>:
      <div>
        <Greeter>
            <BoldText>My Tasks</BoldText>
        </Greeter>

        <TaskTabs>
            <Tabs style={{paddingLeft:"10px"}} active={url==="myAllTasks"}  onClick={searchpath} id="myAllTasks">All</Tabs>
            <Tabs active={url==="collabTasks"} onClick={searchpath} id="collabTasks">Collab</Tabs>
            <Tabs active={url==="myTasksonly"} onClick={searchpath} id="myTasksonly">My</Tabs>
            <Tabs active={url==="tasksCloseToDeadline"} onClick={searchpath} id="tasksCloseToDeadline">Upcoming</Tabs>
            <Tabs active={url==="missedTasks"} onClick={searchpath} id="missedTasks">Missed</Tabs>
        </TaskTabs>

        {Loading ? null:
        <TaskShow task={task}></TaskShow>
        }
        </div>
    }
     </div>
    
    )
}

const mapStateToProps=state=>(
    {user:state.user.currentUser}
)
export default connect(mapStateToProps,null)(PreviewTasks);