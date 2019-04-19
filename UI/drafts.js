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
  
  const creditFunction = () => {
    document.getElementById('liCreateAcc').setAttribute('class', 'current');
    document.getElementById('liUsersAcc').removeAttribute('class', 'current');
    document.getElementById('liResetPassword').removeAttribute('class', 'current');
    document.getElementById('liDebit').removeAttribute('class', 'current');
    document.getElementById('restpassword').style.display = 'none';
    document.getElementById('creditId').style.display = 'block';
    document.getElementById('debitId').style.display = 'none';
    document.getElementById('signupDashboardStaff').style.display = 'none';
    document.getElementById('usersAccountsStaff').style.display = 'none';
    document.getElementById('viewSpeficAccount').style.display = 'none';
    document.getElementById('debitId').style.display = 'none';
    document.getElementById('usercreateAccount').style.scaleY = '1.2s';
  };
  
  // CLOSE STAFF
  const closeCreateAccountStaff = () => {
    document.getElementById('liCreateAcc').removeAttribute('class', 'current');
    document.getElementById('liUsersAcc').setAttribute('class', 'current');
    document.getElementById('creditId').style.display = 'none';
    document.getElementById('signupDashboardStaff').style.display = 'block';
  };
  
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


  // USERS ACCOUNTS STAFF
const usersAccountsFunction = () => {
    document.getElementById('liUsersAcc').setAttribute('class', 'current');
    document.getElementById('liCreateAcc').removeAttribute('class', 'current');
    document.getElementById('liResetPassword').removeAttribute('class', 'current');
    document.getElementById('liDebit').removeAttribute('class', 'current');
    document.getElementById('signupDashboard').style.display = 'none';
    document.getElementById('usersAccountsStaff').style.display = 'block';
    document.getElementById('restpassword').style.display = 'none';
    document.getElementById('usercreateAccount').style.display = 'none';
    document.getElementById('viewSpeficAccount').style.display = 'none';
    // document.getElementById('transaction-page').style.display = 'block';
    document.getElementById('debitId').style.display = 'none';
    document.getElementById('transaction-page').style.scaleY = '1.2s';
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
  
  // for staff
  const ViewSpecificAccountStaff = () => {
    document.getElementById('transaction-page').style.display = 'none';
    document.getElementById('viewSpeficAccountStaffId').style.display = 'block';
    document.getElementById('signupDashboard').style.display = 'none';
    document.getElementById('restpassword').style.display = 'none';
    document.getElementById('usercreateAccount').style.display = 'none';
    document.getElementById('viewSpeficAccount').style.scaleY = '1.2s';
  };
  // display specific account
  const viewSpecificAccountRecord = () => {
    document.getElementById('usersAccountsStaff').style.display = 'none';
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
  const debitFunction = () => {
    document.getElementById('liDebit').setAttribute('class', 'current');
    document.getElementById('liCreateAcc').removeAttribute('class', 'current');
    document.getElementById('liUsersAcc').removeAttribute('class', 'current');
    document.getElementById('liResetPassword').removeAttribute('class', 'current');
    document.getElementById('usersAccountsStaff').style.display = 'none';
    document.getElementById('debitId').style.display = 'block';
    document.getElementById('creditId').style.display = 'none';
    document.getElementById('signupDashboardStaff').style.display = 'none';
  
    document.getElementById('viewSpeficAccount').style.display = 'none';
    document.getElementById('usercreateAccount').style.display = 'none';
    document.getElementById('signupDashboard').style.display = 'none';
    document.getElementById('restpassword').style.display = 'none';
    document.getElementById('debitId').style.scaleY = '1.2s';
  };
  // CLOSE STAFF
  const closeDebitPageStaff = () => {
    document.getElementById('liUsersAcc').setAttribute('class', 'current');
    document.getElementById('liDebit').removeAttribute('class', 'current');
    document.getElementById('debitId').style.display = 'none';
    document.getElementById('signupDashboardStaff').style.display = 'block';
  };
  // OTHER
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
  
  // OTHERS
  const closeDebitPage = () => {
    document.getElementById('liUsersAcc').setAttribute('class', 'current');
    document.getElementById('liDebit').removeAttribute('class', 'current');
    document.getElementById('debitId').style.display = 'none';
    document.getElementById('signupDashboard').style.display = 'block';
  };
  
  