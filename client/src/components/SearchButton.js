import '../styles/SearchButton.css'
import { useNavigate } from 'react-router-dom'

function generateQuery(subject, professor, course) {
    let temp = "";
    temp += subject;
    temp += ", ";
    temp += professor;
    temp += ", ";
    temp += course;
    return temp;
}


export function SearchButton({ query }) {
    const navigate = useNavigate()
    return (
        <div
            class='search-button'
            onClick={() => navigate('/result', { state: { query: generateQuery(query.subject, query.professor, query.course) } })}>
            Search
        </div>
    )
}