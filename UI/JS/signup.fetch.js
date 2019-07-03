const names = localStorage.getItem('signupData');
const welcome = localStorage.getItem('message');
const Email = localStorage.getItem('email');
const userfirstname  = localStorage.getItem('userfirstname');
const userlastname  = localStorage.getItem('userlastname');
const useremail  = localStorage.getItem('useremail');


document.getElementById('201signup').innerHTML = welcome;
document.getElementById('signeduser').innerHTML = names;
document.getElementById('useremail').innerHTML = Email;


document.getElementById('inputfirstname').setAttribute('disabled', 'true');
document.getElementById('inputlastname').setAttribute('disabled', 'true');
document.getElementById('inputemail').setAttribute('disabled', 'true');

document.getElementById('inputfirstname').value = userfirstname;
document.getElementById('inputlastname').value = userlastname;
document.getElementById('inputemail').value = useremail;
