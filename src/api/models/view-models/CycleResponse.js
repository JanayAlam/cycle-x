require('dotenv').config();

class CycleResponse {
    constructor(data) {
        this.id = data._id;
        this.cycleNumber = data.cycleNumber;
        this.ridingStatus = data.ridingStatus;
        this.model = data.model;
        this.hub = data.hub;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

module.exports = CycleResponse;
