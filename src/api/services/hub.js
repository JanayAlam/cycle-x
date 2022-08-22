const Hub = require('../models/data-models/Hub');
const { BadRequestError } = require('../errors/apiErrors');

const findByProperty = (key, value) => {
    if (key === 'id') {
        return Hub.findById(value);
    }
    return Hub.findOne({ [key]: value });
};

const create = ({ name, lng, lat }) => {
    const hub = new Hub({
        name: name,
        longitude: lng,
        latitude: lat,
    });
    return hub.save();
};

const update = async (id, { name, lng, lat }) => {
    let hub = await findByProperty('id', id);
    if (!hub) throw new BadRequestError('Hub not found with provided id');
    hub.name = name;
    hub.longitude = lng;
    hub.latitude = lat;
    return hub.save();
};

const getAll = () => {
    // 1: get all the hubs and return
    return Hub.find();
};

const remove = async (id) => {
    let hub = await findByProperty('id', id);
    if (!hub) throw BadRequestError('Hub not found with provided id');
    return hub.remove();
};

module.exports = {
    findByProperty,
    create,
    update,
    getAll,
    remove,
};
