import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {Route,Switch} from "react-router-dom"
import friend from "../../pages/friend/friend";
import homepage from '../../pages/main/homepage';
import OtherProfile from "../../pages/profiles/otherProfile";
import profile from "../../pages/profiles/profile";
import DocumentPage from "../../pages/DocumentPage/documentPage"
import PrivateRoutes from '../PrivateRoutes'
import Taskbox from "../Taskbox/Taskbox";


const Content =({closeSidebar,sidebar})=>{
    let contentArea={
        width:"100%",  
        height:"100vh",
    }
 
    let openClosebar=()=>{
        closeSidebar(true)
    }
    return (
        <div style={contentArea}>
        {sidebar && <h2 onClick={openClosebar} style={{position:"fixed",top:"11.5%"}}>{">"}</h2>}
        <Switch>
        <PrivateRoutes exact path='/' component={homepage} />
        <PrivateRoutes exact path='/team' component={friend} />
        <PrivateRoutes exact path='/analytics' component={profile} />
        <PrivateRoutes  path='/Taskbox/:_id' component={Taskbox} />
        <PrivateRoutes  path='/documents' component={DocumentPage} />
        <Route exact path='/profile/:_id' component={OtherProfile} />
       
        </Switch>
        </div>
    )
}

export default Content
