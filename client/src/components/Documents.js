import React from "react";
import image from '../styles/images/pdf-icons.png';
import '../styles/Documents.css';
import { globals } from '../globals'

export function Document({data}){
    console.log(data)
    const title = data["title"]; 
    const file_path = data["path"]; 
    console.log(file_path)
    return(
        <div className="document-container">
            <img
                alt="pdficons"
                class="pdficons"
                src={image}
                onClick={() => window.open(globals.server_url + "/pdfs/files/"+file_path)}
            />
            <div class="document-name">{title}</div>
        </div>
    )
}