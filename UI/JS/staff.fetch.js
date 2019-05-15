const token = localStorage.getItem('loggertoken');
const firstname = localStorage.getItem('loginfirstname');
const lastname = localStorage.getItem('loginlastname');
const loggeremail = localStorage.getItem('loggeremail');

document.getElementById('loggedstaff').innerHTML = `Names: ${lastname} ${firstname}`;
document.getElementById('loggedstaffemail').innerHTML = loggeremail;
