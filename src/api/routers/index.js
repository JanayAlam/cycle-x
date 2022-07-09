const routes = [
    {
        path: '/auth',
        router: require('./auth'),
    },
    {
        path: '/users',
        router: require('./user'),
    },
];

module.exports = (app) => {
    app.get('/health', (_req, res, _next) => {
        return res.status(200).json({
            message: 'API is okay',
        });
    });

    routes.forEach((route) => {
        if (route.path === '/api/v1') {
            app.get(route.path, route.router);
        } else {
            app.use('/api/v1' + route.path, route.router);
        }
    });
};
