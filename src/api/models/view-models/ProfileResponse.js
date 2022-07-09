class ProfileResponse {
    constructor(data) {
        this.id = data._id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.bio = data.bio;
        this.profilePhoto = data.profilePhoto;
        this.dob = data.dob;
        this.rank = data.rank;
        this.user = data.user;
        this.mute = data.mute;
    }
}

module.exports = ProfileResponse;
