
import pool from '../../config/db';


class Transactions {
  // VIEW ALL ACCOUNT TRANSACTIONS
  static async viewAllAccountTransactions(req, res) {
    try {
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      if (req.user.type === 'client') {
        // find the owner of the account
        const findRealOwner = 'SELECT * FROM accounts INNER JOIN transactions ON transactions.accountnumber = accounts.accountnumber WHERE accounts.accountnumber = $1';
        const realOwner = await pool.query(findRealOwner, [parseInt(req.params.accountNumber, 10)]);

        if (realOwner.rows[0].owner !== req.user.id) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry! only the owner of the account can view the transactions history',
          });
        }
        // verify whether the account number is integer
        if ((isNaN(req.params.accountNumber))) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry the account number do not exist or is not an integer',
          });
        }
        // verify whether this account exists
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: `Sorry! the account ${parseInt(req.params.accountNumber, 10)} you are trying to view its transactions does not exists`,
          });
        }

        // Find all the transactions history for a specific account
        const transctionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance  FROM transactions WHERE accountnumber = $1';
        const results = await pool.query(transctionQueryText, [enteredAcc]);
        if (results.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            message: `Sorry! Your account ${enteredAcc} has no transaction yet!`,
          });
        }
        return res.status(200).json({
          status: 200,
          data: results.rows,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // VIEW A SPECIFIC ACCOUNT TRANSACTION
  static async getSpecificTransaction(req, res) {
    try {
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      if (req.user.type === 'client') {
        // verify whether the transaction Id is a number
        if ((isNaN(req.params.transactionId))) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry! the transaction id does not exist or is not an integer',
          });
        }
        // find the owner of the account
        const findaccount = 'SELECT * FROM transactions INNER JOIN accounts ON accounts.accountnumber = transactions.accountnumber WHERE transactions.id = $1';
        const account = await pool.query(findaccount, [parseInt(req.params.transactionId, 10)]);

        if (account.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'Sorry! That transaction does not exists.',
          });
        }
        // verify whether person requesting for a transaction is the owner
        if (account.rows[0].owner !== req.user.id) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry! only the owner of the account can view a specific transaction',
          });
        }

        // Find a specific transaction for a specific user
        const transactionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance FROM transactions WHERE id = $1';
        const { rows } = await pool.query(transactionQueryText,
          [parseInt(req.params.transactionId, 10)]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: 'Sorry that transaction does not exists',
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }
}

export default Transactions;
