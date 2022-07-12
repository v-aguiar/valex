<div align="center">
        <img src="https://cdn-icons-png.flaticon.com/512/147/147258.png" alt="logo" width="200px"> 
</div>
                                                                                                                       
                                                                                                                       
<h1 align="center"> Valex Api</h1>

<div align="center">
    <p> API to manage benefit cards creation, recharges and transactions. </p>
</div>

- Link to heroku deploy: https://valex-db-api.herokuapp.com/</p>

## About

API for companies to manage benefit cards creation, recharges and for employees to manage their transactions.

Below are the implemented endpoints:

- '/create' --> Methods: POST
- '/activate' --> Methods: PUT
- '/block' --> Methods: PUT
- '/unblock' --> Methods: PUT
- '/recharge' --> Method: POST
- '/buy' --> Method: POST
- '/statements/:cardId' --> Methods: GET

> Check section <a name="Endpoints details">Endpoint details</a> to know how to properly use each endpoint.

## Technologies

The following tools and frameworks were used in the construction of the project:<br>

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## How to run

> **<p>From localhost url:</p>**

1. Clone this repository to your local machine;
2. Run `npm i` from your terminal to install dependencies;
3. Make sure to have postgres database running on the machine `sudo service postgresql start`
4. Run the create-database script running `bash create-database` from inside the "database" directory (this will create the 'valex' database locally for the 'postgres' role and all needed tables. It will also add some initial data into them)
5. Configure a `.env` file on the project root with the following environment keys:

```.env
  DATBASE_URL=postgres://postgres:<password>@localhost:5432/valex
  SECRET_KEY=<cryptr_secret_key>
  PORT=<prefered_optional_port>
  MODE=<DEV | PROD>
```

6. Run `npm run dev` to run the project on the PORT you chose, or 4000 if none are defined on `.env`

- `baseUrl: http://localhost:4000`

#

> **<p>From <b>Valex-api</b> url, deployed on Heroku:</p>**

You can also use all the endpoints from this project through the deployed Heroku app, using its deploy URL:

- `baseURL: https://valex-db-api.herokuapp.com/`

## **Endpoints details**

- '/create' --> Methods: POST
- '/activate' --> Methods: PUT
- '/block' --> Methods: PUT
- '/unblock' --> Methods: PUT
- '/recharge' --> Method: POST
- '/buy' --> Method: POST
- '/statements/:cardId' --> Methods: GET

### **`Method: POST, Route: '/create'`**

> A company can create a new type of card for an employee.

- In order to create a card, an apiKey must be provided by the company that is creating the card.
- The apiKey is a unique identifier for the company and must be provided through a 'x-api-key' header:

```json
  "x-api-key": "<apiKey>"
```

- A body with the employeeId and the cardType must be provided:

```typescript
    {
      "employeeId": number,
      "cardType": "<cardType>"
    }
```

`-> CREATE VALIDATION:`

- `all`: required
- `apiKey`: must belong to a registered company
- `employeeId`: must belong to a registered employee
- `cardType`: must be one of the following types: `groceries`, `health`, `transport`, `education`, `restaurant`

#

### **`Method: PUT, Route: '/activate'`**

> An employee can activate a card.

- In order to activate a card, the cardId, the securityCode and the card password must be provided via body:

  ```typescript
    {
      "cardId": number,
      "securityCode": number,
      "password": string
    }
  ```

`-> ACTIVATE VALIDATION:`

- `all`: required
- `cardId`: must belong to a registered, inactive card (with no registered password)
- `password`: must be a 4 numbers long integer
- `securityCode(CVV)`: must be a string of the hashed securityCode

#

### **`Method: PUT, Route: '/block'`**

> An employee can block a card.

- In order to block a card, the cardId and the card password must be provided via body:

  ```typescript
    {
      "cardId": number,
      "password": string
    }
  ```

`-> BLOCK VALIDATION:`

- `all`: required
- `cardId`: must belong to a registered, active card
- `password`: must be a 4 numbers long integer

#

### **`Method: PUT, Route: '/unblock'`**

> An employee can unblock a card.

- In order to unblock a card, the cardId and the card password must be provided via body:

  ```typescript
    {
      "cardId": number,
      "password": string
    }
  ```

`-> UNBLOCK VALIDATION:`

- `all`: required
- `cardId`: must belong to a registered, blocked card
- `password`: must be a 4 numbers long integer

#

### **`Method: POST, Route: '/recharge'`**

> A company can recharge an employee card.

- In order to recharge a card, an apiKey must be provided by the company.
- The apiKey is a unique identifier for the company and must be provided through a 'x-api-key' header:

```json
  "x-api-key": "<apiKey>"
```

- A body with the cardId and the amount to be recharged must be provided:

  ```typescript
    {
      "cardId": number,
      "amount": number
    }
  ```

`-> RECHARGE VALIDATION:`

- `all`: required
- `cardId`: must belong to a registered, active card
- `amount`: must be a integer that represents the amount to be recharged, but without the cents. (For example, if the amount is $ 10.50, the amount must be 1050)

#

### **`Method: POST, Route: '/buy'`**

> An employee can buy in specific POS (Points of Sale).

- In order to buy with a card, the cardId, the businessId, amount and password must be provided via body:

  ```typescript
    {
      "cardId": number,
      "businessId": number,
      "amount": number,
      "password": string
    }
  ```

`-> BUY VALIDATION:`

- `all`: required
- `cardId`: must belong to a registered, active card
- `businessId`: must belong to a registered, kind of business
- `amount`: must be a integer that represents the amount to be recharged, but without the cents. (For example, if the amount is $ 10.50, the amount must be 1050)
- `password`: must be a 4 numbers long integer

#

### **`Method: GET, Route: '/statements/:cardId'`**

> An employee can get the statements of a card.:

- In order to get the statements of a card, the `cardId` must be provided via url params:

```json
"/statements/:cardId"
```

`-> STATEMENTS VALIDATION:`

- `all`: required
- `cardId`: must belong to a registered card

`-> STATEMENTS RESPONSE:`

```typescript
  {
    "balance": number,
    "transactions": [
      {
        "id": number,
        "cardId": number,
        "businessId": number,
        "businessN;ame": string,
        "timestamp": timestamp without timezone,
        "amount": number
      }
    ],
    "recharges": [
      {
        "id": number,
        "cardId": number,
        "timestamp": timestamp without timezone,
        "amount": number
      }
    ]
  }
```

#
