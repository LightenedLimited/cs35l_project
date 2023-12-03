import React from 'react'
import '../styles/Results.css'
import { Document } from '../components/Documents'

export function Results(){
    const SearchResult = {
        name: "GitHub Copilot",
        link: "https://www.google.com"
    };
    return (
        <>
            <h1>Results</h1>
            <section class="results-container">
                {/* SearchResults.map(item,index) => {
                    return(
                        <Document data = {item}, key = {index}/>
                    )
                } */}
                <Document data={SearchResult} />
            </section>
        </>  
    )
};
