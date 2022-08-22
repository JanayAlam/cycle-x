require('dotenv').config();

class HubResponse {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.longitude = data.longitude;
        this.latitude = data.latitude;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

module.exports = HubResponse;
