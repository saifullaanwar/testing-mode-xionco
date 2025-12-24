import mysql from 'mysql';
//create database connection createPool createConnection
var database = mysql.createPool({
     connectionLimit: 10000, // jumlah maksimum koneksi aktif
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xioncodatabases'//
});
/* dtbase.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
}); */
//database xionco.com
var dtbase2 = mysql.createPool({
     connectionLimit: 10000, // jumlah maksimum koneksi aktif
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xioncocom_database'//
});
//export default dtbase;
export {database,dtbase2};