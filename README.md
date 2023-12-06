# cs35l_project

## Server Setup

In the prerequisite, we need to setup two different services, MongoDB and Algolia. MongoDB is a noSQL database, which we use to store the meta information regarding the tests and the users, and the PDF document itself is stored locally. The Aloglia service is a used as a search engine, which we use for the content discovery feature. We will walk through the setup, but please contact us if you want the API keys and environment variables.

### MongoDB Atlas Setup

Any [MongoDB instance works](https://www.mongodb.com/), but we prefer to utilize an [Atlas environment](https://www.mongodb.com/cloud/atlas/register) due to easy setup. Here's how we setup.

1. We register an account with MongoDB [Atlas](https://www.mongodb.com/cloud/atlas/register). 
2. It will ask you a series of questions, it really isn't important what you answer here. 
3. Click 'Create a Deployment'. Any cluster works, but we select an M0 as it is free. 
![create_deployment_image](./docs/images/mongo_select_cluster.png)
4. Next, we fill the security quickstart. 
    1. We enter an admin username and password. 
    2. We select the option of connecting from 'My Local Environment'. 
    3. (Optional) We added the IP Address of 0.0.0.0, for development purposes, which allowed users to connect from anywhere.
![ip_address](./docs/images/mongo_ip_address.png)
5. Then, we click the connect button on our cluster (we named it 'Cluster0'), and the 'Driver' option. 
6. Underneath Step 3. of this popup, we copy the connection string and replace the password with the password we entered for the admin account. 
![connection_string](./docs/images/mongo_connection_string.png)
7. Save this connection string for the MONGODB_ACCESS environment variable in the .env file in the server folder that we will discuss later. 

### Algolia Setup

INSERT HHERE

1. We register an account with [Algolia](https://dashboard.algolia.com/signup/personal_information). It will prompt you with a series of questions, it's not really important what you answer. 
2. Click the 'API Keys' tab in the Welcome section of the dashboard. 
![welcome](./docs/images/algolia_welcome.png)
3. Copy and save the Application ID (as we will use it as the ANGOLIA_APPLICATION_ID in the .env file for the folder) and the Admin API Key
(as we will use it as the ANGOLIA_API_KEY in the .env file). 
![api_keys](./docs/images/algolia_api_keys.png)
install GraphicsMagick 

Setup the .env inside server