# online-storage repository

This is an application that mimics the Google Drive functionality.

Currently it is under **development**.

### `Due to the way I seed the database the api requires more time to start, hence the restart: unless-stopped in docker-compose file`

## List of features available

1. Files
   1. delete a file
   2. download a file
   3. bulk upload (as many files as you want, tested with 2000 picutres but not larger than 20mb)
2. Directories
   1. create
   2. delete
   3. rename (only through postman, frontend code is not yet implemented)
3. User
   1. profile picture (only through postman, frontend code is not yet implemented)

There are many features left to be implemented.

##

Admin account

```
username: admin
password: Parola1234!
```

If you want to see the database you can use this account to connect to it with the client of your choice

```
username: sa
password: Parola1234
```

## Frontend

I used Next.js for this project because I am familiar with react and I consider Next.Js the best framework for developing React based web applications

## API

For this project I chose ASP .NET, the api routes can be seen by either opening the project with `Visual Studio2022` (swagger will automatically be opened in a new window in the default browser once you run the project) or by going to [swagger editor](https://editor.swagger.io/#/) and `File -> Import file -> ./backend/api.json`

## Format of data stored by this application

For the sake of simplicity I will use Typescript Interface format to show you how the data looks like.

Since we have a file and a directory there will be two interfaces to represent each one of them.

They look as follows

```typescript
interface IFile {
  // id of the file
  id: string;

  // can move it?
  canMove: boolean;

  // can be deleted?
  canDelete: boolean;

  // size of it
  fileSize: number;

  dateModified: Date; //

  dateCreated: Date; //

  // ids of the users this file is shared with
  sharedWithOwnerIDs: string[];

  // file name
  name: string;

  // file extension (.pdf, .png, etc.)
  fileType: number;

  // base64 representation of file data
  data: string;

  // id of the parent directory
  directoryId: string;
}
```

```typescript
interface IDirectory {
  // id of the directory
  id: string;

  // is the directory on root or not?
  parentId?: string;

  // can move directory?
  canMove: boolean;

  // can delete directory?
  canDelete: boolean;

  // size of directory (sum of all file sizes)
  size?: number;

  dateModified?: Date; //

  // ids of the users this directory is shared with
  // if it is shared, all containing files are too
  sharedWithOwnerIds?: string[];

  // directory name
  name: string;

  dateCreated: Date; //

  // owner id
  userId: string;

  // emtpy directory/ file array
  files?: IFile[];
}
```

## Fully dockerized app

The project is fully dockerized, the frontend as well as backend are present on my public docker repositories (currently there's an error with the ones on my repo so i resumed to building from local Dockerfiles) and this is the **docker-compose.yml** file contents

SQL Server is pulled from the default microsoft repository

```bash
version: "3.7"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: frontend
    depends_on:
      - sqlserver
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: sqlserver
    environment:
      - SA_PASSWORD=Parola1234
      - ACCEPT_EULA=Y
    ports:
      - "1433:1433"
    volumes:
      - ./init-db.sql:/init-db.sql
      - ./sqlentrypoint.sh:/sqlentrypoint.sh
    restart: unless-stopped
    entrypoint: ["/bin/bash", "/sqlentrypoint.sh"]

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: backend
    depends_on:
      - sqlserver
    environment:
      - ConnectionStrings__DefaultConnection=Server=sqlserver;Database=FileStorage;User Id=sa;Password=Parola1234;TrustServerCertificate=True;
    ports:
      - "127.0.0.1:8080:8080"
    volumes:
      - dataprotection-keys:/home/app/.aspnet/DataProtection-Keys
    restart: unless-stopped

volumes:
  dataprotection-keys:

```

Run this command if you have Docker Desktop installed and all the things will begin to download and set up

```bash
docker-compose -f docker-compose.yml -p online-storage up -d
```

After that you can just go to [this link](http://localhost:3000) and the login page will be accessible to you

For any questions related to this repository you can find me at `zecheru.ionut.roberto@gmail.com`
