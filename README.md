[![Maintainability](https://api.codeclimate.com/v1/badges/8e389dc649c302e0521d/maintainability)](https://codeclimate.com/github/habinezadalvan/Banka/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/habinezadalvan/Banka/badge.svg?branch=ch-tests2-%23165196875)](https://coveralls.io/github/habinezadalvan/Banka?branch=ch-tests2-%23165196875)
[![Build Status](https://www.travis-ci.org/habinezadalvan/Banka.svg?branch=develop)](https://www.travis-ci.org/habinezadalvan/Banka)

# Banka

**Banka** is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals; and supports user to sign up and create bank accounts online.
This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

*gh-pages:*  https://habinezadalvan.github.io/Banka/UI/index.html


  **BANKA END POINTS**
  ----------------
  
  *Endpoints version two (V2) with postgresql database
  ---------------------------------------------------
  
  | METHOD  | END-POINTS  | DESCRIPTION |
| ------------ |---------------| -----|
| POST     | /api/v2/auth/signup |user signup |
| POST     | /api/v2/auth/signin |user login |
| POST | /api/v2/accounts  |user creates bank account |
| POST     | /api/v2/transactions/:accountNumber/credit |cashier credit bank account |
| POST     | /api/v2/transactions/:accountNumber/debit |cashier debit bank account |
| PATCH | /api/v2/account/:accountNumber|cashier/admin activate/deactivate bank account |
| DELETE     | /api/v2/account/:accountNumber | staff/admin delete account |
| GET | /api/v2/accounts  |    get all accounts |
| GET | /api/accounts  |    get all active and dormant accounts |
| GET | /api/v2/accounts/:accountNumber  |    get account details |
 GET | /api/v2/accounts/:accountNumber/transactions  |    get account's transactions history |
| GET | /api/v2/transactions/:transactionId |    get specific transaction |
| GET | /api/v2/transactions |    get all transactions |

*Endpoints version(v1) backend without postgresql datadase
------------------------------------------------------------

  | METHOD  | END-POINTS  | DESCRIPTION |
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



**SETUP**
-------------

  **Prerequisities**
  
  
  1. node.js
  
  2. postman 
  
  3. postgresql 
  
   **Technology and tools used**
  
  
  *Frontend*
  
  1. html : For content
  
  2. css : For styling
  
  3. Javascript : For extra functionality 
  
  4. gh-pages : For hosting UI
  
  *Backend and database*
  
  1. Node.js : JavaScript run-time environment 
  
  2. Express : Framework for Node.js
  
  3. Mocha : Testing framework
  
  4. Chai : Assertion library for tests
  
  5. Javascript : programming language
  
  6. Heroku : For backend app deployment
  
  6. Travis CI : Continuous integration testing
  
  7. Coverall : Continuous integration test coverage
  
  8. Code-Climate : Continuous integration code quality
  
  9. postgresql : Database
  
  
  
  **GETTING STARTED**
  ----------------------
  
  
  1. git clone https://github.com/habinezadalvan/Banka.git
  
  2. Run ``npm install``
  
  3. Create .env file
  
  4. Run ``npm start`` to test bellow endpoints in postman
  
  5. Application listen on http://localhost:3000
  
  
  **TESTING**
  -------------
  
  
  1. Get the application locally with above steps.
  
  2. To run tests run ``npm run test`` in terminal to test only backend endpoints.
  
  3. To run tests run ``npm run testdb`` in terminal to test backend with postgresql database endpoints.
  
  
  **CONTRIBUTE**
  
  1. Go on Pivotal Tracker https://www.pivotaltracker.com/n/projects/2322095
  
  2. Create a Pivotal Tracker story.
  
  3. Get the storyId
  
  4. Get back to the terminal
  
  5. Create a branch from develop branch with ``git checkout -b <branch name+storyId>``
  
    *NB: Branch name should start with story type abbreviation then name then storyID*
  
  6. Do different commits describing the work done
  
    *NB: Every commit should be in the following format ``git commit -m"[storyType storyId] the message]``*
  
  7. Push your work on https://github.com/habinezadalvan/Banka
  
  8. Do Pull Request and add me a reviewer to review your work before merging to develop.
  
  
  **DEPLOYMENT**
  
  1. The application has been deployed on heroku.
  

Addition information: UI features
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
  
  
  **UI validation Key notes**
  1. When login or sign up, password should be 6 to 12 characters with at least 1 capital and small letters, and a number.
  
  2. To access the staff and admin page you should use staff@gmail.com and admin@gmail.com respectively.
  
  3. To access user's dashboard you can login or sign up with any email.
  
 
Addition information: Data structures examples for specific endpoints 
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
  
