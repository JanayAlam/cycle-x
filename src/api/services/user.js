const User = require('../models/data-models/User');
const { BadRequestError } = require('../errors/apiErrors');

const findByProperty = async (key, value) => {
    if (key === 'id') {
        return User.findById(value);
    }
    return User.findOne({ [key]: value });
};

// const findByProperties = (data) => {
//     return User.findOne({ ...data });
// }

const create = async ({ nid, email, password, roles, isEmailVerified }) => {
    let user = await findByProperty('email', email);
    if (user) throw new BadRequestError('Email address is already in use');

    user = await findByProperty('nid', nid);
    if (user)
        throw new BadRequestError('National identity card is already in use');

    const payload = {
        nid,
        email,
        password,
        roles: roles ? roles : ['GENERAL'],
        isEmailVerified: isEmailVerified ? isEmailVerified : false,
    };

    user = new User(payload);
    return user.save();
};

const update = async (id, data) => {
    let user = await findByProperty('id', id);
    if (!user) {
        throw new BadRequestError('No user found with the provided id');
    }

    if (data.email) {
        user = await findByProperty('email', data.email);
        if (user) {
            throw new BadRequestError('Email is already in use');
        }
    }

    if (data.nid) {
        user = await findByProperty('nid', data.nid);
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
};

const updatePassword = async (id, password) => {
    let user = await findByProperty('id', id);
    if (!user) throw BadRequestError('User not found with the provided id');

    user.password = password;
    return user.save();
};

module.exports = {
    findByProperty,
    create,
    update,
    updatePassword,
};
