import PreviewProfile from "../../components/homepage's-PreviewProfile/previewProfile";
import PreviewTasks from "../../components/homepage's-PreviewTasks/previewTasks";


const HomePage = ()=>{
    let contentArea={
        width:"100%", 
        display:"flex" 
    }
    return (
    <div style={contentArea}>
        <PreviewTasks/>
        <PreviewProfile/>
     </div>  
    )
}

export default HomePage;