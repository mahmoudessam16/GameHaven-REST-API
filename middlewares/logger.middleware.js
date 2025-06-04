const loggerMiddleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}, Request Time: ${new Date().toISOString()}`);
    next();
}

export default loggerMiddleware;