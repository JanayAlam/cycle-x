class UserResponse {
    constructor(data) {
        this.id = data._id;
        this.nid = data.nid;
        this.email = data.email;
        this.isEmailVerified = data.isEmailVerified;
        this.roles = data.roles;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

module.exports = UserResponse;
