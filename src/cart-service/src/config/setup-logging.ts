const morgan = require("morgan");

const setupLogging = (app) => {
    app.use(morgan('combined'));
};

export default setupLogging;