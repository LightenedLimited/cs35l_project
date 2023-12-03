import '../styles/Results.css'

export function Results() {
    return (
        <>
            <h1>Results</h1>
            <ul>{arrayDataItems}</ul>
        </>
    )
}

const sampleTests = [
    { "_id": { "$oid": "656bbe6d791698df65b55265" }, "user_upload_id": { "$oid": "6567cb9ec32a5b72e3d24778" }, "path": "/Users/leroybettertongage/Desktop/cs35l/project/cs35l_project/server/uploads/1701559917776.pdf", "subject": "test-sub-1", "professor": "test-prof-1", "title": "test-title-1", "upload_date": { "$date": { "$numberLong": "1701559917792" } }, "class": "test-class-1", "quarter": "Fall", "year": { "$numberInt": "3005" }, "test_type": "Midterm", "has_solution": true, "users_notes": "test-note-1", "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656bbe71791698df65b55267" }, "user_upload_id": { "$oid": "6567cb9ec32a5b72e3d24778" }, "path": "/Users/leroybettertongage/Desktop/cs35l/project/cs35l_project/server/uploads/1701559921398.pdf", "subject": "test-sub-1", "professor": "test-prof-1", "title": "test-title-1", "upload_date": { "$date": { "$numberLong": "1701559921406" } }, "class": "test-class-1", "quarter": "Fall", "year": { "$numberInt": "3005" }, "test_type": "Midterm", "has_solution": true, "users_notes": "test-note-1", "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656bfd27cb0e01cfedf922b4" }, "user_upload_id": { "$oid": "656beab5cb0e01cfedf91f86" }, "path": "/Users/leroybettertongage/Desktop/cs35l/project/cs35l_project/server/uploads/1701575975096.pdf", "subject": "asd", "professor": "asdasd", "title": "idk what to do abt titles", "upload_date": { "$date": { "$numberLong": "1701575975105" } }, "class": "asdsad", "quarter": "Winter", "year": { "$numberInt": "2023" }, "test_type": "Practice Midterm", "has_solution": false, "users_notes": "", "__v": { "$numberInt": "0" } }
];

function DummyCard({ course, professor, exam }) {
    return (
        <>
            <h2>
                {exam}  <br></br>
                {course} <br></br>
                {professor}
            </h2>
        </>
    )
}

const arrayDataItems = sampleTests.map(sampleTest =>
    <h2>
        <li>
            {sampleTest.class}-
            {sampleTest.test_type}-
            {sampleTest.professor}
        </li>
    </h2>
)