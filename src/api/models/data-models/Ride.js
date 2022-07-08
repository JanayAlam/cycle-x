const { Schema, model } = require('mongoose');

const rideSchema = new Schema(
    {
        finishedTime: {
            type: Date,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        cycle: {
            type: Schema.Types.ObjectId,
            ref: 'Cycle',
            required: true,
        },
    },
    { timestamps: true }
);

const Ride = model('Ride', rideSchema);

module.exports = Ride;
