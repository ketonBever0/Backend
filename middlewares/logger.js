const date=new Date();
const logger = (req, res, next) => {
    console.log(`${date.getFullYear()}. ${date.getMonth()+1}. ${date.getDate()}. ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} "Szia mizu?`);
    console.log(`Method: ${req.method}`);
    console.log(`Host: ${req.headers.host}`);
    console.log(`Path: ${req.path}`);
    console.log(`Body ${JSON.stringify(req.body)}`);
    console.log(req.get('user-agent'));


    next();
}

module.exports={logger};