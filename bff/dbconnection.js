const mongoose = require('mongoose');

const initDb = () => {

    const connect = async () => {
        const username = "todouser";
        const password = "todopass";
        const port = "28017";
        const db = "todo";
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        console.log("trying to connect....");

        await mongoose.connect(connectionString(username, password, port, db), options);

    };

    connect();
    mongoose.connection.once('open', () => {
        console.log("Connection Successful");
    });

    function connectionString(username, password, port, db) {
        const authdb = "admin";
        const str = `mongodb://${username}:${password}@localhost:${port}/?authSource=${authdb}`;
        console.log(str);
        return str;
    }
};

module.exports = initDb
