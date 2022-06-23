import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {API_URL} from "../../variables"

let dat={"date": "2022-02-04",
"total": 17164,
"details": [{
  "name": "Project 1",
  "date": "2022-02-04 12:30:45",
  "value": 9192
}],"summary":[{
  "name": "Project 1",
  "value": 9192
}]}

function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { "x-access-token": user };
  } else {
    return {};
  }
}

const Profile=({user})=>{
  let heatmap=user.heatmap;
  let array=[];
  let [logs,setlogs]=useState([]);

  let getLogs=async () => {
    const response=await axios.get(API_URL + "returnlog",{ headers: authHeader() });
    //console.log(response.data);
    setlogs(response.data.logs.reverse());
  }

  useEffect(() => {
      getLogs();
  }, []);

  for(let i=0;i<12;i++){
    for(let j=0;j<heatmap[i].length;j++){
       let year=new Date().getFullYear();
       let mm=i+1;
       let dd=j+1;
       let val=heatmap[i][j];
      // console.log(year+"-"+mm+"-"+dd+":"+val);
       if(val===0){
         continue;
       }
       let obj={
         date:`${year}-${mm}-${dd}`,
         count:val
       }
       array.push(obj);
    }
  }

  const [photo,setPhoto] =useState(null)

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);
  }

  let SubmitPhoto=async()=>{
    const formData = new FormData();
    formData.append('ProfilePic', photo)
    formData.append('_id',user._id)
    try{
    const res=await axios.post(API_URL + "addProfilePic",formData,{ headers: authHeader()});
    window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

    return (
    <div style={{height :"100vh",overflowY:"scroll"}}>
   
    <div style={{margin:'40px 40px'}}>
    <div class="card">
    <div style={{display:"flex"}}>
    <img style={{width:"210px",height:"220px"}} src={`${API_URL}getProfilepic/${user.profilePic}`}/>
    <div style={{display:"flex",flexDirection:"column"}}>
    <div class="card-body">
      <h5 class="card-title">{user.name}</h5>
      <p class="card-text"><small class="text-muted">{user.designation}</small></p>
      
       <form>
       
        <div className="form-group-sm mb-3">
          <label >Photo</label><br/>
          <input type="file" name="Photo" style={{border:"black 2px solid"}} onChange={handlePhoto} className="custom-file-input" />
          <button onClick={SubmitPhoto} style={{height:"38px",margin:"0 0 0 10px"}} class="btn btn-secondary bg-primary" type="button">Upload</button>
          </div>
      </form>

    </div>
    {/*<div style={{margin:"20px 10px"}}>
    <a href="#" style={{background:"darkblue",color:"white"}} class="btn">Friends</a>
    </div>*/}
    
    </div>
    </div>
    </div>
    

    <div style={{margin:'40px 0px'}}  >
    <div class="card">
    <CalendarHeatmap
    startDate={new Date('2021-12-31')}
    endDate={new Date('2022-12-31')}
    values={array}
    />
    </div>
    </div>

    <div style={{margin:'40px 0px'}}  >
    <div class="card" style={{padding:'10px 10px'}}>
    <h5 class="card-title" style={{padding:"7px 0",borderBottom:"solid 2px black"}}>Work Updates</h5>
    <div style={{height:"400px",overflowY:"scroll"}} >
    {
      logs && logs.map((ele,i)=>{
        return(
          <p style={{padding:"7px 0",}}>
          {`${i+1}.  ${ele.message}`}
          </p>
        )
      })
    } 
    </div>                             

    </div>

  
    </div>


    </div>
    </div>
    )
}
const mapStateToProps=state=>(
    {user:state.user.currentUser}
  )

export default connect(mapStateToProps,null)(Profile)