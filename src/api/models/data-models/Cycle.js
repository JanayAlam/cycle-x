const { Schema, model } = require('mongoose');

const cycleSchema = new Schema(
    {
        cycleNumber: {
            type: String,
            trim: true,
            required: true,
        },
        ridingStatus: {
            type: Boolean,
            default: false,
            required: true,
        },
        model: {
            type: Schema.Types.ObjectId,
            ref: 'Model',
            required: true,
        },
        hub: {
            type: Schema.Types.ObjectId,
            ref: 'Hub',
            required: true,
        },
    },
    { timestamps: true }
);

const Cycle = model('Cycle', cycleSchema);

module.exports = Cycle;
