const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        description: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 200,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        ride: {
            type: Schema.Types.ObjectId,
            ref: 'Ride',
            required: true,
        },
    },
    { timestamps: true }
);

const Review = model('Review', reviewSchema);

module.exports = Review;
