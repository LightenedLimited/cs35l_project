import '../styles/Login.css'
import { useState } from 'react'
import { globals } from '../globals'


export function Leaderboard() {
    return (
        <>
            <h1>Leaderboard</h1>
            <ul>{items}</ul>
        </>
    )
}

const sampleUsers = [
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test1", "password": "1234", "uploads": { "$numberInt": "0" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test2", "password": "1234", "uploads": { "$numberInt": "3" }, "__v": { "$numberInt": "0" } },
    { "_id": { "$oid": "656eb393f4e755e59dbe5e62" }, "username": "test3", "password": "1234", "uploads": { "$numberInt": "8" }, "__v": { "$numberInt": "0" } }
];

const sortedUsers = sampleUsers.sort(function (a, b) { return b["uploads"]["$numberInt"] - a["uploads"]["$numberInt"] });

const topTenUsers = sortedUsers.slice(0, 10);

 const items = topTenUsers.map((topTenUsers, index) =>
     <h2>
         <li>
             {index + 1}: {topTenUsers["username"]} - {topTenUsers["uploads"]["$numberInt"]}
         </li>
     </h2>
 )