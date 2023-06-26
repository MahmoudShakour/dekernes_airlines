var pool=require('../configuration/config');
var mysql=require('mysql2/promise');

async function query(sql, params) {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, params);
  
    return rows;
}

module.exports=query;