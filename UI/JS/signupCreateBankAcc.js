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
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = message;
      }
      if (status !== 201) {
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = error[0].message;
      }
    });
}
