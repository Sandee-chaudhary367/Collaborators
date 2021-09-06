import { useEffect, useState } from "react";
import axios from "axios";
import {API_URL} from "../../variables"
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.action.js';

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return { "x-access-token": user };
    } else {
      return {};
    }
}

const OtherProfile=({match,friends,user_id,setuser})=>{
      let [user,setUser]=useState(null);
      let [friendStatus,setFriendStatus]=useState(0);
      let [loading,setLoading]=useState(true);
     let getprofile=async()=>{
        const response=await axios.get(API_URL + "profile/"+match.params._id,{ headers: authHeader() });
        if(!response){
          return;
        }
        setUser(response.data);
        let Personid=response.data._id;
        let ans=friends.find((id)=>{
          return (id===Personid)});
        if(user_id===Personid){
          return;
        }
        if(ans){
          setFriendStatus(1);//unfriend
        }else{
          const response1=await axios.get(API_URL + "alreadyReceived/"+match.params._id,{ headers: authHeader() });
          if(response1.data){
            setFriendStatus(2);//Request Received
          }else{
            const response2=await axios.get(API_URL + "alreadySent/"+match.params._id,{ headers: authHeader() });
            if(response2.data){
              setFriendStatus(3);//Request sent
            }else{
              setFriendStatus(4);//friend
            }
          }
        }
     }

     const withdrawRequest=async()=>{
      let Requester=user_id;
      let Approver=user._id;
      let data={Requester,Approver}
        try {
          await axios.delete(API_URL + "deleteRequest2",{ headers: authHeader(),data});
          setFriendStatus(4)
        } catch (error) {
          console.log(error);;
        }
  }

     const DenyingRequest=async()=>{
      let Requester=user._id;
      let Approver=user_id;
      let data={Requester,Approver}
        try {
          await axios.delete(API_URL + "deleteRequest2",{ headers: authHeader(),data});
          setFriendStatus(4)
        } catch (error) {
          console.log(error);;
        }
  }


     let unfriend=async(e)=>{
      let id=e.target.id;
      console.log(id);
      let data={_id:id}
        try {
          let res=await axios.post(API_URL + "unFriend",data,{ headers: authHeader()});
          setuser(res.data)
          setFriendStatus(4)
         
        } catch (error) {
          console.log(error);;
        }
     }
    
    const Requester=async()=>{
      try {
        let Personid=user._id;
        let obj={
          Approver:Personid,
          ApproverName:user.name,
          Type:"FRIEND_REQUEST"
        }
        const response=await axios.post(API_URL + "addRequest",obj,{ headers: authHeader() });
        setFriendStatus(3)
      } catch (error) {
        console.log(error);
      }
        
    }

    
  const AcceptRequest=async(e)=>{
    let Requester=user._id;
      let Approver=user_id;
      let data={Requester,Approver}
      try {
        let res=await axios.post(API_URL + "addFriend",{_id:Requester},{ headers: authHeader()});
        setuser(res.data)
        await axios.delete(API_URL + "deleteRequest2",{ headers: authHeader(),data});
        setFriendStatus(1)
      } catch (error) {
        console.log(error);;
      }
}
    
      useEffect(()=>{
        getprofile();
      },[])

 
      return (
         
      <div style={{margin:'40px 40px'}}>
      {user &&  <div class="card">
      <div style={{display:"flex"}}>
      <img style={{width:"210px",height:"220px"}} src={`${API_URL}getProfilepic/${user.profilePic}`}/>
      <div style={{display:"flex",flexDirection:"column"}}>
      <div class="card-body">
        <h5 class="card-title">{user.name}</h5>
        <p class="card-text"><small class="text-muted">{user.designation}</small></p>
        
      </div>
      <div style={{margin:"20px 10px"}}>
     {friendStatus===1 && <button id={user._id} onClick={unfriend} style={{background:"red",color:"white"}} class="btn">Unfriend</button>}
     {friendStatus===2 && <div style={{display:"flex"}}>
     <button onClick={AcceptRequest} style={{background:"darkblue",color:"white",margin:"0 5px"}} class="btn">Accept</button>
     <button onClick={DenyingRequest}  style={{background:"grey",color:"white",margin:"0 5px"}} class="btn">Deny</button>
     </div>}
     {friendStatus===3 && <button onClick={withdrawRequest}  style={{background:"#929214",color:"white"}} class="btn">Request Sent</button>}
     { friendStatus===4 && <button onClick={Requester} style={{background:"darkblue",color:"white"}} class="btn">friend</button>}
      </div>
      
      <div>
      
      </div>
      </div>
      
      </div>
      </div>}
     
      </div>
      
      )
  }

  const mapStateToProps=state=>(
    {friends:state.user.currentUser.friends,
    user_id:state.user.currentUser._id}
  )

  const mapDispatchToProps = (dispatch) => {
    return {
      setuser: (id) => {
        dispatch(setCurrentUser(id))
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(OtherProfile)