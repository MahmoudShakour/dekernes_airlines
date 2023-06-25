var sqlConfig=require('../configuration/config');
var mysql=require('mysql2/promise');

async function query(sql, params) {
    const connection = await mysql.createConnection(sqlConfig);
    const [results, ] = await connection.execute(sql, params);
  
    return results;
}

module.exports=query;