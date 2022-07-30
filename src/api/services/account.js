const Account = require('../models/data-models/Account');

const create = async () => {
    // 1: create a new account object
    const account = new Account({});
    // 2: returns the account object
    return account.save();
};

module.exports = {
    create,
};
