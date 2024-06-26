

# User Library Management System

### Project Overview

This initiative aims to oversee user authentication and book administration within a library system. It incorporates functionalities like user validation through JSON Web Tokens (JWT), book operations encompassing creation, retrieval, updating, and deletion, alongside additional features such as book acquisition or lending from the library.



## Implementation Details

### 1.UserAuthentication:
- User can register ,Login.Logout feature implemented .
- Implements token-based authentication utilizing JSON Web Tokens (JWT) to ensure secure user access


### 2. Book Administration:

- Facilitates administrators to execute CRUD (Create, Read, Update, Delete) operations on books housed within the library.
- Provides users with the capability to explore and search for available books.

#### AditionalFeatures
- Users can buy or borrow books from the library.
- Each book can be borrowed by one user at a time.
- Users can request to borrow books from other users, and upon returning, the requested user will retrieve the book



### 3.GraphQL API:
Introducing GraphQL for streamlined and adaptable querying, incorporating:

- Fetching data relating to users, books, and action records.
- Mutation operations for efficiently creating books, users, purchasing, and borrowing.







## GraphQL Operations


### Users
Queries:
- fetchUser

Mutations
-  addUser, signInUser , logoutUser


### Books

Queries
- getBooks, retrieveAllBooks

Mutations
- addBook, lendBook, purchaseBooks, giveBackBook, huntForBook


### Action
Queries
- fetchActions



## Tech Stack
- Node.js
- Express.js
- Sequelize ORM
- GraphQL
- JSON Web Tokens (JWT)
- express-graphql
- bcrypt


# How to Running This project in your computer

- Clone the project from git to your local machine by using the folowing comment

- After cloning install the node modules using the command "npm install" and set up the .env files as well with necessary requirements

### Environment Variable (.env)
```
SQL_DB_NAME
SQL_DB_USER
SQL_DB_PASSWORD
SQL_DB_HOST
JSW_WEB_TOKEN_SECRETKEY
```
- Start the server using the command "npm start"


- URL
    -localhost:3000/graphql


- The above link will open up some space to check all the apis, to check the api's follow the following things


# GraphQL Operations

## Register User

```
mutation {
    createUser(
        name: "YourName"
        email: "YourEmail"
        phonenumber: "YourPhonenumber"
        password: "Your Password"
        role: "user/admin"
    ) {
        id
        name
        email
        phonenumber
        password
        role
       
    }
}
```


## signIn

```
mutation LoginUser {
    loginUser(email: "yourEmail", password: "yourpassword") {
       
        token
        message
    }
}
```
## Logout
```
mutation{ LogoutUser {
    logoutUser
}
}
```

## CreateNew Book

```
 mutation{
    createBook(title: "Title", author: "`Author", genre: "Genre") {
        id
        title
        author
        genre
        isavailable
        
    }
}
```


## Buy Book

```
mutation BuyBooks {
    buyBooks(id: "bookId")
}

```

## Borrow Book

```
mutation BorrowBook {
    borrowBook(id: "bookId")
}
```

## return Book

```
mutation ReturnBook {
    returnBook(id: "bookId")
}
```


## search Book

```
query {
  searchBook(keyword:"searchword"){
    id
    title
    author
    genre
    isavailable
  }
} 
```

## Fetch All User

```
query GetAllUsers {
    getAllUsers {
        id
        name
        email
        phonenumber
        password
        role
       
    }
}
```

## Fetch All Books
```
query GetAllBooks {
    getAllBooks {
        id
        title
        author
        genre
        isavailable
      
    }
}
```


## Fetch Book (Using bookId)
```
query GetBook {
    getBook(id:"BookId") {
        id
        title
        author
        genre
        isavailable
    }
}
```


## Fetch User (Using userId)
```
query GetUser {
    getUser(id: "userId") {
        id
        name
        email
        phonenumber
        password
        role
    }
}
```

