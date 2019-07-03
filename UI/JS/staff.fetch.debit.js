
document.getElementById('debitsubmitformId').addEventListener('submit', fetchdebitfunc);

function fetchdebitfunc(e) {
  e.preventDefault();
  const accountNumber = document.getElementById('debitAccountnumberValueId').value;
  const amount = document.getElementById('debitAmountValueId').value;


  fetch(`http://localhost:3000/api/v2/transactions/${accountNumber}/debit`, {
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
        document.getElementById('debitId').style.display = 'none';
        document.getElementById('createdACCnotification').style.display = 'block';
        document.getElementById('credit201message').innerHTML = message;
        document.getElementById('creditDisplaymessage').innerHTML = `You've Debited ${amount} frw from ${accountNumber} account number and now the balance is ${data.accountBalance} frw.`;
      }
      if (status !== 201) {
        document.getElementById('DebitErrMessage').style.display = 'block';
        document.getElementById('DebitErrMessage').innerHTML = message;
      }
      console.log(result);
    });
}
