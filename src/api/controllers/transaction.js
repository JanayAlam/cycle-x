const { account: accountService } = require('../services');
const { BadRequestError } = require('../errors/apiErrors');
const Transaction = require('../models/data-models/Transaction');

const createHandler = async (req, res, next) => {
    const { accountId, amount } = req.body;
    try {
        if (amount <= 0) {
            throw new BadRequestError('Cannot add 0 credits');
        }
        let account = await accountService.findByProperty('id', accountId);
        if (!account) throw new BadRequestError('Could not find account');
        const transaction = new Transaction({
            account: accountId,
            amount,
        });
        account = await accountService.updateBalance(
            accountId,
            amount,
            'add'
        );
        await transaction.save();
        return res.status(200).json(transaction);
    } catch (err) {
        next(err);
    }
};

const getHandler = async (req, res, next) => {
    const { transactionId } = req.params;
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new BadRequestError('Transaction not found');
        return res.status(200).json(transaction);
    } catch (err) {
        next(err);
    }
};

const getAllHandler = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({});
        return res.status(200).json(transactions);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createHandler,
    getHandler,
    getAllHandler,
};
