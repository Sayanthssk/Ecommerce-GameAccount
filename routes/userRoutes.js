import express from 'express';
import upload from '../middleware/upload.js'; 
import {  addGameAccount, deleteGameAccount, getAllGameAccounts, loginUser, signup, updateGameAccount, updateUser, viewAllUsers, viewGameAccount, viewGameAccountsByUser, viewUser } from '../control/userControl.js';


const router = express.Router();

// POST route for user signup
router.post('/signup', upload.single('profilePhoto'), signup);
router.post('/login', loginUser)
router.get('/viewuser/:id', viewUser)
router.get('/viewalluser', viewAllUsers)
router.post('/addgameaccount/:userId', upload.fields([{ name: 'screenshots', maxCount: 100 }]), addGameAccount);
router.get('/view/:id', viewGameAccount)
router.get('/game', getAllGameAccounts)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteGameAccount)
router.get('/viewbyuser/:userId', viewGameAccountsByUser)
router.put('/updategame/:id', updateGameAccount)

export default router;
