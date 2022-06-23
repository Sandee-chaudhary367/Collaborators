import {Navheading, NavheadingContainer,AddTask } from "./leftdiv.styles"
import Dashboard from '../../Image/Dashboard.png';
import analytics from '../../Image/analytics.png';
import team from '../../Image/team.png';
import documents from '../../Image/documents.png';
import settings from '../../Image/settings.png';
import {useHistory,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Logout } from '../../redux/user/user.action';


const LeftDiv=({sidebar,closeSidebar,logoutUser})=>{
    let imgStyle={ width:"48px",height:"30px",padding:" 0 10px"}
    const history = useHistory();

    const logou=()=>{
        localStorage.setItem("user","");
        logoutUser();
        history.push("/login")

    }

    const closeSideBarFN=()=>{
     
      closeSidebar(false);
      
    }
    return (

        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",position:sidebar?"fixed":"",zIndex:sidebar?"11":"",background:sidebar?"grey":"",height:'100%'}}>
        {sidebar && <h2 onClick={closeSideBarFN} style={{position:"absolute",left:"220px"}}>X</h2>}
        <NavheadingContainer>
        <Navheading active={  window.location.pathname === '/' }><img style={imgStyle} src={Dashboard} alt="" /><Link style={{color:`${window.location.pathname === '/'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}} to="/">Dashboard</Link></Navheading>
        <Navheading active={  window.location.pathname === '/analytics' }><img style={imgStyle} src={analytics} alt="" /><Link style={{color:`${window.location.pathname === '/analytics'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}}  to="/analytics">Analytics</Link></Navheading>
        <Navheading active={  window.location.pathname === '/team' }><img style={imgStyle} src={team} alt="" /><Link style={{color:`${window.location.pathname === '/team'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}}  to="/team">Teams</Link></Navheading>
        <Navheading active={  window.location.pathname === '/documents' }><img style={imgStyle} src={documents} alt="" /><Link style={{color:`${window.location.pathname === '/documents'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}} to="/documents">Documents</Link></Navheading>
        </NavheadingContainer>
        
        <div style={{ marginBottom: "32px"}}>
         <div style={{padding:"6px",border:"solid 1px black"}}>   
         <AddTask id="lg" onClick={logou} type="button">LOGOUT</AddTask>
         </div>
        </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      logoutUser: () => {
        dispatch(Logout())
      }
    }
}

export default connect(null,mapDispatchToProps)(LeftDiv);