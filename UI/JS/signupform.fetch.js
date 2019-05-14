
document.getElementById('signupsubmitform').addEventListener('submit', signupuser);

function signupuser(e) {
  e.preventDefault();

  const firstname = document.getElementById('signupfirstname').value;
  const lastname = document.getElementById('signuplastname').value;
  const email = document.getElementById('signupemail').value;
  const password = document.getElementById('signuppassword').value;
  const confirmpassword = document.getElementById('signupconfirmpassword').value;

  fetch('http://localhost:3000/api/v2/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      firstname, lastname, email, password, confirmpassword,
    }),
  })
    .then(res => res.json())
    .then(async (result) => {
      if (result.status === 201) {
        window.location = '../HTML/signup.html';
        const {
          data, message,
        } = result;
        await localStorage.setItem('message', `${message}`);
        await localStorage.setItem('signupData', `Names: ${lastname} ${firstname}`);
        await localStorage.setItem('email', `Email: ${email}`);
        await localStorage.setItem('userfirstname', `${firstname}`);
        await localStorage.setItem('userlastname', `${lastname}`);
        await localStorage.setItem('useremail', `${email}`);
        await localStorage.setItem('signuptoken', `${data.token}`);
      }

      if (result.status !== 201) {
        document.getElementById('409').innerHTML = result.message;
      }
      console.log(result);
    });
}

console.log('fetch api');
