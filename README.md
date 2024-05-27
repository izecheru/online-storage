# online-storage repository

This is an application that mimics the Google Drive functionality.

Currently it is under **development**.

## Frontend

I used Next.js for this project because I am familiar with react and I consider Next.Js the best framework for developing React based web applications

## API

For this project I chose ASP .NET, the api routes can be seen by either opening the project with `Visual Studio2022` (swagger will automatically be opened in a new window in the default browser) or by going to [swagger editor]('https://editor.swagger.io/#/) and `File -> Import file -> ./backend/api.json`

## How the data looks like

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

The project is fully dockerized, the frontend as well as backend are present on my public docker repositories and this is the **docker-compose.yml** file contents

SQL Server is pulled from the default microsoft repository

```bash
version: "3.7"
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: sqlserver
    environment:
      - SA_PASSWORD=Parola1234
      - ACCEPT_EULA=Y
    networks:
      - shared-network
    ports:
      - "1433:1433"
    volumes:
      - sqlserverdata:/var/opt/mssql
      - ./init-db.sql:/init-db.sql
      - ./sqlentrypoint.sh:/sqlentrypoint.sh
    entrypoint: ["/bin/bash", "/sqlentrypoint.sh"]

  backend:
    image: izecheru/online-storage-backend
    container_name: backend
    environment:
      - ConnectionStrings__DefaultConnection=Server=sqlserver;Database=FileStorage;User Id=sa;Password=Parola1234;TrustServerCertificate=True;
    ports:
      - "8080:8080"
    networks:
      - shared-network
    depends_on:
      - sqlserver
    volumes:
      - dataprotection-keys:/home/app/.aspnet/DataProtection-Keys

  frontend:
    image: izecheru/online-storage-frontend
    container_name: frontend
    networks:
      - shared-network
    ports:
      - "3000:3000"
    depends_on:
      - backend

networks:
  shared-network:

volumes:
  sqlserverdata:
  dataprotection-keys:
```

Run this command if you have docker deckstop installed and all the things will begin to download and set up

```bash
docker compose up --build
```

After that you can just go to `http://localhost:3000` and the login page will be accessible to you

For any questions related to this repository you can find me at `zecheru.ionut.roberto@gmail.com`
