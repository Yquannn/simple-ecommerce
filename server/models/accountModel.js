const pool = require('../config/dbConfig.js');

exports.fetchUserByEmail = async (email) => {
  try {
    console.log('Querying database for email:', email);

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // Debug: Log the query result
    console.log('Query result:', rows);

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(`Failed to fetch user by email (${email}):`, error.message);
    throw new Error('Error fetching user');
  }
};




// Fetch all accounts
exports.fetchAll = async () => {
  const [accounts] = await pool.query('SELECT * FROM users');
  return accounts;
};

// Fetch user by MemberId


// Find a user by email
exports.findByEmail = async (email) => {
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return user[0]; // Return the first match (if found)
  } catch (error) {
    console.error('Error finding user by email:', error.message);
    throw new Error('Error finding user');
  }
};

exports.create = async (userName, email, password, role) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (userName, email, password, role) VALUES (?, ?, ?, ?)',
      [userName, email, password, role]
    );
    return {
      UserId: result.insertId, 
      userName,
      email,
      role,
    };
  } catch (error) {
    console.error('Error creating account:', error.message);
    throw error;
  }
};
