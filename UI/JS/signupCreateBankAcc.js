const token = localStorage.getItem('signuptoken');

document.getElementById('userCreateBankAccountId').addEventListener('submit', createaccount);

function createaccount(e) {
  e.preventDefault();

  const type = document.getElementById('inputtype').value;

  fetch('http://localhost:3000/api/v2/Accounts', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ type }),
  })
    .then(res => res.json())
    .then(async (result) => {
      console.log(result);
      const {
        data, message, status, error,
      } = result;

      if (status === 201) {
        document.getElementById('signupCreateAccount').style.display = 'none';
        document.getElementById('signupDashboardId').style.display = 'none';
        document.getElementById('createdACCnotification').style.display = 'block';
        document.getElementById('createdACCnotification').innerHTML = message;
      }
      if (status !== 201) {
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = error[0].message;
      }
      if (status === 403 && (type !== 'savings' || type !== 'current')) {
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = '<h3> SORRY! The account should be (savings or current) type, please enter the right bank account type.</h3>';
      }
    });
}
