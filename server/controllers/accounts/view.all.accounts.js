import pool from '../../config/db';

class ViewAllAccounts {
  // VIEW ALL ACCOUNTS
  static async getAllCounts(req, res) {
    try {
      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      const queryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner';
      const { rows } = await pool.query(queryText);

      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Sorry! No bank account found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }

  // VIEW ALL ACTIVE BANK ACCOUNTS
  static async getAllAccountsByStatus(req, res) {
    try {
      if (req.user.type !== 'staff') {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      }
      const queryText = 'SELECT createdon, accountnumber, email, accounts.type, status, balance FROM accounts INNER JOIN users ON users.id = accounts.owner WHERE status = $1';
      const value = [req.query.status];
      const { rows } = await pool.query(queryText, value);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `Sorry! There is No bank account with ${req.query.status} status in your Bank system`,
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  }
}

export default ViewAllAccounts;
