import bcrypt from 'bcrypt';
import User from '../model/userModel.js' 
import GameAccount from '../model/gameAccountModel.js';
import mongoose from 'mongoose';

// Signup function
export const signup = async (req, res) => {
  try {
    const { username, email, phone, address, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !phone || !address || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate role
    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If a file (image) is uploaded, save the path
    const profilePhoto = req.file ? req.file.filename : null;

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      address,
      password: hashedPassword,
      role, // Set the role (buyer or seller)
      profilePhoto, // Save the filename as reference
    });

    await newUser.save();

    // Return user data excluding sensitive information
    const { password: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password

    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging

    // Handle validation error or any other specific error here
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid user data', error: error.message });
    }

    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};



// Login user by username and password (no JWT)
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if user exists
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'Username not found' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Send success response with user details including role
      res.status(200).json({
          message: 'Login successful',
          user: { 
              username: user.username, 
              id: user._id,
              role: user.role  // Include role in response
          }
      });
  } catch (err) {
      console.error('Server error:', err); // Log the error
      res.status(500).json({ message: 'Server error' });
  }
};


export const viewUser = async (req, res) => {
    const userId = req.params.id; 
  
    try {
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        
        return res.status(400).send({ error: 'Invalid User ID' });
      }

      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  };
  


//code for viewing all user
export const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Find all users and exclude the password
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
      }
      res.status(200).json(users); // Return the list of users
  } catch (error) {
    console.error('Error fetching all users:', error); // Log the error for debugging
  }
}


export const addGameAccount = async (req, res) => {
  try {
      const { description, price, gameName } = req.body; // Include price in the body
      const userId = req.params.userId; // Get userId from the request URL

      // Validate required fields
      if (!description || !price || !gameName) {
          return res.status(400).json({ message: 'Description, price and game name are required' });
      }

      // Find the user by the provided userId
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Extract screenshots from the request
      const screenshots = req.files.screenshots ? req.files.screenshots.map(file => file.filename) : [];

      // Create a new game account with user details
      const newGameAccount = new GameAccount({
          username: user.username,  // Get username from the User model
          email: user.email,        // Get email from the User model
          description,
          gameName,
          price,                    // Include the price in the game account creation
          profilePhoto: user.profilePhoto,  // Use the profile photo from the User schema
          screenshots,
          userId, // Store the user ID to associate the game account with the user
      });

      // Save the new game account to the database
      await newGameAccount.save();

      // Send success response
      res.status(201).json({ message: 'Game account created successfully', newGameAccount });
  } catch (error) {
      console.error('Error adding game account:', error);
      res.status(500).json({ message: 'Error adding game account', error: error.message });
  }
};


export const viewGameAccount = async (req, res) => {
  try {
      const { id } = req.params; 

      const gameAccount = await GameAccount.findById(id);

     
      if (!gameAccount) {
          return res.status(404).json({ message: 'Game account not found' });
      }

   
      res.status(200).json(gameAccount);
  } catch (error) {
      console.error('Error fetching game account:', error);
      res.status(500).json({ message: 'Error fetching game account', error: error.message });
  }
};

export const getAllGameAccounts = async (req, res) => {
  try {
  
      const gameAccounts = await GameAccount.find()
      res.status(200).json(gameAccounts);
  } catch (error) {
      console.error('Error fetching game accounts:', error);
      res.status(500).json({ message: 'Error fetching game accounts', error: error.message });
  }
};



export const updateUser = async (req, res) => {
  const userId = req.params.id; 
  const updates = req.body; // Capture the fields to update from the request body

  try {
      // Find the user by ID and update the fields
      const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }); 

      // If user is not found, return a 404 error
      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      // Send the updated user details as a response
      res.status(200).send(user);
  } catch (err) {
      // Check for ObjectId errors
      if (err.kind === 'ObjectId') {
          return res.status(400).send({ error: 'Invalid User ID' });
      }

      console.error(err);
      res.status(500).send({ error: 'Server error' });
  }
};


/* function to delete the game account */
export const deleteGameAccount = async (req, res) => {
  try {
    const gameAccount = await GameAccount.findByIdAndDelete(req.params.id);
    if (!gameAccount) {
      return res.status(404).json({ message: 'Game account not found' });
    }
    res.status(200).json({ message: 'Game account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
}


/* function to view all game account inserted by one user */
export const viewGameAccountsByUser = async (req, res) => {
  const userId = req.params.userId; 
  console.log('Received userId:', userId);

  // Validate the userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    // Find game accounts associated with the given userId
    const gameAccounts = await GameAccount.find({ userId: userId }); 

    if (gameAccounts.length === 0) {
      return res.status(404).send({ error: 'No game accounts found for this user' });
    }
      
    res.status(200).json(gameAccounts);
  } catch (error) {
      console.error('Error fetching game accounts:', error);
      res.status(500).send({ error: 'Server error' });
  }
};



/* function to update the game account */
export const updateGameAccount = async (req, res) => {
  const userId = req.params.id; 
  const updates = req.body; // Capture the fields to update from the request body

  try {
      // Find the user by ID and update the fields
      const user = await GameAccount.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }); 

      // If user is not found, return a 404 error
      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      // Send the updated user details as a response
      res.status(200).send(user);
  } catch (err) {
      // Check for ObjectId errors
      if (err.kind === 'ObjectId') {
          return res.status(400).send({ error: 'Invalid User ID' });
      }

      console.error(err);
      res.status(500).send({ error: 'Server error' });
  }
};

