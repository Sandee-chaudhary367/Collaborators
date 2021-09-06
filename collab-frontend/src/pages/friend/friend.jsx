import axios from "axios";
import React, { useState,useEffect } from 'react';
import {API_URL} from "../../variables"
import { connect } from 'react-redux';
import {PartnerImage} from "../../components/TaskCard/taskCard.styles.js"
import { setCurrentUser } from '../../redux/user/user.action';

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return { "x-access-token": user };
    } else {
      return {};
    }
}

const Friend=({friends,setuser})=>{
   let [arr,setArr]=useState([]);
   let [request,setRequest]=useState([]);
   let [sent,setSent]=useState([]);
   let [search,setSearch]=useState([]);
   let [req_sent,setReq_Sent]=useState(true);
   let [Data,setData]=useState({});

   let dothis=async()=>{ 
    let an=[];
    let bn=[];
    let cn=[];
    
    friends.forEach(async(el)=>{
        const response=await axios.get(API_URL + "minInfo/"+el,{ headers: authHeader() });
        an.push(response.data);
           
    })

    const response1=await axios.get(API_URL + "myRequest",{ headers: authHeader() });
    bn=response1.data;

    const response2=await axios.get(API_URL + "mySent",{ headers: authHeader() });
    cn=response2.data;
  
    setArr(an);
    setRequest(bn);
    setSent(cn);
}

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({
        ...Data,
        [name]:value.trim()
      });
    };


    const handleSubmit=async(e)=>{
      if(e.key === 'Enter'){
        // console.log(Data.email);
        const response=await axios.get(API_URL + "minInfoemail/"+Data.email,{ headers: authHeader() });
        setSearch(response.data);    
      }
    }

    useEffect(()=>{dothis()},[friends])

    let contentArea={
        margin:"10px"
    }

    const withdrawRequest=async(e)=>{
        let id=e.target.id;
        console.log(id);
        let data={_id:id}
        try {
          let res=await axios.delete(API_URL + "deleteRequest",{ headers: authHeader(),data});
          if(res.data!=="Done"){
            return;
          }
          const response2=await axios.get(API_URL + "mySent",{ headers: authHeader() });
          setSent(response2.data);
        } catch (error) {
          console.log(error);;
        }
    }

    const DenyingRequest=async(e)=>{
      let id=e.target.id;
      console.log(id);
      let data={_id:id}
        try {
          let res=await axios.delete(API_URL + "deleteRequest",{ headers: authHeader(),data});
          if(res.data!=="Done"){
            return;
          }
          const response1=await axios.get(API_URL + "myRequest",{ headers: authHeader() });
          setRequest(response1.data);
        } catch (error) {
          console.log(error);;
        }
  }

  const AcceptRequest=async(e)=>{
    let ids=e.target.id;
   let arrId=ids.split("/");
   console.log(arrId[0]+" "+arrId[1]);
    let data2={_id:arrId[0]}
    let data={_id:arrId[1]}
      try {
         let res=await axios.post(API_URL + "addFriend",data2,{ headers: authHeader()});
         setuser(res.data);
        await axios.delete(API_URL + "deleteRequest",{ headers: authHeader(),data});
      } catch (error) {
        console.log(error);
      }
}

 let unfriend=async(e)=>{
  let id=e.target.id;
  let data={_id:id}
    try {
      let res=await axios.post(API_URL + "unFriend",data,{ headers: authHeader()});
      console.log(res.data);
      setuser(res.data);
    } catch (error) {
      console.log(error);;
    }
 }


    return (
    <div style={contentArea}>
    <div style={{display:"flex"}}>
     <div style={{padding:"10px 0"}}>
        <h1 >Friends</h1>
        </div>
   
    
<div style={{padding:"19px 180px 0 178px" ,height:"50px"}} class="input-group mb-3">
<input type="text" class="form-control" name="email" onChange={handleChange} onKeyPress={handleSubmit} placeholder="Search" />
</div>
   
    </div>
    {search.length>0 &&  <div style={{padding:"19px 180px 0 180px",width:"519px" ,height:"500px",background:"white",position:"absolute",left:"571px",top:"69px",zIndex:"100"}}>
    {
      search.map((el)=>{
        return (<div style={{margin:"4px 0",left:"-160px" ,width:"480px"}} class="card">
        <div class="card-body">
        <h5 id={el._id} class="card-title"><a href={`/profile/${el._id}`}>{el.name}</a></h5>
        </div>
      </div>)
      })
    }
    </div>

    }

    <div style={{display:"flex",padding:"20px 0 0 0"}}>
    <h5 onClick={()=>{setReq_Sent(true)}} style={{padding:"0 10px 0 0",color:req_sent?"darkblue":"black",textDecoration:req_sent?"underline":"",cursor:"pointer"}}>Request Recieved</h5>
    <h5 onClick={()=>{setReq_Sent(false)}} style={{padding:"0 10px",color:req_sent?"black":"darkblue",textDecoration:req_sent?"":"underline",cursor:"pointer"}}>Request sent</h5>
    </div>
    
    {
      <div style={{margin:"5px 10px 0 0",padding:"10px 0 10px 0",height:"200px",overflow:"auto"}} class="card">
          { req_sent?
            request.map((el)=>{
                return(
                  <div style={{padding:"4px 15px 4px 15px"}}>
                  <div style={{display:"flex",justifyContent:"space-between"}} >
                  <div style={{display:"flex",alignItems:"center"}}>
                <PartnerImage src={`${API_URL}getProfilepic/Image/${el.Requester}`}/>
                <h5 id={`${el.Approver}/${el.Requester}/1`} style={{padding:"0 0 0 10px"}} class="card-title"><a style={{color:"black",textDecoration:"none"}} href={`/profile/${el.Requester}`}>{el.RequesterName}</a></h5>
                </div>
                  <div style={{display:"flex"}}>
                  <button id={`${el.Requester}/${el._id}`} onClick={AcceptRequest} style={{background:"darkblue",color:"white",margin:"0 5px",height:"40px"}} class="btn">Accept</button>
                  <button id={el._id} onClick={DenyingRequest} style={{background:"grey",color:"white",margin:"0 5px",height:"40px"}} class="btn">Deny</button>
                  </div>
                </div>
               
              </div>
                )
            }):sent.map((el)=>{
              return(
                <div style={{padding:"4px 15px 4px 15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}} >
                <div style={{display:"flex",alignItems:"center"}}>
              <PartnerImage src={`${API_URL}getProfilepic/Image/${el.Approver}`}/>
              <h5 id={`${el.Approver}/${el.Requester}/1`} style={{padding:"0 0 0 10px"}} class="card-title"><a style={{color:"black",textDecoration:"none"}} href={`/profile/${el.Approver}`}>{el.ApproverName}</a></h5>
              </div>
                <button id={el._id} onClick={withdrawRequest} style={{background:"#929214",color:"white",height:"40px"}} class="btn">Request Sent</button>
              </div>
             
            </div>
              )
          })
          }
      </div>
    }
      

    <div style={{display:"flex",padding:"20px 0 0 0"}}>
    <h5 style={{padding:"0 10px 0 0"}}>Your Friend</h5>
  
    </div>
    
    {arr &&
      <div style={{margin:"5px 12px 0 0",padding:"10px 0 10px 0" ,height:"220px",overflow:"auto"}} class="card">
      {
            arr.map((el)=>{
                return (
               
                <div style={{padding:"4px 15px 4px 15px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}} >
                <div style={{display:"flex",alignItems:"center"}}>
                <PartnerImage src={`${API_URL}getProfilepic/Image/${el._id}`}/>
                <h5 id={el._id} style={{padding:"0 0 0 10px"}} class="card-title"><a style={{color:"black",textDecoration:"none"}} href={`/profile/${el._id}`}>{el.name}</a></h5>
                </div>
                <button id={el._id} onClick={unfriend} style={{background:"red",color:"white",height:"40px"}} class="btn">Unfriend</button>
                </div>
              </div>)
            })  
        }</div>
        
        
        
    }

     </div>  
    )   
}

const mapStateToProps=state=>(
    {friends:state.user.currentUser.friends}
  )

  const mapDispatchToProps = (dispatch) => {
    return {
      setuser: (id) => {
        dispatch(setCurrentUser(id))
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Friend)