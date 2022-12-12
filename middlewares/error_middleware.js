const { rmSync } = require("fs");

const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode);
    rmSync.json({ message: err.message, stack:err.stack });
}

module.exports={errHandler};