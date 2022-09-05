const { cycle: cycleService, account: accountService } = require('../services');
const { BadRequestError, NotAcceptableError } = require('../errors/apiErrors');
const Ride = require('../models/data-models/Ride');
const Profile = require('../models/data-models/Profile');
const Rank = require('../models/data-models/Rank');

const bookCycle = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { cycleId } = req.body;
    try {
        const profile = await Profile.findOne({ user: userId }).populate({
            path: 'account',
            select: '_id balance',
        });
        if (!profile) throw new BadRequestError('Profile not found');
        if (profile.account.balance < 15) {
            throw new NotAcceptableError('Insufficient balance');
        }
        const cycle = await cycleService.findByProperty('id', cycleId);
        if (!cycle) throw new BadRequestError('Cycle not found');
        let ride = await Ride.findOne({
            profile: profile._id,
            isFinished: false,
        });
        if (ride) {
            throw new BadRequestError(
                'Cannot ride another cycle while riding one'
            );
        }
        ride = await Ride.findOne({ cycle: cycleId, isFinished: false });
        if (ride && !ride.isFinished) {
            throw new BadRequestError('Cannot ride a cycle when its not idle');
        }
        ride = new Ride({
            profile: profile._id,
            cycle: cycleId,
        });
        const createdRide = await ride.save();
        return res.status(201).json(createdRide);
    } catch (err) {
        next(err);
    }
};

const finishRiding = async (req, res, next) => {
    const { _id: userId } = req.user;
    try {
        const profile = await Profile.findOne({ user: userId })
            .populate({
                path: 'account',
                select: '_id balance',
            })
            .populate({
                path: 'rank',
                select: '_id rankName discount',
            });
        if (!profile) throw new BadRequestError('Profile not found');
        let ride = await Ride.findOne({
            profile: profile._id,
            isFinished: false,
        });
        if (!ride) {
            throw new BadRequestError('Could not find a ride');
        }
        ride.isFinished = true;
        ride.finishedTime = new Date();
        const updatedRide = await ride.save();
        const sec =
            (ride.finishedTime.getTime() - ride.createdAt.getTime()) / 1000;
        let cost = (sec / (60 * 60)) * 15;
        cost = cost - cost * (profile.rank.discount / 100);
        await accountService.updateBalance(profile.account._id, cost, 'sub');
        return res.status(200).json(updatedRide);
    } catch (err) {
        next(err);
    }
};

const rankUp = async (req, res, next) => {
    const { profileId } = req.body;
    try {
        const profile = await Profile.findById(profileId);
        if (!profile) throw new BadRequestError('Profile not found');
        const rank = await Rank.findById(profile.rank);
        if (!rank) throw new BadRequestError('Rank not found');
        if (rank.rankName == 'BRONZE') {
            rank.rankName = 'SILVER';
            rank.discount = 5;
        } else if (rank.rankName == 'SILVER') {
            rank.rankName = 'GOLD';
            rank.discount = 10;
        } else if (rank.rankName == 'GOLD') {
            rank.rankName = 'ELITE';
            rank.discount = 20;
        } else {
            throw new BadRequestError('Could not upgrade rank of this profile');
        }
        const updatedRank = await rank.save();
        return res.status(200).json(updatedRank);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    bookCycle,
    finishRiding,
    rankUp,
};
