import pool from '../../config/db';

class ViewAccounts {
  // VIEW ACCOUNT DETAILS BY USER OR STAFF
  static async getAccountDetails(req, res) {
    try {
      // Find owner
      const findOwner = 'SELECT * FROM accounts WHERE owner = $1 AND accountnumber = $2';
      const results = await pool.query(findOwner,
        [req.user.id, parseInt(req.params.accountNumber, 10)]);
      if ((req.user.type !== 'staff') && ((!results.rows[0]) || (results.rows[0].owner !== req.user.id))) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! only staff or owner can view the account details',
        });
      }
      // Find account
      const findaccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const account = await pool.query(findaccount, [parseInt(req.params.accountNumber, 10)]);
      if (!account.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry that Account does not exists',
        });
      }
      // Verify is the account is an integer
      if ((isNaN(req.params.accountNumber, 10))) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry the account number do not exist or is not an integer',
        });
      }
      const accDetailsQueryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE accountnumber = $1';
      const { rows } = await pool.query(accDetailsQueryText,
        [parseInt(req.params.accountNumber, 10)]);
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // VIEW ALL ACCOUNTS OWNED BY A SPECIFIC USER
  static async getAllUserAccounts(req, res) {
    try {
      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      // Verify whether the account exists
      const findEmail = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(findEmail, [req.params.email.toLowerCase()]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry that user does not exist',
        });
      }
      if (req.user.type === 'staff') {
        const innnerJoinQueryText = 'SELECT createdon, accountnumber, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE email = $1';
        const results = await pool.query(innnerJoinQueryText, [req.params.email.toLowerCase()]);
        if (results.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            message: `Sorry ${rows[0].lastname} ${rows[0].firstname} has no account in your Bank!`,
          });
        }
        return res.status(200).json({
          status: 200,
          data: results.rows,
          message: `Above is the list of all bank accounts that ${rows[0].lastname} ${rows[0].firstname} has in your Bank`,
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

export default ViewAccounts;
