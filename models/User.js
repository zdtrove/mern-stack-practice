const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        default: 1
    },
    location: {
        type: String,
        default: "100 Vo Van Tan, Phuong 5, Quan 11, TP HCM"
    },
    role: {
        type: String,
        default: "User"
    }
});

UserSchema.pre('save', function(next) {
    UserModel.find({ email: this.email }, async (err, docs) => {
        if (!docs.length) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(this.password, salt);
            this.password = passwordHash;
            next();
        } else {
            next("Email already exists");
        }
    });
});

UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;