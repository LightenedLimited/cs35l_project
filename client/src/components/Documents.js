import React from "react";
import image from '../styles/images/pdf-icons.png';
import '../styles/Documents.css';
import { globals } from '../globals'

export function Document({data}){
    const title = data["title"]; 
    const file_path = data["path"]; 
    const id = data['_id']

    async function handleDownload(e){
        e.preventDefault()
        try {
            fetch(`${globals.server_url}/pdfs/increment`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test_id: id,
                }),
            })
        } catch (err){
            console.log(err)
        }
        window.open(globals.server_url + "/pdfs/files/"+file_path)
    }

    return(
        <div className="document-container">
            <img
                alt="pdficons"
                class="pdficons"
                src={image}
                onClick={(e) => handleDownload(e)}
            />
            <div class="document-name"
                 onClick={(e) => handleDownload(e)}>{title}</div>
        </div>
    )
}

