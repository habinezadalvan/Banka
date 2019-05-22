const token = localStorage.getItem('loggertoken');
const firstname = localStorage.getItem('loginfirstname');
const lastname = localStorage.getItem('loginlastname');
const loggeremail = localStorage.getItem('loggeremail');

document.getElementById('loggedstaff').innerHTML = `Names: ${lastname} ${firstname}`;
document.getElementById('loggedstaffemail').innerHTML = loggeremail;

document.getElementById('creditsubmit').addEventListener('submit', fetchcreditfunc);

function fetchcreditfunc(e) {
  e.preventDefault();

  const accountNumber = document.getElementById('creditAccountNumberId').value;
  const amount = document.getElementById('creditAmountId').value;

  fetch(`http://localhost:3000/api/v2/transactions/${accountNumber}/credit`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ amount }),
  })
    .then(res => res.json())
    .then(async (result) => {
      const {
        status, data, message, error,
      } = result;
      if (status === 201) {
        document.getElementById('usercreateAccount').style.display = 'none';
        document.getElementById('createdACCnotification').style.display = 'block';
        document.getElementById('credit201message').innerHTML = message;
        document.getElementById('creditDisplaymessage').innerHTML = `You've credited ${amount} frw from ${accountNumber} account number and now the balance is ${data.accountBalance} frw.`;
      }
      if (status !== 201) {
        document.getElementById('accmessage').style.display = 'block';
        document.getElementById('accmessage').innerHTML = message;
      }
      console.log(result);
    });
}
