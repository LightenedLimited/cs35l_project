import React from "react";
import image from '../styles/images/pdf_icons.png';

export function Document({data}){
    console.log(data)
    let {link,name} = data;
    return(
        <div className="document">
            <img
                alt="pdficons"
                className="pdficons"
                src={image}
                onClick={() => window.open(link, "_blank")}
            />
            <div className="document-name">{name}</div>
        </div>
    )
}