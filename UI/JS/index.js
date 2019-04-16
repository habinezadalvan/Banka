/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const hiddenNavBar = document.getElementById('hidden-nav-bar');
const mainArea = document.getElementById('main-area');
const navBar = document.getElementById('navbarId');
const footer = document.getElementById('footerId');
const barManu = document.getElementById('barsmenu');
const signupForm = document.getElementById('userSignUp');
const loginForm = document.getElementById('userLogin');
const loginInputField = document.getElementById('loginPasswordField');
const loginButton = document.getElementById('loginButton');
const emptyDivLogin = document.getElementById('emptyDiv');
// javascript for the hiden side menu

const showHiddenMenu = () => {
  hiddenNavBar.style.display = 'block';
  hiddenNavBar.style.width = '30%';
  mainArea.style.marginLeft = '0';
  navBar.style.marginLeft = '0';
  footer.style.marginLeft = '0';
  barManu.style.display = 'none';
};
const closeHiddenMenu = () => {
  barManu.style.display = 'block';
  hiddenNavBar.style.width = '0';
  mainArea.style.marginLeft = '0';
  navBar.style.marginLeft = '0';
  footer.style.marginLeft = '0';
  barManu.style.transitionDelay = '1.2s';
};
// DISPLAY SIGN UP
const signupFunction = () => {
  signupForm.style.display = 'block';
  document.getElementById('ads-area').style.display = 'none';
  loginForm.style.display = 'none';
  mainArea.style.bodyheight = '100%';
  signupForm.style.scaleY = '1.2s';
};
// CLOSE SIGN UP
const closeSignUpFunction = () => {
  signupForm.style.display = 'none';
  document.getElementById('sliderId').style.display = 'block';
  document.getElementById('ads-area').style.display = 'flex';
};
// VALIDATE CONFIRM PASSWORD

const submitSignupFunction = () => {
  const password = document.getElementById('signupInput');
  const confirmPassword = document.getElementById('confirmPasswordInput');
  const errorMessage = document.getElementById('errorMessage');
  const submitbutton = document.getElementById('submitbutton');
  if ((password.value === confirmPassword.value) && (password.value.length >= 6 && password.value.length <= 12) && (password.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,12})$/))) {
    password.style.borderBottom = 'thin solid green';
    confirmPassword.style.borderBottom = 'thin solid green';
    errorMessage.display = 'none';
    submitbutton.removeAttribute('disabled');
  } else {
    password.style.borderBottom = 'thin solid rgb(252, 193, 66)';
    confirmPassword.style.borderBottom = 'thin solid rgb(252, 193, 66)';
    errorMessage.style.display = 'inline';
    submitbutton.setAttribute('disabled', 'true');
  }
};
// DISPLAY LOGIN

const loginFunction = () => {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  document.getElementById('ads-area').style.display = 'none';
  loginForm.style.scaleY = '1.2s';
};
// CLOSE LOGIN
const closeLignFunction = () => {
  loginForm.style.display = 'none';
  document.getElementById('sliderId').style.display = 'block';
  document.getElementById('ads-area').style.display = 'block';
};
// LOGIN SUBMITION FORM
const loginSubmitFunction = () => {
  const loginformAtt = document.getElementById('loginFormAtt');
  const christian = 'christian@gmail.com';
  const adminEmail = 'admin@gmail.com';
  const staffEmail = 'staff@gmail.com';
  const password = document.getElementById('loginPasswordField').value;
  const loggingInPerson = document.getElementById('loginEmailField').value;

  if ((loggingInPerson === christian || loggingInPerson === adminEmail) && password !== ' ') {
    loginformAtt.setAttribute('action', '../HTML/admin.html');
  } else if (loggingInPerson === staffEmail) {
    loginformAtt.setAttribute('action', '../HTML/staff.html');
  } else if ((loggingInPerson !== christian && loggingInPerson !== adminEmail && loggingInPerson !== staffEmail && loggingInPerson !== ' ' && password !== ' ')) {
    loginformAtt.setAttribute('action', '../HTML/login.html');
  } else {
    // window.location.href = './HTML/login.html';
  }
};
// VALIDATE LOGIN PASSWORD
const onInputLoginFunction = () => {
  const password = document.getElementById('loginPasswordField');
  const errorMessageLogin = document.getElementById('errorMessageLogin');
  if ((password.value.length >= 6 && password.value.length <= 12) && (password.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,12})$/))) {
    loginButton.removeAttribute('disabled');
    password.style.borderBottom = 'thin solid green';
    errorMessageLogin.style.display = 'none';
  } else {
    loginButton.setAttribute('disabled', 'true');
    password.style.borderBottom = 'thin solid rgb(252, 193, 66)';
    errorMessageLogin.style.display = 'inline';
  }
};
// AFTER SIGN UP PAGE
const showHiddenMenuArea = () => {
  document.getElementById('hidden-nav-bar').style.width = '40%';
  document.getElementById('main-areaPage').style.marginLeft = '0';
  document.getElementById('navbarId').style.marginLeft = '0';
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
  document.getElementById('restpassword').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'block';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('debitId').style.display = 'none';
  document.getElementById('usercreateAccount').style.scaleY = '1.2s';
};
// close create account
const closeCreateAccount = () => {
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};
// RESET PASSWORD
const showResetPassword = () => {
  document.getElementById('restpassword').style.display = 'block';
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('debitId').style.display = 'none';
};
const closeResetPassword = () => {
  document.getElementById('restpassword').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};
// create account password validation

const onInputPasswordCreateAccount = () => {
  const passwordAreaId = document.getElementById('passwordAreaId');
  const createAccountSubmit = document.getElementById('createAccountSubmit');
  const errorMessageCreateAccount = document.getElementById('errorMessageCreateAccount');
  if (passwordAreaId.value.length >= 6 && passwordAreaId.value.length <= 12) {
    createAccountSubmit.removeAttribute('disabled');
    passwordAreaId.style.borderBottom = 'thin solid green';
    errorMessageCreateAccount.style.display = 'none';
  } else {
    createAccountSubmit.setAttribute('disabled', 'true');
    passwordAreaId.style.borderBottom = 'thin solid rgb(252, 193, 66)';
    errorMessageCreateAccount.style.display = 'inline';
  }
};
// TRANSACTIONS

// display transactions
const showTransaction = () => {
  document.getElementById('transaction-page').style.display = 'block';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('restpassword').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  // document.getElementById('transaction-page').style.display = 'block';
  document.getElementById('debitId').style.display = 'none';
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
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('restpassword').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'block';
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
  document.getElementById('restpassword').style.display = 'none';
  document.getElementById('debitId').style.scaleY = '1.2s';
};

// close debit page
const closeDebitPage = () => {
  document.getElementById('debitId').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};


console.log('hey there');
