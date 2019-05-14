const names = localStorage.getItem('loggernames');
const email = localStorage.getItem('loggeremail');
const message = localStorage.getItem('loggermessage');
const loggerfirstname = localStorage.getItem('loginfirstname');
const loggerlastname = localStorage.getItem('loginlastname');
const loggeremail = localStorage.getItem('loginemail');

// CREATE ACCOUNT FORM
document.getElementById('inputfirstname').setAttribute('disabled', 'true');
document.getElementById('inputlastname').setAttribute('disabled', 'true');
document.getElementById('inputemail').setAttribute('disabled', 'true');

document.getElementById('inputfirstname').value = loggerfirstname;
document.getElementById('inputlastname').value = loggerlastname;
document.getElementById('inputemail').value = loggeremail;

document.getElementById('loggedinuser').innerHTML = names;
document.getElementById('loggedinuseremail').innerHTML = email;
document.getElementById('200login').innerHTML = message;
