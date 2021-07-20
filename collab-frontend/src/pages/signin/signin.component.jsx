import React ,{useState}from "react";
import {HomePageContainer,Heading} from '../homepage/homepage.styles'
import axios from "axios";
import { connect } from 'react-redux';
import { setCurrentUser } from "../../redux/user/user.action";
import {useHistory,Link} from 'react-router-dom';



const SignIn=({setuser})=>{
  const [formData, updateFormData] = useState({});
  const API_URL = "https://deep-collaborators.herokuapp.com/";
  const history = useHistory()
  const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
     
      const {...data}=formData;
      console.log(data);

      const response=await axios.post(API_URL + "login", data);
      console.log(response.data)
      if (response.data.Token) {
        localStorage.setItem("user", JSON.stringify(response.data.Token));
      }
      setuser(response.data)
      history.push('/')

    } catch (error) {
      console.log(error)
    }
}


  return(
    <HomePageContainer>
    <Heading>Sign In</Heading>
    <div className="card mt-3">
    <div className="card-body">
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Email address</label>
      <input type="email" className="form-control" required name="email" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type="password" className="form-control" required name="password" onChange={handleChange} id="exampleInputPassword1" placeholder="Password"/>
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    <Link to="/signup">Sign up</Link>
    </div>
    </HomePageContainer>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    setuser: (id) => {
      dispatch(setCurrentUser(id))
    }
  }
}
export default connect(null,mapDispatchToProps)(SignIn);
