import {Route,Switch} from "react-router-dom"
import homepage from '../../pages/main/homepage';
import PrivateRoutes from '../PrivateRoutes'


const Content =()=>{
    let contentArea={
        width:"100%",  
        height:"100vh",
    }
 
    return (
        <div style={contentArea}>
        <Switch>
        <PrivateRoutes exact path='/' component={homepage} />
        </Switch>
        </div>
    )
}

export default Content
