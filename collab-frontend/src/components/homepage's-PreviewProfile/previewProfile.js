import { AddTask, ProfileImage, ProfileText, ProfileViewer } from "./previewProfile.styles";
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import { setTasks } from "../../redux/popup/popup.action";
import { useEffect, useState } from "react";
import "./preview.style.css"
import {API_URL} from "../../variables"
import TaskShow2 from "../TaskShow/TaskShow2";

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

const PreviewProfile=({user,setTasks})=>{
    const [Loading,setLoading]=useState(true);
    const [value, onChange] = useState(new Date());
    const [task,setTask]=useState([]);

    const loadTask=async()=>{
      try{
      let dat=new Date();
      const date= `${dat.getFullYear()}-${ String(dat.getMonth()+1).padStart(2, '0')}-${String(dat.getDate()).padStart(2, '0')}`;
      const response=await axios.get(API_URL + "todayDeadlines/"+date,{ headers: authHeader() });
          setTask(response.data)
          setLoading(false);
      }catch(e){
          console.log(e);
      }

  }

  const showThisDateDeadline=async(value,e)=>{
    const date= `${value.getFullYear()}-${ String(value.getMonth()+1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
   const response=await axios.get(API_URL + "todayDeadlines/"+date,{ headers: authHeader() });
   setTask(response.data)
 }

 const WeekendColor=({ activeStartDate, date, view }) => (date.getDay() === 0 || date.getDay() === 6)  ? "wed" : null;

  useEffect(()=>{
     loadTask();
  },[])
    const addtasks=()=>{
        setTasks();
    }

    return (
        <div style={{padding:"0 22px 0 22px"}}>
        <ProfileViewer>
        <ProfileImage src={`${API_URL}getProfilepic/${user.profilePic}`}></ProfileImage>
        <div style={{display:"flex",flexDirection:"column",padding:"10px 5px 5px 10px "}}>
        <ProfileText style={{fontWeight:"600"}}>{user.name}</ProfileText>
        <ProfileText style={{color:"grey"}}>{user.designation}</ProfileText>
        </div>
        </ProfileViewer>

        <div style={{margin:"10px 0 0px 0"}} class="ButtonDiv">
           
            <AddTask id="tb" onClick={addtasks} type="button"
            >+ Add Tasks</AddTask>
        </div>

        <div style={{margin:"10px 0 10px 0"}}>
        <Calendar hover tileClassName={WeekendColor} onClickDay={showThisDateDeadline} view="month" className="back wed" value={value} />
        </div>

        {Loading ? null:
          <TaskShow2 task={task}></TaskShow2>
        }

        </div>
    );
}

const mapStateToProps=state=>(
    {user:state.user.currentUser}
)

const mapDispatchToProps = (dispatch) => {
    return {
      setTasks: () => {
        dispatch(setTasks())
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(PreviewProfile);
