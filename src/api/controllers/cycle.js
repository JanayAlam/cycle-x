const { cycle: cycleService } = require('../services');
const { CycleResponse } = require('../models/view-models');
const { NotFoundError } = require('../errors/apiErrors');

const postHandler = async (req, res, next) => {
    const { cycleNumber, model, hubId } = req.body;
    try {
        const cycle = await cycleService.create({ cycleNumber, model, hubId });
        res.status(201).json(new CycleResponse(cycle));
    } catch (err) {
        next(err);
    }
};

const getHandler = async (req, res, next) => {
    const { cycleId } = req.params;
    try {
        const cycle = await cycleService.findByProperty('id', cycleId);
        if (!cycle) throw new NotFoundError('Cycle not found');
        res.status(200).json(new CycleResponse(cycle));
    } catch (err) {
        next(err);
    }
};

const getAllHandler = async (req, res, next) => {
    try {
        const cycles = await cycleService.getAll();
        res.status(200).json(cycles.map((c) => new CycleResponse(c)));
    } catch (err) {
        next(err);
    }
};

const patchHandler = async (req, res, next) => {
    const { cycleId } = req.params;
    const { cycleNumber, ridingStatus, model, hubId } = req.body;
    try {
        const cycle = await cycleService.update(cycleId, {
            cycleNumber,
            ridingStatus,
            model,
            hubId,
        });
        res.status(200).json(new CycleResponse(cycle));
    } catch (err) {
        next(err);
    }
};

const deleteHandler = async (req, res, next) => {
    const { cycleId } = req.params;
    try {
        await cycleService.remove(cycleId);
        res.status(203).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postHandler,
    getHandler,
    getAllHandler,
    patchHandler,
    deleteHandler,
};
