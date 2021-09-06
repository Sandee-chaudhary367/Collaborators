import { useEffect, useState } from "react";
import PreviewProfile from "../../components/homepage's-PreviewProfile/previewProfile";
import PreviewTasks from "../../components/homepage's-PreviewTasks/previewTasks";


const HomePage = ()=>{
    let [whichtoshowbar,setWhichToShowBar]=useState(false);
    let [L1,setL1]=useState(1);
    let contentArea={
        width:"100%", 
        display:"flex",
        justifyContent:"space-around" 
    }

  const updateDimensions = () => {
    const width = window.innerWidth
    if(width<1092){
     setWhichToShowBar(true);
     setL1(1);
    }else{
     setWhichToShowBar(false);
    }
  }

  useEffect(updateDimensions,[])
  let toSelectL1Fn=(e)=>{ 
    let id=e.target.id
   
    if(id==1){
        console.log(id)
        setL1(1)
    }else{
        console.log(id)
        setL1(2);
    }
  }

  window.addEventListener('resize', updateDimensions)
    return (
        <div>
        {whichtoshowbar && <div style={{width:"100%",display:"flex",justifyContent:"space-evenly"}}>
        <h5 id={1} style={{color:L1===1?"darkblue":"",textDecoration:L1===1?"underline":""}} onClick={toSelectL1Fn} >All</h5>
        <h5 id={2} style={{color:L1===1?"":"darkblue",textDecoration:L1===1?"":"underline"}} onClick={toSelectL1Fn} >Todays</h5>
        </div>}

     {!whichtoshowbar && <div style={contentArea}>
        <PreviewTasks/>
        <PreviewProfile/>
     </div> }
     
     {whichtoshowbar && <div style={contentArea}>
        {L1===1?<PreviewTasks/>:<PreviewProfile/>}
       
     </div> } 

     </div>
    )
}

export default HomePage;