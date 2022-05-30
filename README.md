# SAHC-Javacard-api

## Requirements

* NodeJS
* MySQL
* Postman

## Setting Up the Environment

1. Create a new database on MySQL and import the sql file located inside the dump folder;
2. Create a file inside the root folder of the project called .env and setup the following variables;
  ```
    PORT=port to run the server (default 4001)
    SERVER_HOST=host where the server will start (default localhost)
    DB_HOST=host where the database is running (default localhost)
    DB_USER=database user (default root)
    DB_PASSWORD=database password (default root)
    DB_DATABASE=database name where the schema was imported (default sahc)
    SECRET=JSON Web Token secret (default secret)
  ``` 
3. Run the command `npm install` to install all the dependencies;
4. Import the Postman collection located inside collection into the Postman application.

## Executing the application 

To execute this program you need to execute the command `npm run dev` on the root folder.
