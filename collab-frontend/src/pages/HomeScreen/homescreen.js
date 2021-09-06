import Content from '../../components/content/content';
import LeftDiv from '../../components/leftdiv/leftdiv';
import { connect } from 'react-redux';
import "./homescreen.css"
import { setTasks } from '../../redux/popup/popup.action';
import axios from "axios";
import React, { useEffect, useState } from 'react';
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

const HomeScreen=({addtask,user,setTasks})=>{
  const hideAddtask=()=>{
    setTasks();
    setpartnerArr([]);
  }
  let textInput = React.createRef();
  let [partnersArr,setpartnerArr]=useState([]);
  let [formData,setFormData]=useState({});
  let [hid,sethid]=useState(false);
  let [closeSidebar,setcloseSidebar]=useState(true);

  const updateDimensions = () => {
    const width = window.innerWidth
    if(width<800){
      sethid(true)
      setcloseSidebar(false)
    }else{
      sethid(false)
      setcloseSidebar(true)
    }
  }

  window.addEventListener('resize', updateDimensions)

useEffect(updateDimensions,[]);
  const AddPartnerHandler=async(e)=>{
    let email=textInput.current.value;
    console.log(email)
    const response=await axios.get(API_URL + "find/"+email,{ headers: authHeader() });
    console.log(response.data)
    setpartnerArr([...partnersArr,response.data]);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:value.trim()
    });
  };

  const HandleSubmit=async(e)=>{
    e.preventDefault();
    try{
    let arr=[]
    for(let i=0;i<partnersArr.length;i++){
        arr.push(partnersArr[i]._id);
    }
    console.log(arr);
    const newFormData={...formData,partner:arr,owner:user._id}
    console.log(newFormData)
    const response=await axios.post(API_URL + "addTask",newFormData,{ headers: authHeader() });
    alert("Done");
    hideAddtask();
  }catch (error) {
    console.log(error)
  }

  }
    return(
        <div >
        <div className="homeCSS">
        {closeSidebar && <LeftDiv closeSidebar={setcloseSidebar} sidebar={hid}/>}
        <Content sidebar={hid} closeSidebar={setcloseSidebar}/>
        </div>
        {addtask && 
            <div className="homeCSS2 pop" >
   
            <div class="card text-center">
            <div class="card-header">
              Add a new Task
            </div>
            <div style={{overflow:"auto",width:"90%",minWidth:"450px"}} className="card-body">
              
              <form id="my-form"> 
              <div >
              <div className="form-group-sm mb-3">
              <label >Task-Title</label>
              <input  className="form-control" type="text" name="topic" required onChange={handleChange} placeholder="Enter a title"/>
              </div> 
              <div className="form-group-sm mb-3">
              <label >Description</label>
              <textarea style={{height:"150px"}} className="form-control" type="text" name="description" required onChange={handleChange} placeholder="Enter a description"/>
              </div>

              <div class="input-group mb-3">
                <input ref={textInput} type="text" class="form-control" placeholder="Partner email" aria-label="Recipient's username"  aria-describedby="basic-addon2"/>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary " onClick={AddPartnerHandler} type="button">Add</button>
                </div>
              </div>

              <div class="input-group mb-3">
              {partnersArr.map((el)=><span style={{padding:" 0 10px"}}>{el.email} <span style={{border:"1px solid",padding:" 2px"}}>x</span></span>)}
              </div>

              <div className="form-group-sm mb-3">
              <label >Deadline</label>
              <input  className="form-control" type="datetime-local" name="deadline" onChange={handleChange} placeholder="Enter a title"/>
              </div> 
              </div>
              
              </form>
              </div>
            <div className="card-footer text-muted">
            <button type="button" onClick={hideAddtask} className="btn btn-outline-danger">Discard</button>
            <button type="button" form="my-form"  onClick={HandleSubmit} className="btn btn-outline-success">Submit</button>
         
          </div>
          </div>
          </div>
        }
        </div>
        
    )
}

const mapStateToProps=state=>(
  {addtask:state.popup.task_toggler,
  user:state.user.currentUser}
)

const mapDispatchToProps = (dispatch) => {
  return {
    setTasks: () => {
      dispatch(setTasks())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);