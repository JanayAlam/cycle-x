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

const update = async (id, { nid, email, isEmailVerified }) => {
    const user = await findByProperty('id', id);
    if (!user) {
        throw new BadRequestError('No user found with the provided id');
    }

    if (email) {
        const isEmailValid = await findByProperty('email', email);
        if (isEmailValid) {
            throw new BadRequestError('Email is already in use');
        }
    }

    if (nid) {
        const isNidValid = await findByProperty('nid', nid);
        if (isNidValid) {
            throw new BadRequestError(
                'National identity card is already in use'
            );
        }
    }
    user.nid = nid ? nid : user.nid;
    user.email = email ? email : user.email;
    user.isEmailVerified = isEmailVerified
        ? isEmailVerified
        : user.isEmailVerified;

    return user.save();
};

const getAllUser = () => {
    // 1: get all the users and return
    return User.find();
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
    getAllUser,
    updatePassword,
};
