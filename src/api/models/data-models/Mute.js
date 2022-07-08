const { Schema, model } = require('mongoose');

const muteSchema = new Schema(
    {
        dayLimit: {
            type: Number,
            min: 1,
            max: 14,
            required: true,
            default: 3,
        },
        isPermanent: {
            type: Boolean,
            required: true,
            default: false,
        },
        reason: {
            type: String,
            required: true,
            maxlength: 250,
            minlength: 5,
        },
    },
    { timestamps: true }
);

const Mute = model('Mute', muteSchema);

module.exports = Mute;
