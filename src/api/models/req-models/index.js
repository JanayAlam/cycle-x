module.exports = {
    registrationReqModel: require('./auth/register-req-model'),
    loginReqModel: require('./auth/login-req-model'),
    forgetPasswordReqModel: require('./auth/forget-password-req-model'),
    resetPasswordReqModel: require('./auth/reset-password-req-model'),
    changePasswordReqModel: require('./auth/change-password-req-model'),
    profileReqModel: require('./profile/update-profile'),
    userReqModel: require('./user/update-user'),
    hubReqModel: require('./hub/hub-req-model'),
};
