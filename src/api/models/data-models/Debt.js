const { Schema, model } = require('mongoose');

const debtSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true,
        },
    },
    { timestamps: true }
);

const Debt = model('Debt', debtSchema);

module.exports = Debt;
