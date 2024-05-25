import morgan from "morgan";

const setupLogging = (app: any) => {
    app.use(morgan('combined'));
};

export default setupLogging;
