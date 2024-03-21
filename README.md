
# Books User Management

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


# Running This Project In Your Local Machine

- Clone the project from git to your local machine by using the folowing comment.
- > git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

- After cloning install the node modules using the command "npm install"
- Start the server using the command "npm run"


- URL
    -localhost:3000/graphql


- The above link will open up some space to check all the apis, to check the api's follow the following things

# Register User


mutation CreateUser {
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



# signIn


mutation LoginUser {
    loginUser(email: "yourEmail", password: "yourpassword") {
       
        token
        message
    }
}


# Add Book


mutation CreateBook {
    createBook(title: "Title", author: "`Author", genre: "Genre") {
        id
        title
        author
        genre
        isavailable
        
    }
}    



# Buy Book


mutation {
  buyBooks( id:"bookId" ) {
    message
  }
}


# Borrow Book


mutation {
  borrowBook(id:"bookId") {
   message

  }
}


# return Book


mutation {
  returnBook( id:"bookId") {
    message
  }
}


# search Book


query SearchBook {
    searchBook(keyword: "searchword") {
        id
        title
        author
        genre
        isavailable
    }
}

