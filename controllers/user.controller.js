const { User } = require('../models');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, contact_number, postcode, password, hobbies, gender, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const files = req.files.map(file => file.filename); // store uploaded filenames

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      contact_number,
      postcode,
      password: hashedPassword,
      hobbies,
      gender,
      role,
      files: JSON.stringify(files) // optional: store as JSON string
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } }); // ✅ no 'db.'

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ message: 'Login successful', token });

  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
