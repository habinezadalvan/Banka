import pool from '../../config/db';
import validation from '../../helpers/accounts';

const patch = {

  // ACTIVATE OR DEACTIVE BANK ACCOUNT
  async activateDeactivateAccount(req, res) {
    try {
      if (req.user.isadmin !== true) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry! this service is strictly for the right personnel!',
        });
      } else {
        const { error } = validation.patchValidation(req.body);
        if (error) {
          return res.status(403).json({
            status: 403,
            error: error.details[0].message,
          });
        }
        // verify if the account activate or deactive exist
        if ((isNaN(req.params.accountNumber))) {
          return res.status(403).json({
            status: 403,
            message: 'Sorry the account number do not exist or is not an integer',
          });
        }
        const getAccount = 'SELECT * FROM accounts WHERE accountnumber = $1';
        const enteredAcc = parseInt(req.params.accountNumber, 10);
        const { rows } = await pool.query(getAccount, [enteredAcc]);
        if (!rows[0]) {
          return res.status(404).json({
            status: 404,
            message: `The account you are trying to ${req.body.status} do not exist`,
          });
        }
        if ((rows[0].status) === req.body.status) {
          return res.status(409).json({ status: 409, message: `The account is already ${req.body.status}` });
        }
        const queryText = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
        const values = [req.body.status, enteredAcc];
        await pool.query(queryText, values);
        return res.status(200).json({
          status: 200,
          data: {
            accountData: rows[0].accountnumber,
            status: req.body.status,
            ownerId: rows[0].owner,
            email: rows[0].email,
            accountBalance: rows[0].balance,
          },
          message: `The account has been updated to ${req.body.status}`,
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

export default patch;
