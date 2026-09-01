const pool = require("../config/db");

const Admin = {
  async findByUsername(username) {
    const result = await pool.query(
      "SELECT * FROM admins WHERE username = $1",
      [username]
    );

    return result.rows[0];
  }
};

module.exports = Admin;