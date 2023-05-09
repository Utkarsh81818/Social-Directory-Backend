import mongoose from 'mongoose';
const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    dob: {
        type: String,
        required: true,
        minlength: 2
    },
    interests: [
        String
    ],
    location: {
        type: String,
        required: true,
        minlength: 2
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Profile = mongoose.model("profile", profileSchema)

export default Profile;