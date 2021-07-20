import React from "react"
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';


const PrivateRoutes2=({currentUser,component:Component,...rest})=>{
   
    return (
        <Route {...rest} render ={props=>{
            return currentUser ?<Redirect to="/" />:<Component {...props}/>
        }}>
        </Route>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });
  
  export default connect(mapStateToProps)(PrivateRoutes2);