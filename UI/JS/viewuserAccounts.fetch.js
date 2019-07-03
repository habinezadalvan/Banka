/* eslint-disable no-inner-declarations */

// VIEW USER'S ACCOUNTS

document.querySelectorAll('.viewUsersAccountsClass').forEach((button) => {
  button.addEventListener('click', viewUserAccountsFetch);
});
function viewUserAccountsFetch() {
  const email = localStorage.getItem('useremail');
  fetch(`http://localhost:3000/api/v2/${email}/accounts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .then((result) => {
      const {
        status, message,
      } = result;

      if (status === 200) {
        let accounts = '<h3> Bank accounts';
        result.data.forEach((account) => {
          accounts += `
        <div class="account-detail">
            <input type="button" value="${account.accountnumber}" class="inputright">
            <input type="button" value="transactions" class="inputleft" id="${account.accountnumber}">
        </div>
    `;
        });
        document.getElementById('accountsListId').innerHTML = accounts;

        // VIEW A SPECIFIC BANK ACCOUNT

        document.querySelectorAll('.inputright').forEach((acc) => {
          acc.addEventListener('click', (e) => {
            const accountNumber = e.target.value;
            viewSpecificBankAccount(accountNumber);
          });
        });

        function viewSpecificBankAccount(account) {
          fetch(`http://localhost:3000/api/v2/accounts/${account}`, {
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
                document.getElementById('transactionsId').style.display = 'block';
                document.getElementById('transactionsId').innerHTML = `
                <div id="" class="accountDetails">
                      <h3>Account Details</h3>
                      <div id="paragraphs" class="paragraphs">
                              <p class="paragraph"> <strong> Owner|</strong> ${userfirstname} ${userlastname}</p>
                              <p class="paragraph"><strong> Email|</strong> ${data.email}</p>
                              <p class="paragraph"><strong> Created on|</strong> ${data.createdon}</p>
                              <p class="paragraph"><strong> Account Number|</strong> ${data.accountnumber}</p>
                              <p class="paragraph"><strong> Type|</strong> ${data.type}</p>
                              <p class="paragraph"><strong> Status|</strong> ${data.status}</p>
                              <p class="paragraph"><strong> Balance|</strong> ${data.balance} frw</p>
                      </div>
                </div> `;
              }
              if (status !== 200) {
                document.getElementById('transactionsId').style.display = 'block';
                document.getElementById('transactionsId').innerHTML = message;
              }
              console.log(result);
            });
        }

        // VIEW TRANSACTIONS
        
        document.querySelectorAll('.inputleft').forEach((transaction) => {
          transaction.addEventListener('click', (e) => {
            const accountNumber = e.target.id;
            viewTransactions(accountNumber);
          });
        });

        function viewTransactions(account) {
          fetch(`http://localhost:3000/api/v2/accounts/${account}/transactions`, {
            method: 'GET',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              Authorization: token,
            },
          })
            .then(res => res.json())
            .then((result) => {
              const { status, data, message } = result;
              if (status === 200) {
                let transactions = `
                <h3>List of Transactions</h3>
                <table>
                  <tr>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
                    <th>Old Balance</th>
                    <th>New Balance</th>
                    <th>created on</th>
                   </tr>

                `;
                result.data.forEach((transaction) => {
                  transactions += `
                  <table>
                  <tr>
                      <td>${transaction.accountnumber}</td>
                      <td>${transaction.amount} frw</td>
                      <td>${transaction.type}</td>
                      <td>${transaction.oldbalance} frw </td>
                      <td>${transaction.newbalance} frw </td>
                      <td>${transaction.createdon}</td>
                  </tr>
                </table>
                  `;
                });
                document.getElementById('transactionsId').style.display = 'block';
                document.getElementById('transactionsId').innerHTML = transactions;
              }

              if (status !== 200) {
                document.getElementById('transactionsId').style.display = 'block';
                document.getElementById('transactionsId').innerHTML = message;
              }
              console.log(result);
            });
        }
      }


      if (status !== 200) {
        document.getElementById('accountsListId').innerHTML = message;
      }
      console.log(email);
    });
}


// ANOTHER WAY OF FINDING A SPECIFIC ACCOUNT

// const listOfAccounts = document.getElementsByClassName('inputright');

// function viewSpecificBankAccount(e) {
//   const accountNumber = document.getElementsByClassName('inputright').value;
//   fetch(`http://localhost:3000/api/v2/accounts/${accountNumber}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json, text/plain, */*',
//       'Content-type': 'application/json',
//       Authorization: token,
//     },
//   })
//     .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//     });
// }

// for (let i = 0; i < listOfAccounts.length; i++) {
//   listOfAccounts[i].addEventListener('click', viewSpecificBankAccount);
// }
