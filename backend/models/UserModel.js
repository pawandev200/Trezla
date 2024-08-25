import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['Admin', 'Agency', 'Company'],
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
}
// { timestamps: true }
);


// Hashing the password before saving it
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Validating the entered password 
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password || "");
};

// Export User Model
const User = mongoose.model('User', userSchema);
export default User;