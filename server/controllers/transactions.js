
import pool from '../config/db';


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
        // verify whether this account exists
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: 'Sorry! the account you are trying to view its transactions does not exists',
          });
        }
        const transctionQueryText = 'SELECT id, createdon, type, accountnumber, amount, oldbalance, newbalance  FROM transactions WHERE accountnumber = $1';
        const results = await pool.query(transctionQueryText, [enteredAcc]);
        if (results.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'There is no transaction yet!',
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
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }
}

export default Transactions;
