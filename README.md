<div align="center">
    <img src="https://images.emojiterra.com/twitter/v14.0/512px/1f4dd.png" alt="JavaScriptLogo" width="100">
  </a>

  <h3 align="center">RepoProvas</h3>
  <div align="center">
    20th Project of Driven Education
    <br />
  </div>
  <div align="center">
    An API to manage and storage yout tests
    <br />
  </div>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" height="30px" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px" />
  
  

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<!-- Table of Contents -->

<div align="center" style="margin-top: 50px">
    <h1> Project Guide</h1>
</div>

## Features

-   Auth (sign-in/sign-up)
-   Create test
-   Get tests by disciplines
-   Get tests by teachers

</br>

<div align="center" >
    <h1> API Reference</h1>
</div>

<details style="margin-bottom: 10px">
<summary style="font-size: 20px; color: #7E7E7E">TL;DR</summary>

<details style="margin: 10px">
<summary style="font-size: 18px"> <span style="font-weight:700; margin-right:10px; color: #9FE58A">POST</span> /sign-up</summary>

Body:
```json
{
    "email": string,
    "password": string
}

```
</details>
  
<details style="margin: 10px">
<summary style="font-size: 18px"> <span style="font-weight:700; margin-right:10px; color: #9FE58A">POST</span> /sign-in</summary>

Body:
```json
{
    "email": string,
    "password": string
}

```
   
Response:
```json
{
   "token": string
}
```
</details>

<details style="margin: 10px">
<summary style="font-size: 18px"> <span style="font-weight:700; margin-right:10px; color: #9FE58A">POST</span> /tests</summary>

Headers:
```json
{
  "Authorization": "Bearer {token}"
}
```
  
Body:
```json
{
    "name": string,
    "pdfUrl": string,
    "categoryId": number,
    "teacherDisciplineId": number
}

```
</details>

<details style="margin: 10px">
<summary style="font-size: 18px"> <span style="font-weight:700; margin-right:10px; color: #9FE58A">GET</span> /tests/discipline</summary>
  
Headers:
```json
{
  "Authorization": "Bearer {token}"
}
```
   
Response:
```json
[
  {
     "id": number,
     "number": number,
     "disciplines": [
        {
           "id": number,
           "name": string,
           "categories": [
              {
                 "id": number,
                 "name": string,
                 "tests": [
                    {
                      "id": number,
                      "name": string,
                      "pdfUrl": string,
                      "categoryId": number,
                      "teacherDiscipline": {
                        "discipline": {
                          "id": number
                        },
                        "teacher": {
                          "name": string
                        }
                      }
                    },
                    ...
                 ]
              },
              ...
           ]
        },
        ...
     ]
  },
  ...
]
```
</details>
  
<details style="margin: 10px">
<summary style="font-size: 18px"> <span style="font-weight:700; margin-right:10px; color: #9FE58A">GET</span> /tests/teacher</summary>
  
Headers:
```json
{
  "Authorization": "Bearer {token}"
}
```
   
Response:
```json
[
  {
     "id": number,
     "number": number,
           "categories": [
              {
                 "id": number,
                 "name": string,
                 "tests": [
                    {
                      "id": number,
                      "name": string,
                      "pdfUrl": string,
                      "categoryId": number,
                      "teacherDiscipline": {
                        "discipline": {
                          "name": string
                        },
                        "teacher": {
                          "id": number
                        }
                      }
                    },
                    ...
                 ]
              },
              ...
           ]
    },
    ...
]
```
</details>



# 

### Sign-up

```http
POST /sign-up
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `email`       | `string` | **Required**. user email       |
| `password`       | `string` | **Required**. user password       |

`Password min length 6`

</br>

###

### Sign-in

```http
POST /sign-in
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `email`       | `string` | **Required**. user email       |
| `password`       | `string` | **Required**. user password       |

`Password min length 6`

</br>

### Response:

```json
{
   "token": string
}
```

### Create test

```http
POST /tests
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `Authorization` | `string` | **Required**. give token |

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`   | `string` | **Required**. test name        |
| `pdfUrl`       | `string` | **Required**. test pdfUrl      |
| `categoryId`       | `number` | **Required**. categoryId of test belong       |
| `teacherDisciplineId`       | `number` | **Required**. teacherDisciplineId of test belong       |

###


### Get tests by discipline

```http
GET /tests/discipline
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `Authorization` | `string` | **Required**. give token |

### Response: 
```json
[
  {
     "id": number,
     "number": number,
     "disciplines": [
        {
           "id": number,
           "name": string,
           "categories": [
              {
                 "id": number,
                 "name": string,
                 "tests": [
                    {
                      "id": number,
                      "name": string,
                      "pdfUrl": string,
                      "categoryId": number,
                      "teacherDiscipline": {
                        "discipline": {
                          "id": number
                        },
                        "teacher": {
                          "name": string
                        }
                      }
                    },
                    ...
                 ]
              },
              ...
           ]
        },
        ...
     ]
  },
  ...
]
```


### Get tests by teacher

```http
GET /tests/teacher
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `Authorization` | `string` | **Required**. give token |

### Response: 
```json
[
  {
     "id": number,
     "number": number,
           "categories": [
              {
                 "id": number,
                 "name": string,
                 "tests": [
                    {
                      "id": number,
                      "name": string,
                      "pdfUrl": string,
                      "categoryId": number,
                      "teacherDiscipline": {
                        "discipline": {
                          "name": string
                        },
                        "teacher": {
                          "id": number
                        }
                      }
                    },
                    ...
                 ]
              },
              ...
           ]
    },
    ...
]
```

###

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://YOUR-USER-NAME:YOUR-PASSWORD@Hostname:5432/DatabaseName`

`PORT = number `

`SECRET_KEY = any string`


# 

## Run Locally

Clone the project

```bash
  git clone https://github.com/DanielL29/projeto20-repoprovas
```

Go to the project directory

```bash
  cd projeto20-repoprovas/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma migrate dev
```

```bash
  npx prisma db seed
```

Start the server

```bash
  npm run dev
```

</br>

# 

## Lessons Learned
- API Architecture
- TypeScript interfaces
- TypeScript types
- Classes
- Constructor
- Object Literals
- Manual tests
- Integration tests
# 

## Acknowledgements

-   [Badges for Github](https://dev.to/envoy_/150-badges-for-github-pnk)
-   [README inspiration](https://github.com/andrezopo/projeto18-valex#readme)

#

## Authors

-   Daniel Lucas Ederli


