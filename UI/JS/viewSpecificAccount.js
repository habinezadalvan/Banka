
// // VIEW A SPECIFIC BANK ACCOUNT
// const accountNumb = localStorage.getItem('signupAccountnumber');
// // console.log(accountNumber);
// document.getElementById(`${accountNumb}`).addEventListener('click', viewSpecificBankAccount);

// function viewSpecificBankAccount() {
//   const accountNumber = document.getElementsByClassName(`${accountNumb}`).value;
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

// console.log(accountNumb);
