import {Navheading, NavheadingContainer } from "./leftdiv.styles"
import Dashboard from '../../Image/Dashboard.png';
import analytics from '../../Image/analytics.png';
import team from '../../Image/team.png';
import documents from '../../Image/documents.png';
import settings from '../../Image/settings.png';
import {Link} from "react-router-dom"


const LeftDiv=()=>{
    let imgStyle={ width:"48px",height:"30px",padding:" 0 10px"}
    return (
        
        <NavheadingContainer>
        <Navheading active={  window.location.pathname === '/' }><img style={imgStyle} src={Dashboard} alt="" /><Link style={{color:`${window.location.pathname === '/'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}} to="/">Dashboard</Link></Navheading>
        <Navheading active={  window.location.pathname === '/analytics' }><img style={imgStyle} src={analytics} alt="" /><Link style={{color:`${window.location.pathname === '/analytics'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}}  to="/analytics">Analytics</Link></Navheading>
        <Navheading active={  window.location.pathname === '/team' }><img style={imgStyle} src={team} alt="" /><Link style={{color:`${window.location.pathname === '/team'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}}  to="/team">Teams</Link></Navheading>
        <Navheading active={  window.location.pathname === '/documents' }><img style={imgStyle} src={documents} alt="" /><Link style={{color:`${window.location.pathname === '/documents'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}} to="/documents">Documents</Link></Navheading>
        <Navheading active={  window.location.pathname === '/settings' }><img style={imgStyle} src={settings} alt="" /><Link style={{color:`${window.location.pathname === '/settings'?"white":"black"}`,textDecoration:"none",fontSize:"13px"}} to="/settings">Settings</Link></Navheading>
        </NavheadingContainer>
        
    )
}

export default LeftDiv