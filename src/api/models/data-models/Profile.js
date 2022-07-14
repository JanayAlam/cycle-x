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
        profilePhoto: {
            type: String,
            required: true,
            default: '/default/default.png'
        },
        dob: {
            type: Date,
        },
        rank: {
            type: Schema.Types.ObjectId,
            ref: 'Rank',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mute: {
            type: Schema.Types.ObjectId,
            ref: 'Mute',
        },
    },
    { timestamps: true }
);

const Profile = model('Profile', profileSchema);

module.exports = Profile;
