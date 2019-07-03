document.querySelectorAll('.allUsersAccounts').forEach((button) => {
  button.addEventListener('click', viewAllUsersAccounts);
});

function viewAllUsersAccounts() {
  fetch('http://localhost:3000/api/v2/accounts', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      const { status, message, data } = result;

      if (status === 200) {
        let accounts = `
            <h3 class="fixedArea">List of all users' bank accounts</h3>
            <table>
              <tr>
                <th class="fixedArea">Account Number</th>
                <th class="fixedArea">Create on</th>
                <th class="fixedArea">owner</th>
                <th class="fixedArea">Type</th>
                <th class="fixedArea">Status</th>
                <th class="fixedArea">Balance</th>
               </tr>
            `;
        result.data.forEach((account) => {
          accounts += `
                <table>
                <tr class="viewAccountRow">
                    <td>${account.accountnumber}</td>
                    <td>${account.createdon}</td>
                    <td>${account.firstname} ${account.lastname}</td>
                    <td>${account.type}</td>
                    <td>${account.status}</td>
                    <td>${account.balance} frw</td>
                </tr>
              </table>
                `;
        });
        document.getElementById('transactionsId').style.display = 'block';
        document.getElementById('transactionsId').innerHTML = accounts;
        localStorage.setItem('allAccounts', accounts);
      }
      if (status !== 200) {
        document.getElementById('transactionsId').style.display = 'block';
        document.getElementById('transactionsId').innerHTML = message;
      }
      console.log(result);
    });
}
const allAcc = localStorage.getItem('allAccounts');
document.getElementById('homepageAccounts').innerHTML = allAcc;
console.log(allAcc);
