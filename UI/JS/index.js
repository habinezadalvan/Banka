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
    password.style.border = 'thin solid green';
    confirmPassword.style.border = 'thin solid green';
    errorMessage.style.display = 'none';
    submitbutton.removeAttribute('disabled');
  } else {
    password.style.border = 'thin solid red';
    confirmPassword.style.border = 'thin solid red';
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
  document.getElementById('liCreateAcc').setAttribute('class', 'current');
  document.getElementById('liUsersAcc').removeAttribute('class', 'current');
  document.getElementById('liResetPassword').removeAttribute('class', 'current');
  document.getElementById('liDebit').removeAttribute('class', 'current');
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
  document.getElementById('liCreateAcc').removeAttribute('class', 'current');
  document.getElementById('liUsersAcc').setAttribute('class', 'current');
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};
// RESET PASSWORD
const showResetPassword = () => {
  document.getElementById('liResetPassword').setAttribute('class', 'current');
  document.getElementById('liCreateAcc').removeAttribute('class', 'current');
  document.getElementById('liUsersAcc').removeAttribute('class', 'current');
  document.getElementById('liDebit').removeAttribute('class', 'current');
  document.getElementById('restpassword').style.display = 'block';
  document.getElementById('transaction-page').style.display = 'none';
  document.getElementById('usercreateAccount').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'none';
  document.getElementById('viewSpeficAccount').style.display = 'none';
  document.getElementById('debitId').style.display = 'none';
};
const closeResetPassword = () => {
  document.getElementById('liUsersAcc').setAttribute('class', 'current');
  document.getElementById('liResetPassword').removeAttribute('class', 'current');
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
    passwordAreaId.style.border = 'thin solid green';
    errorMessageCreateAccount.style.display = 'none';
  } else {
    createAccountSubmit.setAttribute('disabled', 'true');
    passwordAreaId.style.border = 'thin solid rgb(252, 193, 66)';
    errorMessageCreateAccount.style.display = 'inline';
  }
};
// TRANSACTIONS

// display transactions
const showTransaction = () => {
  document.getElementById('liUsersAcc').setAttribute('class', 'current');
  document.getElementById('liCreateAcc').removeAttribute('class', 'current');
  document.getElementById('liResetPassword').removeAttribute('class', 'current');
  document.getElementById('liDebit').removeAttribute('class', 'current');
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
  document.getElementById('liUsersAcc').setAttribute('class', 'current');
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
  document.getElementById('liDebit').setAttribute('class', 'current');
  document.getElementById('liCreateAcc').removeAttribute('class', 'current');
  document.getElementById('liUsersAcc').removeAttribute('class', 'current');
  document.getElementById('liResetPassword').removeAttribute('class', 'current');
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
  document.getElementById('liUsersAcc').setAttribute('class', 'current');
  document.getElementById('liDebit').removeAttribute('class', 'current');
  document.getElementById('debitId').style.display = 'none';
  document.getElementById('signupDashboard').style.display = 'block';
};

// ADMIN PAGE

// create account admin
const showCreateAccountAdmin = () => {
  document.getElementById('usercreateAccountAdmin').style.display = 'block';
  document.getElementById('AdminDashboardAccounts').style.display = 'none';
  document.getElementById('usersAccountsAdmin').style.display = 'none';
  document.getElementById('restpasswordAdminId').style.display = 'none';
  document.getElementById('viewSpeficAccountAdmin').style.display = 'none';
  document.getElementById('admin1').setAttribute('class', 'current');
  document.getElementById('admin2').removeAttribute('class', 'current');
  document.getElementById('admin3').removeAttribute('class', 'current');
};

// users' accounts
const showUsersAdmin = () => {
  document.getElementById('usersAccountsAdmin').style.display = 'block';
  document.getElementById('AdminDashboardAccounts').style.display = 'none';
  document.getElementById('usercreateAccountAdmin').style.display = 'none';
  document.getElementById('restpasswordAdminId').style.display = 'none';
  document.getElementById('viewSpeficAccountAdmin').style.display = 'none';
  document.getElementById('admin2').setAttribute('class', 'current');
  document.getElementById('admin1').removeAttribute('class', 'current');
  document.getElementById('admin3').removeAttribute('class', 'current');
};

// users' reset password
const showResetPasswordAdmin = () => {
  document.getElementById('restpasswordAdminId').style.display = 'block';
  document.getElementById('AdminDashboardAccounts').style.display = 'none';
  document.getElementById('usercreateAccountAdmin').style.display = 'none';
  document.getElementById('usersAccountsAdmin').style.display = 'none';
  document.getElementById('viewSpeficAccountAdmin').style.display = 'none';
  document.getElementById('admin3').setAttribute('class', 'current');
  document.getElementById('admin1').removeAttribute('class', 'current');
  document.getElementById('admin2').removeAttribute('class', 'current');
};

// View user's account admin
const viewAccountAdmin = () => {
  document.getElementById('viewSpeficAccountAdmin').style.display = 'block';
  document.getElementById('AdminDashboardAccounts').style.display = 'none';
  document.getElementById('usercreateAccountAdmin').style.display = 'none';
  document.getElementById('usersAccountsAdmin').style.display = 'none';
  document.getElementById('admin2').setAttribute('class', 'current');
  document.getElementById('admin1').removeAttribute('class', 'current');
  document.getElementById('admin3').removeAttribute('class', 'current');
};

// close admin pages

const closeAdminPages = () => {
  document.getElementById('admin2').setAttribute('class', 'current');
  document.getElementById('admin1').removeAttribute('class', 'current');
  document.getElementById('admin3').removeAttribute('class', 'current');
  document.getElementById('AdminDashboardAccounts').style.display = 'block';
  document.getElementById('restpasswordAdminId').style.display = 'none';
  document.getElementById('usercreateAccountAdmin').style.display = 'none';
  document.getElementById('usersAccountsAdmin').style.display = 'none';
  document.getElementById('viewSpeficAccountAdmin').style.display = 'none';
};

// AFTER SIGN UP PAGE

// create account after signup
const showCreateAccountSignup = () => {
  document.getElementById('signupCreateAccount').style.display = 'block';
  document.getElementById('transactionsSignup').style.display = 'none';
  document.getElementById('restpasswordSignup').style.display = 'none';
  document.getElementById('signupDashboardId').style.display = 'none';
  document.getElementById('signup1').setAttribute('class', 'current');
  document.getElementById('signup2').removeAttribute('class', 'current');
  document.getElementById('signup3').removeAttribute('class', 'current');
};

// show transaction after signup
const showTransactionsSignup = () => {
  document.getElementById('transactionsSignup').style.display = 'block';
  document.getElementById('signupCreateAccount').style.display = 'none';
  document.getElementById('restpasswordSignup').style.display = 'none';
  document.getElementById('signupDashboardId').style.display = 'none';
  document.getElementById('signup2').setAttribute('class', 'current');
  document.getElementById('signup1').removeAttribute('class', 'current');
  document.getElementById('signup3').removeAttribute('class', 'current');
};
// reset password signup
const showResetPasswordSignup = () => {
  document.getElementById('restpasswordSignup').style.display = 'block';
  document.getElementById('signupCreateAccount').style.display = 'none';
  document.getElementById('transactionsSignup').style.display = 'none';
  document.getElementById('signupDashboardId').style.display = 'none';
  document.getElementById('signup3').setAttribute('class', 'current');
  document.getElementById('signup2').removeAttribute('class', 'current');
  document.getElementById('signup1').removeAttribute('class', 'current');
};
// close signup pages
const closeSignup = () => {
  document.getElementById('signupDashboardId').style.display = 'block';
  document.getElementById('signupCreateAccount').style.display = 'none';
  document.getElementById('transactionsSignup').style.display = 'none';
  document.getElementById('restpasswordSignup').style.display = 'none';
  document.getElementById('signup1').removeAttribute('class', 'current');
  document.getElementById('signup2').removeAttribute('class', 'current');
  document.getElementById('signup3').removeAttribute('class', 'current');
};

// AFTER LOGIN PAGE

// create account after signup
const showCreateAccountLogin = () => {
  document.getElementById('LoginCreateAccountId').style.display = 'block';
  document.getElementById('LoginTransactions').style.display = 'none';
  document.getElementById('Loginrestpassword').style.display = 'none';
  document.getElementById('LoginDashboardId').style.display = 'none';
  document.getElementById('login1').setAttribute('class', 'current');
  document.getElementById('login2').removeAttribute('class', 'current');
  document.getElementById('login3').removeAttribute('class', 'current');
};

// show transaction after signup
const showTransactionLogin = () => {
  document.getElementById('LoginTransactions').style.display = 'block';
  document.getElementById('LoginCreateAccountId').style.display = 'none';
  document.getElementById('Loginrestpassword').style.display = 'none';
  document.getElementById('LoginDashboardId').style.display = 'none';
  document.getElementById('login2').setAttribute('class', 'current');
  document.getElementById('login1').removeAttribute('class', 'current');
  document.getElementById('login3').removeAttribute('class', 'current');
};
// reset password signup
const showResetPasswordLogin = () => {
  document.getElementById('Loginrestpassword').style.display = 'block';
  document.getElementById('LoginCreateAccountId').style.display = 'none';
  document.getElementById('LoginTransactions').style.display = 'none';
  document.getElementById('LoginDashboardId').style.display = 'none';
  document.getElementById('login3').setAttribute('class', 'current');
  document.getElementById('login2').removeAttribute('class', 'current');
  document.getElementById('login1').removeAttribute('class', 'current');
};
// close signup pages
const closeLoginPages = () => {
  document.getElementById('LoginDashboardId').style.display = 'block';
  document.getElementById('LoginCreateAccountId').style.display = 'none';
  document.getElementById('LoginTransactions').style.display = 'none';
  document.getElementById('Loginrestpassword').style.display = 'none';
  document.getElementById('login1').removeAttribute('class', 'current');
  document.getElementById('login2').removeAttribute('class', 'current');
  document.getElementById('login3').removeAttribute('class', 'current');
};


console.log('hey there');
