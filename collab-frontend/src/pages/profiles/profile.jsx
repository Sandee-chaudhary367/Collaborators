import { useState } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import {API_URL} from "../../variables"

function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { "x-access-token": user };
  } else {
    return {};
  }
}

const Profile=({user})=>{
  //  console.log(user);
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
    console.log(res)
    window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

    return (
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
          <input type="file" name="Photo" style={{border:"black 2px solid"}} onChange={handlePhoto} className="custom-file-input" name="Photo"/>
          <button onClick={SubmitPhoto} style={{height:"38px",margin:"0 0 0 10px"}} class="btn btn-secondary bg-primary" type="button">Upload</button>
          </div>
      </form>

    </div>
    {/*<div style={{margin:"20px 10px"}}>
    <a href="#" style={{background:"darkblue",color:"white"}} class="btn">Friends</a>
    </div>*/}
    
    <div>
    
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