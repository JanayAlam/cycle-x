const Cycle = require('../models/data-models/Cycle');
const { BadRequestError } = require('../errors/apiErrors');

const findByProperty = (key, value) => {
    if (key === 'id') {
        return Cycle.findById(value);
    }
    return Cycle.findOne({ [key]: value });
};

const create = ({ cycleNumber, model, hubId }) => {
    const cycle = new Cycle({
        cycleNumber,
        model,
        hub: hubId,
    });
    return cycle.save();
};

const update = async (id, { cycleNumber, ridingStatus, model, hubId }) => {
    let cycle = await findByProperty('id', id);
    if (!cycle) throw new BadRequestError('Cycle not found with provided id');

    if (cycleNumber && cycleNumber !== cycle.cycleNumber) {
        const query_cycle = await findByProperty('cycleNumber', cycleNumber);
        if (query_cycle) {
            throw new BadRequestError('Cycle number already exist');
        }
    }

    cycle.ridingStatus = ridingStatus
        ? ridingStatus !== undefined
        : cycle.ridingStatus;
    cycle.model = model ? model : cycle.model;
    cycle.cycleNumber = cycleNumber ? cycleNumber : cycle.cycleNumber;
    cycle.hub = hubId ? hubId : cycle.hub;

    return cycle.save();
};

const getAll = () => {
    // 1: get all the cycles and return
    return Cycle.find();
};

const remove = async (id) => {
    let cycle = await findByProperty('id', id);
    if (!cycle) throw BadRequestError('Cycle not found with provided id');
    return cycle.remove();
};

module.exports = {
    findByProperty,
    create,
    update,
    getAll,
    remove,
};
