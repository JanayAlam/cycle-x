const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (_req, _res, cb) => {
        cb(null, 'public/profile-photos');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now().toString()}-${req.user.email.split('@')[0]}${path
                .extname(file.originalname)
                .toLowerCase()}`
        );
    },
});

module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (_req, file, callback) => {
        const types = /jpeg|jpg|png|gif/;
        const extensionName = types.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimeType = types.test(file.mimetype);

        if (extensionName && mimeType) {
            callback(null, true);
        } else {
            callback(new Error('Only support images'));
        }
    },
});
