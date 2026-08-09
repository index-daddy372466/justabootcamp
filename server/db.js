require('dotenv').config();
const Pool = require('pg').Pool;
const { Sequelize } = require('sequelize');

// Initialize Sequelize instance with PostgreSQL configurations
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DBU,
  process.env.DBPD,
  {
    host: process.env.DBH,
    port: process.env.DBP,
    dialect: 'postgres',
    logging: false, // Set to console.log to see raw SQL queries
  }
);

const object = {
    host:process.env.DBHV,
    database:process.env.DBV,
    port:process.env.DBPV,
    password:process.env.DBPDV,
    user:process.env.DBUV,
}
const object_local = {
    host:process.env.DBH,
    database:process.env.DB,
    port:process.env.DBP,
    password:process.env.DBPD,
    user:process.env.DBU,
}

// create the pool
const pool = new Pool(process.env.STATUS !== 'production' ? object_local : object)

// async function testDB() {
//     try{
//         let response = await pool.query('select * from newsletter');
//         console.log(response.rows)
//     }
//     catch(err){
//         throw new Error(err)
//     }
// } 

// inject a user
async function injectUser(value){
try{
        // await pool.query('insert into users(email) values($1)',[value]);
        return;
    }
    catch(err){
        throw new Error(err)
    }
}

// find email
async function findEmail(value){
    try{
        let response = await pool.query('select * from users where email = $1',[value]);
        
        console.log("SEARCHING..",[...response.rows].find(r => r.email == value))

        if(await [...response.rows].find(r => r.email == value) == undefined) return false;
        return await [...response.rows].find(r => r.email == value) && response.rows !== undefined ? true : false;
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = {injectUser,findEmail, pool};