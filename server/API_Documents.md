## Endpoints

List of Available Endpoints:
- `GET /product`
- `POST /product`
- `GET /product/:id`
- `DELETE /product/:id`
- `GET /category`

### GET /product

#### Request
- Headers
```json
{
  "access_token": String
}
```

#### Description
- Get all the products data

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "data": [
        {
          "id": Integer,
          "name": String,
          "description": String,
          "price": Integer,
          "stock": Integer,
          "imgUrl": String,
          "status" : String,
          "categoryId": Integer,
          "authorId": Integer,
          "createdAt": Date,
          "updatedAt": Date,
          "User": {
            "id": Integer,
            "username": String,
            "email": String,
            "password": String,
            "role": String,
            "phoneNumber": String,
            "address": String,
            "createdAt": Date,
            "updatedAt": Date
            }
        },
        ...
      ]
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": String
      }
    }
    ```

### POST /product

#### Request
- Headers
```json
{
  "access_token": String
}
```

#### Description
- Create a new product data

- Body
    ```json
    {
      "name": String,
      "description": String,
      "price": Integer,
      "stock": Integer,
      "imgUrl": String,
      "categoryId": Integer,
      "authorId": Integer,
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,      
      "data": {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date,
      }
    }
    ```

_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": String
      }
    }
    ```

### PUT /product:id
#### Description
- Edit a product data
#### Request
- Headers
```json
{
  "access_token": String
}
```
- Body
    ```json
    {
      "name": String,
      "description": String,
      "price": Integer,
      "stock": Integer,
      "imgUrl": String,
      "categoryId": Integer,
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,      
      "data": {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "status" : String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date,
      }
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": String
      }
    }
    ```

### PATCH /product:id
#### Description
- Edit a product data
#### Request
- Headers
```json
{
  "access_token": String
}
```
- Body
    ```json
    {
      "name": String,
      "description": String,
      "price": Integer,
      "stock": Integer,
      "imgUrl": String,
      "categoryId": Integer,
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,      
      "data": {
        "status" : String,
      }
    }
    ```

_401 - Unauthorized_
- Body
    ```json
    {
      "statusCode": 400,
      "error": {
        "message": String
      }
    }
    ```



### GET /product/:id
#### Request
- Headers
```json
{
  "access_token": String
}
```
#### Description
- Get all the products data by Id

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "data": [
        {
          "id": Integer,
          "name": String,
          "description": String,
          "price": Integer,
          "stock": Integer,
          "imgUrl": String,
          "categoryId": Integer,
          "authorId": Integer,
          "createdAt": Date,
          "updatedAt": Date,          
        },
        ...
      ]
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": String
      }
    }
    ```


### DELETE /product/:id
#### Request
- Headers
```json
{
  "access_token": String
}
```
#### Description
- Remove a product data based on given id

#### Response
_200 - OK_
- Body
    ```json
    {
      "statusCode": 200,
      "message": "{Product name} success to delete"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "statusCode": 404,
      "error": {
        "message": String
      }
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": String
      }
    }
    ```
### GET /category
#### Request
- Headers
```json
{
  "access_token": String
}
```
#### Description
- Get all the category data

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "data": [
        {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date,
          "Products": [
                "id": Integer,
                "name": String,
                "description": String,
                "price": Integer,
                "stock": Integer,
                "imgUrl": String,
                "categoryId": Integer,
                "authorId": Integer,
                "createdAt": Date,
                "updatedAt": Date,   
          ]
        },
        ...
      ]
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": String
      }
    }
    ```

    ### GET /histories
#### Request
- Headers
```json
{
  "access_token": String
}
```
#### Description
- Get all the history data

#### Response
_200 - OK_

- Body
    ```json
    {
      "statusCode": 200,
      "data": [
        {
          "id": Integer,
          "name": String,
          "desccription": String,
          "updatedBy" : String,
          "createdAt": Date,
          "updatedAt": Date,          
        },
        ...
      ]
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": String
      }
    }
    ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "error": {
        "message": "Internal Server Error"
      }
    }
    ```