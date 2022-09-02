const { BadRequestError, NotAcceptableError } = require('../errors/apiErrors');
const Account = require('../models/data-models/Account');

const create = async () => {
    // 1: create a new account object
    const account = new Account({});
    // 2: returns the account object
    return account.save();
};

const updateBalance = async (accountId, amount, method) => {
    const account = await Account.findById(accountId);
    if (!account) throw new BadRequestError('Account not found');
    if (method === 'add') {
        account.balance += amount;
    } else if (method === 'sub') {
        account.balance -= amount;
    } else {
        if (!account)
            throw new NotAcceptableError('Invalid method in update balance');
    }
    return account.save();
};

module.exports = {
    create,
    updateBalance,
};
