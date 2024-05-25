import proxy from 'express-http-proxy';

const setupProxies = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, proxy(r.proxy.target));
    })
};

export default setupProxies;