const http = require('http');
const initDb = require('./dbconnection');

const hostname = "localhost";
const port = "9001";

const server = http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader("Content-type","text/plain");
    res.end("i am god");
});

server.listen(port,hostname,()=>{
    console.log(`server started at ${hostname}:${port}`);
    initDb();
})