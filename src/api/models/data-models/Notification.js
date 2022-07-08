const { Schema, model } = require('mongoose');

const notificationSchema = new Schema(
    {
        text: {
            type: String,
            trim: true,
            required: true,
            min: 5,
            max: 150,
        },
        link: {
            type: String,
            trim: true,
            required: true,
            default: '',
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
    }, 
    { timestamps: true }
);

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
