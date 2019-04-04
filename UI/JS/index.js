/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// javascript for the hiden side menu

const showHiddenMenu = () => {
  document.getElementById('hidden-nav-bar').style.width = '15%';
  document.getElementById('main-area').style.marginLeft = '15%';
  document.getElementById('navbarId').style.marginLeft = '15%';
  document.getElementById('footerId').style.marginLeft = '15%';
  document.getElementById('barsmenu').style.display = 'none';
};
const closeHiddenMenu = () => {
  document.getElementById('hidden-nav-bar').style.width = '0';
  document.getElementById('main-area').style.marginLeft = '0';
  document.getElementById('navbarId').style.marginLeft = '0';
  document.getElementById('footerId').style.marginLeft = '0';
  document.getElementById('barsmenu').style.display = 'block';
  document.getElementById('barsmenu').style.transitionDelay = '1.2s';
};
// DISPLAY SIGN UP
const signupFunction = () => {
  document.getElementById('userSignUp').style.display = 'block';
  document.getElementById('ads-area').style.display = 'none';
  document.getElementById('userLogin').style.display = 'none';
  document.getElementById('main-area').style.bodyheight = '100%';
  document.getElementById('userSignUp').style.scaleY = '1.2s';
};
// CLOSE SIGN UP
const closeSignUpFunction = () => {
  document.getElementById('userSignUp').style.display = 'none';
  document.getElementById('sliderId').style.display = 'block';
  document.getElementById('ads-area').style.display = 'block';
};

// DISPLAY LOGIN

const loginFunction = () => {
  document.getElementById('userLogin').style.display = 'block';
  document.getElementById('userSignUp').style.display = 'none';
  document.getElementById('ads-area').style.display = 'none';
  document.getElementById('userLogin').style.scaleY = '1.2s';
};
// CLOSE LOGIN
const closeLignFunction = () => {
  document.getElementById('userLogin').style.display = 'none';
  document.getElementById('sliderId').style.display = 'block';
  document.getElementById('ads-area').style.display = 'block';
};

// AFTER SIGN UP PAGE
const showHiddenMenuArea = () => {
  document.getElementById('hidden-nav-bar').style.width = '20%';
  document.getElementById('main-areaPage').style.marginLeft = '20%';
  document.getElementById('navbarId').style.marginLeft = '20%';
  document.getElementById('barsMenu').style.display = 'none';
};
const closeHiddenMenuArea = () => {
  document.getElementById('hidden-nav-bar').style.width = '0';
  document.getElementById('main-areaPage').style.marginLeft = '0';
  document.getElementById('navbarId').style.marginLeft = '0';
  document.getElementById('barsMenu').style.display = 'block';
  document.getElementById('barsMenu').style.transitionDelay = '1.2s';
};

// CREATE ACOUNT FIELD

// display create account
const showCreateAccount = () => {
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'block';
  document.getElementById('debitId').style.display = 'none';
  document.getElementById('usercreateAccount').style.scaleY = '1.2s';
};
// close create account
const closeCreateAccount = () => {
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};
// TRANSACTIONS

// display transactions
const showTransaction = () => {
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('transaction-page').style.display = 'block';
  document.getElementById('debitId').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('transaction-page').style.scaleY = '1.2s';
};
// close transaction page
const closeTransactions = () => {
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};

// VIEW SPECIFIC ACCOUNT RECORD

// display specific account
const viewSpecificAccountRecord = () => {
  document.getElementById('viewSpeficAccount').style.display = 'block';
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.scaleY = '1.2s';
};

// close specific account page
const closeSpecificAccount = () => {
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};
// DEBIT PAGE FOR STAFF
// display debit
const showDebitPage = () => {
  document.getElementById('debitId').style.display = 'block';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('debitId').style.scaleY = '1.2s';
};

// close debit page
const closeDebitPage = () => {
  document.getElementById('debitId').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};


console.log('hey there');
