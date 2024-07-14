import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    weatherData: [
        {
            date: { type: Date, required: false },
            data: { type: Object, required: false },
        }
    ]
});

const User = mongoose.model("User", userSchema);

export default User;