import { useEffect, useState } from "react";
import axios from "axios";
import {API_URL} from "../../variables"
import { PartnerImage} from "../TaskCard/taskCard.styles"

function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return { "x-access-token": user };
    } else {
      return {};
    }
}

const Taskbox=({match})=>{
    let [data,setData]=useState(null);
    let [loading,setLoading]=useState(false);
    useEffect(async()=>{
        const response=await axios.get(API_URL + "TaskbyId/"+match.params._id,{ headers: authHeader() });
        setData(response.data);
        setLoading(true);
    },[])

    return (
        <div>
        {loading && <div><div style={{display:"flex",alignItems:"baseline"}}>
        <h1>{data.topic.toUpperCase()}</h1>
        <h5 style={{padding:"0 10px 0 20px",fontSize:"16px",color:"darkblue"}}>Progress : {data.completion}%</h5>
        <h5 style={{padding:"0 10px",fontSize:"16px",color:"darkblue"}}>Deadline : {data.deadline}</h5>
        </div>
        <div style={{display:"flex"}}>
        <PartnerImage src={`${API_URL}getProfilepic/Image/${data.owner}`}/>
        {
        data.partner.map((el)=>{
            return (<PartnerImage src={`${API_URL}getProfilepic/Image/${el}`}/>)
        })
        }
        </div>

        <p style={{fontSize:"16px",padding:0,margin:0}}>{data.description}</p>
        </div>}
        </div>
    )


}

export default Taskbox;