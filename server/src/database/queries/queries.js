var query=require('./execute_query');

async function isUserExists(username){
    const user=await query(`select * from customer where username=?`,[username]);
    return user;
}

async function createUser(firstname,lastname,username,password,email){
    const user=await query(`INSERT INTO customer (first_name, last_name, username, password, email) VALUES (?,?,?,?,?)`,[firstname,lastname,username,password,email]);
    // const user2=await query(`INSERT INTO customer (first_name, last_name, username, password, email) VALUES ('John', 'Doe', 'johndoe', 'password123', 'johndoe@example.com')`);
    
    return user;
}

async function getUsers(){
    const users=await query(`SELECT * FROM customer`,[]);
    return users;
}

module.exports={
    isUserExists,
    createUser,
    getUsers
}