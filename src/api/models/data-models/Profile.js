const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 15,
            minlength: 3,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 15,
            minlength: 3,
        },
        bio: {
            type: String,
            maxlength: 150,
        },
        profilePhoto: {
            type: String,
        },
        dob: {
            type: Date,
        },
        rank: {
            type: Schema.Types.ObjectId,
            ref: 'Rank',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mute: {
            type: Schema.Types.ObjectId,
            ref: 'Mute',
            required: true,
        },
    },
    { timestamps: true }
);

const Profile = model('Profile', profileSchema);

module.exports = Profile;
