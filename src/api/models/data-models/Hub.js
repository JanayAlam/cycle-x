const { Schema, model } = require('mongoose');

const hubSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 3,
        },
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Hub = model('Hub', hubSchema);

module.exports = Hub;
