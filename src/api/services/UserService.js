const User = require('../models/data-models/User');
const BadRequestError = require('../errors/apiErrors');

class UserService {
    static findByProperty(key, value) {
        if (key === 'id') {
            return User.findById(value);
        }
        return User.findOne({ [key]: value });
    }

    // static findByProperties(data) {
    //     return User.findOne({ ...data });
    // }

    static async create({ nid, email, password, roles, isEmailVerified }) {
        let user = await this.findByProperty('email', email);
        if (user) throw new BadRequestError('Email address is already in use');

        user = await this.findByProperty('nid', nid);
        if (user)
            throw new BadRequestError(
                'National identity card is already in use'
            );

        const payload = {
            nid,
            email,
            password,
            roles: roles ? roles : ['GENERAL'],
            isEmailVerified: isEmailVerified ? isEmailVerified : false,
        };

        user = new User(payload);
        return user.save();
    }

    static async update(id, data) {
        let user = await this.findUserByProperty('id', id);
        if (!user) {
            throw new BadRequestError('No user found with the provided id');
        }

        if (data.email) {
            user = await this.findUserByProperty('email', data.email);
            if (user) {
                throw new BadRequestError('Email is already in use');
            }
        }

        if (data.nid) {
            user = await this.findUserByProperty('nid', data.nid);
            if (user) {
                throw new BadRequestError(
                    'National identity card is already in use'
                );
            }
        }

        user.nid = data.nid ? data.nid : user.nid;
        user.email = data.email ? data.email : user.email;
        user.isEmailVerified = data.isEmailVerified
            ? data.isEmailVerified
            : user.isEmailVerified;
        user.roles = data.roles ? data.roles : user.roles;

        return user.save();
    }

    static async updatePassword(id, password) {
        let user = await this.findByProperty('id', id);
        if (!user) throw BadRequestError('User not found with the provided id');

        user.password = password;
        return user.save();
    }
}

module.exports = UserService;
