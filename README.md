[![Build Status](https://www.travis-ci.org/habinezadalvan/Banka.svg?branch=develop)](https://www.travis-ci.org/habinezadalvan/Banka)
[![Coverage Status](https://coveralls.io/repos/github/habinezadalvan/Banka/badge.svg?branch=ch-tests2-%23165196875)](https://coveralls.io/github/habinezadalvan/Banka?branch=ch-tests2-%23165196875)
[![Maintainability](https://api.codeclimate.com/v1/badges/8e389dc649c302e0521d/maintainability)](https://codeclimate.com/github/habinezadalvan/Banka/maintainability)

# Banka

**Banka** is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals; and supports user to sign up and create bank accounts online.

*gh-pages:*  https://habinezadalvan.github.io/Banka/UI/index.html

Banka User Interface (UI) features
-------------------------------------
  1. User can sign up.

  2. User can login.

  3. User can create an account.

  4. User can view account transaction history.

  5. User can view a specific account transaction.

  6. Staff can debit and credit user account.

  7. Admin/staff can view all user accounts.

  8. Admin/staff can view a specific user account.

  9. Admin/staff can activate or deactivate or delete an account.

  10. Admin can create staff and admin user accounts.
  
  Technology and tools used
  ------------------------------
  
  **Frontend**
  
  1. html : For content
  
  2. css : For styling
  
  3. Javascript : For extra functionality 
  
  4. gh-pages : For hosting UI
  
  **Backend**
  
  1. Node.js : JavaScript run-time environment 
  
  2. Express : Framework for Node.js
  
  3. Mocha : Testing framework
  
  4. Chai : Assertion library for tests
  
  5. Javascript : programming language
  
  6. Heroku : For backend app deployment
  
  6. Travis CI : Continuous integration testing
  
  7. Coverall : Continuous integration test coverage
  
  8. Code-Climate : Continuous integration code quality
  
  
  Prerequisities
  ---------------
  
  1. node.js
  
  2. postman 
  
  How to run this application locally
  ------------------------------------
  
  1. git clone https://github.com/habinezadalvan/Banka.git
  
  2. run ``npm install``
  
  3. run ``npm start`` to test bellow endpoints in postman
  
  4. application listen on http://localhost:3000
  
  5. to run tests run ``npm test``
  
  
  Banka endpoints
  ----------------
  
  | METHOD  | End-point  | Description |
| ------------ |---------------| -----|
| POST     | /api/v1/auth/signup |user signup |
| POST     | /api/v1/auth/signin |user login |
| POST | /api/v1/accounts  |user creates bank account |
| POST     | /api/v1/transactions/:accountNumber/credit |cashier credit bank account |
| POST     | /api/v1/transactions/:accountNumber/debit |cashier debit bank account |
| PATCH | /api/v1/account/:accountNumber|cashier/admin activate/deactivate bank account |
| DELETE     | /api/v1/account/:accountNumber | staff/admin delete account |
| GET     | /api/v1/users       | get all users |
| GET | /api/v1/accounts  |    get all accounts |
| GET | /api/v1/transactions |    get all transactions |


data structures examples for specific endpoints 
--------------------------------------

*1. signup endpoint*

``{
	
	"firstName":"christian",
	"lastName":"habineza",
	"email": "habichleon2040@gmail.com",
	"password":"12345",
	"confirmPassword":"12345"
}``


*2. login endpoint*

``{

	"email": "habinezadalvan@gmail.com",
	"password":"12345"
  
}``

*3. create bank account*

``{

	"type":"savings"  // savings or current
  
}``

*4. activate or deactivate account*

``{
	
	"status": "dormant"        //active or dormant

}``

*5. credit*

``{

	"amount": "30000",
	"cashier": "2"
  
}``

6. debit 

``{

	"amount": "5000",
	"cashier": "2"
  
}``


-------------------------------------------------------------------------------------------------------------------------
``I hope you've enjoyed the application``

**developer**

**Leon Christian Habineza**

@ **Andela bootcamp cycle 5**
  
