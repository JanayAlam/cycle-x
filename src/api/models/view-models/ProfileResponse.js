require('dotenv').config();
const { format } = require('date-fns');

const PORT = process.env.PORT || 5000;

class ProfileResponse {
    constructor(data) {
        this.id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.profilePhoto = `http://localhost:${PORT}/static${data.profilePhoto}`;
        this.dob = format(new Date(data.dob), 'yyyy-MM-dd');
        this.rank = data.rank;
        this.account = data.account;
        this.user = data.user;
        this.mute = data.mute;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

module.exports = ProfileResponse;
