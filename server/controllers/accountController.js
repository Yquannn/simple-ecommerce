const accountModel = require('../models/accountModel.js');

exports.getUsers = async (req, res) => {
  try {
    const accounts = await accountModel.fetchAll();
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Debug: Log the userId received from the request
    console.log('Received MemberId:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await accountModel.fetchUserById(userId);

    // Debug: Log the result of fetchUserById
    console.log('Fetched user:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};



exports.addAccount = async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    const newUser = await accountModel.create(userName, email, password, role);
    res.status(201).json({
      message: 'Account created successfully!',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating account:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Account with this email already exists.' });
    } else {
      res.status(500).json({ error: `Failed to create account: ${error.message}` });
    }
  }
};

// Login Endpoint
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Fetch user by email from the database
    const user = await accountModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If login is successful, send a success message
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
