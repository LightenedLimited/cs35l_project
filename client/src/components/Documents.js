import React from "react";
import image from '../styles/images/pdf-icons.png';
import '../styles/Documents.css';

export function Document({data}){
    console.log(data)
    let {path,title} = data;
    console.log(path)
    return(
        <div className="document-container">
            <img
                alt="pdficons"
                class="pdficons"
                src={image}
                onClick={() => window.open(path, "_blank")}
            />
            <div class="document-name">{title}</div>
        </div>
    )
}