const Rank = require('../models/data-models/Rank');

const create = async () => {
    // 1: create a new rank object
    const rank = new Rank({
        rankName: 'BRONZE',
    });
    // 2: returns the rank object
    return rank.save();
};

module.exports = {
    create,
};
