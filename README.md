
# Books User Library Management 

### Project Description

This project is designed to manage user authentication and book management within a library system. It features functionalities such as user authentication using JSON Web Tokens (JWT), book CRUD operations, and additional features like purchasing or borrowing books from the library.



## Features

### 1.UserAuthentication:

- Utilizes token-based authentication using JSON Web Tokens (JWT) for secure user access.

### 2.BookManagement:

- Allows admins to perform CRUD operations on books within the library.
- Users can browse and search for available books.

#### AditionalFeatures
- Users can buy or borrow books from the library.
- Each book can be borrowed by one user at a time.
- Users can request to borrow books from other users, and upon returning, the requested user will retrieve the book



### 3.GraphQL API:
Implementing GraphQL for efficient and flexible querying, including:

- Fetching data for users, books, and action tables.
- Mutation operations for creating books, users, buying, and borrowing effectively







## Query && Mutation Operation(GraphQL)


### User
Query
- getUser

Mutations
-  createUser,loginUser 


### Books

Query
- getBooks, getAllBooks

Mutations
- createBook,borrowBook,buyBooks,returnBook,searchBook



## Tech Stack
- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for Node.js used for building APIs.
- Sequelize ORM: An Object-Relational Mapping tool for Node.js, used for interacting with databases.
- GraphQL: A query language for APIs that enables more efficient data fetching.
- JSON Web Tokens (JWT): A standard for secure authentication mechanism.
- express-graphql: Middleware for creating GraphQL servers with Express.js.
- bcrypt: A library for encrypting passwords securely.


