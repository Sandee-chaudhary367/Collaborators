import "./document.css";
import { format } from "timeago.js";
import {API_URL} from "../../variables"
import {PartnerImage} from "./document.styles.js"

let Document =({document,own}) => {
  //console.log(document)
  return (
    <div className={own ? "document own" : "document"}>
      <div className="documentTop">
        <PartnerImage src={`${API_URL}getProfilepic/Image/${document.uploader}`}/>
        <div className="documentText"><a href={`${API_URL}getDocuments/${document.path}`}>{document.fileName}</a></div>
      </div>
      <div className="documentBottom">
      <div style={{padding:"0 10px 0 0"}}>-{format(document.createdAt)}</div>
      <div style={{padding:"0 10px 0 0"}}>-{document.type}</div>
      <div style={{padding:"0 10px 0 0"}}>-{document.uploaderName}</div>
      </div>
    </div>
  );
}
export default Document;