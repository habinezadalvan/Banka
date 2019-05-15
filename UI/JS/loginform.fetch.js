document.getElementById('loginFormAtt').addEventListener('submit', loginfetchfunc);

function loginfetchfunc(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmailField').value;
  const password = document.getElementById('loginPasswordField').value;

  fetch('http://localhost:3000/api/v2/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(async (result) => {
      const {
        status, data, message, error,
      } = result;

      if (status === 200) {
        window.location = '../HTML/login.html';
        await localStorage.setItem('loginfirstname', `${data.firstname}`);
        await localStorage.setItem('loginlastname', `${data.lastname}`);
        await localStorage.setItem('loginemail', `${data.email}`);
        await localStorage.setItem('loggernames', `Names: ${data.lastname} ${data.firstname}`);
        await localStorage.setItem('loggeremail', `Email: ${data.email}`);
        await localStorage.setItem('loggermessage', `${message}`);
        await localStorage.setItem('loggertoken', `${data.token}`);
      }
      if (status !== 200) {
        document.getElementById('409').innerHTML = message;
      }
      if (data.type === 'staff' && data.isadmin === false) {
        window.location = '../HTML/staff.html';
      }
      if (data.type === 'staff' && data.isadmin === true) {
        window.location = '../HTML/admin.html';
      }
      console.log(data.token);
    });
}
