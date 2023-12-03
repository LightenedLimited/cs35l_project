import '../styles/Results.css'
import { Document } from '../components/Documents'

export function Results(){
    const testObj = {
        name: "GitHub Copilot",
        link: "https://www.google.com"
    };
    return (
        <>
            <h1>Results</h1>
            <Document data={testObj} />
        </>  
    )
};
