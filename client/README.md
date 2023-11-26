# Instructions for frontend team
### Clone this repository
1. Make a folder on your computer to store the repo
2. Naviage to that folder in your terminal
3. Run $git clone https://github.com/LightenedLimited/cs35l_project.git

### Install dependencies, start frontend server
1. Navigate to client directory `$cd cs35l_project/client`
2. Run `$npm install`
3. Start frontend server with `$npm start`

## Start backend server
1. Navigate to server director `../server` (from client)
2. Setup dotenv: create a file named `.env` (in server server directory) that contains two variables:
    ```
    MONGODB_ACCESS=[ACCESS_KEY] # replace w/our db access key
    SESSION_SECRET=[SECRET_HERE] # any random string, I think
    ```
2. Run `$npm install`
3. Start backend server