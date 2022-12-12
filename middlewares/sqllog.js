const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.LOG_HOST,
    user: process.env.LOG_USER,
    password: process.env.LOG_PASSWORD,
    database: "backendlog"
})

const sqllog = (req, res, next) => {
    db.query(`INSERT INTO logs(method,host,path,body,useragent) VALUES ( '${req.method}', '${req.headers.host}', '${req.path}', '${JSON.stringify(req.body)}', '${req.get('user-agent')}' )`, (err) => {
        if (err) {
            console.log(err)
        }

    });
    next();
}

module.exports = { sqllog };