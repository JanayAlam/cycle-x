const { account: accountService } = require('../services');
const { BadRequestError } = require('../errors/apiErrors');


const getHandler = async (req, res, next) => {
    const { accountId } = req.params;
    try {
        const account = await accountService.findByProperty('id', accountId);
        if (!account) throw new BadRequestError('Account not found');
        return res.status(200).json(account);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getHandler,
};
