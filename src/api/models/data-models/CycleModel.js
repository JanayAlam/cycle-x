const { Schema, model } = require('mongoose');

const cycleModelSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 3,
        },
        modelName: {
            type: String,
            required: true,
            maxlength: 30,
            minlength: 1,
        },
    },
    { timestamps: true }
);

const CycleModel = model('CycleModel', cycleModelSchema);

module.exports = CycleModel;
