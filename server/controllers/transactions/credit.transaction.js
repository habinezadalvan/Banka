import moment from 'moment';
import mail from '@sendgrid/mail';
import pool from '../../config/db';
import validation from '../../helpers/transactions';


// CREDIT BANK ACCOUNT
const credit = {
  async creditMethod(req, res) {
    try {
      if (req.user.type !== 'staff' || req.user.isadmin === true) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      if (req.user.type === 'staff' && req.user.isadmin === false) {
        // validating debit schema with joi
        const { error } = validation.credit(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            error: error.details[0].message,
          });
        }
        // verify whether this account exists
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: `Sorry! the account ${parseInt(req.params.accountNumber, 10)} does not exists, therefore you can not CREDIT! TRY ANOTHER ONE!`,
          });
        }
        // verify if the account number is integer
        if ((isNaN(req.params.accountNumber))) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry the account number do not exist or is not an integer',
          });
        }
        if (req.body.amount < 0) {
          return res.status(403).json({
            status: 403,
            message: `Sorry! ${req.body.amount} is Negative, please enter valid amount`,
          });
        }
        const creditData = {
          createdOn: moment().format('LL'),
          type: 'credit',
          accountNumber: parseInt(rows[0].accountnumber, 10),
          cashier: req.user.id,
          amount: parseFloat(req.body.amount),
          oldBalance: parseFloat(rows[0].balance),
          newBalance: parseFloat(rows[0].balance) + parseFloat(req.body.amount),
        };

        const updateAccount = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
        const values = [creditData.newBalance, enteredAcc];
        await pool.query(updateAccount, values);

        const creditquery = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1,$2,$3,$4,$5,$6,$7)';
        const results = await pool.query(creditquery, [creditData.createdOn,
          creditData.type,
          creditData.accountNumber,
          creditData.cashier,
          creditData.amount,
          creditData.oldBalance,
          creditData.newBalance]);

        // CREDIT NOTIFICATION WITH SENDGRID

        const queryText = 'SELECT * FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1;';
        const result = await pool.query(queryText, [enteredAcc]);
        mail.setApiKey(process.env.SENDGRID_API_KEY);
        const message = {
          to: result.rows[0].email,
          from: 'bank@gmail.com',
          subject: 'Deposit message',
          html: `<strong>Thank you for using banka, the transaction has done successfully. You have credited ${creditData.amount} frw and now your account balance is ${creditData.newBalance} frw </strong>`,
        };
        mail.send(message);

        return res.status(201).json({
          status: 201,
          data: {
            transactionId: results.id,
            accountNumber: creditData.accountNumber,
            amount: creditData.amount,
            cashier: creditData.cashier,
            transactionType: creditData.transactionType,
            accountBalance: creditData.newBalance,
          },
          message: 'The transaction has been done successfully and the confirmation email has been sent to the client',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  },

};

export default credit;
