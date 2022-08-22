const { hub: hubService } = require('../services');
const { HubResponse } = require('../models/view-models');
const { NotFoundError } = require('../errors/apiErrors');

const postHandler = async (req, res, next) => {
    const { name, lng, lat } = req.body;
    try {
        const hub = await hubService.create({ name, lng, lat });
        res.status(201).json(new HubResponse(hub));
    } catch (err) {
        next(err);
    }
};

const getHandler = async (req, res, next) => {
    const { hubId } = req.params;
    try {
        const hub = await hubService.findByProperty('id', hubId);
        if (!hub) throw new NotFoundError('Hub not found');
        res.status(200).json(new HubResponse(hub));
    } catch (err) {
        next(err);
    }
};

const getAllHandler = async (req, res, next) => {
    try {
        const hubs = await hubService.getAll();
        res.status(200).json(hubs.map((h) => new HubResponse(h)));
    } catch (err) {
        next(err);
    }
};

const patchHandler = async (req, res, next) => {
    const { hubId } = req.params;
    const { name, lng, lat } = req.body;
    try {
        const hub = await hubService.update(hubId, { name, lng, lat });
        res.status(200).json(new HubResponse(hub));
    } catch (err) {
        next(err);
    }
};

const deleteHandler = async (req, res, next) => {
    const { hubId } = req.params;
    try {
        await hubService.remove(hubId);
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
