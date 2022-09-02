const { cycle: cycleService, account: accountService } = require('../services');
const { BadRequestError } = require('../errors/apiErrors');
const Ride = require('../models/data-models/Ride');
const Profile = require('../models/data-models/Profile');

const recharge = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { amount } = req.body;
    try {
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            throw new BadRequestError('Profile not found');
        }
        const account = await accountService.updateBalance(
            profile.account,
            amount,
            'add'
        );
        return res.status(200).json(account);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    recharge,
};
