import React ,{useState}from "react";
import {HomePageContainer,Heading} from '../homepage/homepage.styles'
import axios from "axios";
import { connect } from 'react-redux';
import { setCurrentUser } from "../../redux/user/user.action";
import {API_URL} from "../../variables"
import {Link} from 'react-router-dom';

const SignUp=({history,setuser})=>{

  const [formData, updateFormData] = useState({});
  const[message,setmessage]=useState("");
  const handleChange = (e) => {
    setmessage('');
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
     
      if(formData.password!==formData.conpassword){
        alert("password and confirm password do not match")
        return;
      }

      const {conpassword,...data}=formData;
      console.log(data)
      
      const response=await axios.post(API_URL + "signup", data);
      setmessage(response.data.message)
      console.log(response.data)
      if (response.data.Token) {
        localStorage.setItem("user", JSON.stringify(response.data.Token));
      }
      setuser(response.data)
      history.push('/')
     ;

    } catch (error) {
      console.log(error)
      
    }
}


  return(
  <HomePageContainer>
  <Heading>Sign Up</Heading>
  <div className="card mt-3" style={{background:"transparent",border:"solid 2px darkblue"}}>
  <div className="card-body">
  <form  onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" name="name" onChange={handleChange} required id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Enter username"/>
  </div>
  <div className="form-group">
    <label>Email address</label>
    <input type="email" className="form-control" name="email" onChange={handleChange} required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
  <label>Designation</label>
  <input type="text" className="form-control" name="designation" onChange={handleChange} required id="designation1" aria-describedby="emailHelp" placeholder="Enter designation"/>
</div>
  
  <div className="form-group">
    <label>Age</label>
    <input type="Number" className="form-control" name="age" onChange={handleChange} required id="age1" placeholder="age"/>
  </div>
  <div className="form-group">
  <label>Phone No</label>
  <input type="Number" className="form-control" name="phone_No" onChange={handleChange} required id="phone_No1" placeholder="phone_No"/>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" name="password" onChange={handleChange} required id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" name="conpassword" onChange={handleChange} required id="exampleInputPassword2" placeholder="Password"/>
  </div>
  <br></br>
  <div class="d-flex justify-content-between">
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link  style={{paddingTop:"12px"}} to="/login">Sign in</Link>
  </div>
 
  </form>

  </div>
  </div>
  {message && <div>
    <h4 class="alert-heading text-success mt-3">{message}</h4>
    </div>}
  </HomePageContainer>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    setuser: (id) => {
      dispatch(setCurrentUser(id))
    }
  }
}
export default connect(null,mapDispatchToProps)(SignUp);
