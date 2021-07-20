import React from "react"
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';


const PrivateRoutes=({currentUser,component:Component,...rest})=>{
   console.log("hrllo "+currentUser)
    return (
        <Route {...rest} render ={props=>{
            return currentUser ?<Component {...props}/>:<Redirect to="/login" />
        }}>
        </Route>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });
  
  export default connect(mapStateToProps)(PrivateRoutes);