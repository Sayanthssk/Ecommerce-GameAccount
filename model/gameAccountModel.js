import mongoose from 'mongoose';

const GameAccountSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    gameName: { type: String, required: true },  
    description: { type: String, required: true },
    price: { type: Number, required: true }, 
    profilePhoto: { type: String, required: false },
    screenshots: { type: [String], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const GameAccount = mongoose.model('GameAccount', GameAccountSchema);
export default GameAccount;
