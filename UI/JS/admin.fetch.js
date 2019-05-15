const token = localStorage.getItem('loggertoken');
const firstname = localStorage.getItem('loginfirstname');
const lastname = localStorage.getItem('loginlastname');
const loggedAdminemail = localStorage.getItem('loggeremail');

document.getElementById('loggedadmin').innerHTML = `Names: ${lastname} ${firstname}`;
document.getElementById('loggedAdminEmail').innerHTML = loggeremail;

// CREATE STAFF/ADMIN ACCOUNT

document.getElementById('admincreatestaff').addEventListener('submit', createStaffAdminFunc);

function createStaffAdminFunc(e) {
  e.preventDefault();

  const firstname = document.getElementById('createStaffId1').value;
  const lastname = document.getElementById('createStaffId2').value;
  const email = document.getElementById('createStaffId3').value;
  const password = document.getElementById('signuppassword').value;
  const confirmpassword = document.getElementById('signupconfirmpassword').value;
  const isadmin = document.getElementById('createStaffId6').value;

  fetch('http://localhost:3000/api/v2/auth/createStaff', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      firstname, lastname, email, password, confirmpassword, isadmin,
    }),
  })
    .then(res => res.json())
    .then(async (result) => {
      console.log(result);
      const {
        data, message, error, status,
      } = result;
      if (status === 201) {
        document.getElementById('usercreateAccountAdmin').style.display = 'none';
        document.getElementById('AdminDashboardAccounts').style.display = 'block';
        document.getElementById('transactionsPageHomeId').style.display = 'none';
        document.getElementById('createdstaff').style.display = 'block';
        document.getElementById('adminStaffNames').innerHTML = `Names: ${firstname} ${lastname}`;
        document.getElementById('adminStaffEmail').innerHTML = `Email: ${email}`;
        document.getElementById('adminStaffPassword').innerHTML = `password: ${password}`;
        document.getElementById('adminStaffType').innerHTML = `Type: ${data.type}`;
        document.getElementById('adminStaffIsadmin').innerHTML = `isadmin: ${isadmin}`;
      }
      if (status !== 201) {
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = message;
      }
      if (status === 403 && (isadmin !== 'true' || isadmin !== 'false')) {
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = '<h3> SORRY! isadmin is a boolean type, please enter true or false </h3>';
      }
    });
}
