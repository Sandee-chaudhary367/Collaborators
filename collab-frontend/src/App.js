import './App.css';
import HomeScreen from './pages/HomeScreen/homescreen';
import {Switch, Route,useHistory} from 'react-router-dom';
import SignIn from "./pages/signin/signin.component"
import SignUp from "./pages/signup/signup.component"
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { useEffect, useState } from 'react';
import axios from "axios";
import PrivateRoutes from './components/PrivateRoutes'
import PrivateRoutes2 from './components/PrivateRoutes2'
import {API_URL} from "./variables"


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


const App=({setuser})=> {
  const [Loading,setLoading]=useState(true);
  const history = useHistory()

  const CheckToken=async()=>{
    try{
    const response=await axios.get(API_URL + "myProfile",{ headers: authHeader() });
    await setuser(response.data)
    setLoading(false);
    // history.push("/dashboard")
    }catch(e){
      console.log(e);
      setLoading(false);
      history.push("/login")
    } 
  }

  useEffect(()=>{
     CheckToken()
  },[])
  
  return (
    <div className="App">
    {Loading ? null:
    <Switch>
    <PrivateRoutes2 path='/login' component={SignIn} />
    <PrivateRoutes2 path='/signup' component={SignUp} />
    <Route  path='/' component={HomeScreen} />
    </Switch>
    }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setuser: (id) => {
      dispatch(setCurrentUser(id))
    }
  }
}

export default connect(null,mapDispatchToProps)(App);
