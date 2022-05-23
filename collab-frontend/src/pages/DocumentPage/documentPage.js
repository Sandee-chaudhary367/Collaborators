import { useEffect,useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import {API_URL} from "../../variables"
import Document from "../../components/document/Document.jsx"

function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { "x-access-token": user };
  } else {
    return {};
  }
}

const DocumentPage=({user})=>{
  const [docShow,setdocShow]=useState([]);
  //console.log(user._id);
  const getDocument = async () => {
    try {
      const res = await axios.get(API_URL+"userdocuments/" + user._id);
     // console.log(res.data);
      setdocShow(res.data);
      if(res.data.length===0){
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDocument();
  }, []);


  return (
      <div>
      <h1 style={{padding:"0 0 10px 10px"}}>Documents :</h1>
      <div className="chatBox" style={{padding:"0 20px 10px 20px"}}>
            <div>
                  <div style={{overflow:"scroll",height:"560px"}}>
                    {docShow.map((m) => {
                      return (
                        <div>
                         <Document document={m}></Document>
                        </div>
                      )
                    })}
                  </div>
            </div>
      </div>
      </div>
)};

const mapStateToProps=state=>(
    {user:state.user.currentUser}
)

export default connect(mapStateToProps,null)(DocumentPage);