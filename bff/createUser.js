const payload = {
    user: "todouser",
    pwd: "todopass",
    roles: [{
                role:"readWrite", 
                db:"todo"
            },
            {
                role: "dbAdmin", 
                db:"todo"
            }]
};

db.createUser(payload);
