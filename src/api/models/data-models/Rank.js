const { Schema, model } = require('mongoose');

const rankSchema = new Schema(
    {
        rankName: {
            type: String,
            enum: ['ELITE', 'GOLD', 'SILVER', 'BRONZE'],
            required: true,
        },
        discount: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

const Rank = model('Rank', rankSchema);

module.exports = Rank;
