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

const pool = new Pool(process.env.STATUS !== 'production' ? object_local : object)

async function testDB() {
    try{
        let response = await pool.query('select * from newsletter');
        console.log(response.rows)
    }
    catch(err){
        throw new Error(err)
    }
} 
async function injectUser(value){
try{
        await pool.query('insert into newsletter(email) values($1)',[value]);

        console.log(response.rows)
    }
    catch(err){
        throw new Error(err)
    }
}
async function subscribe(value) {
    try{
        await pool.query('update newsletter set status.subribed = "TRUE" status.unsubscribed = "FALSE" where email = $1',[value]);

    }
    catch(err){
        throw new Error(err)
    }
}

async function unsubscribe(value) {
    try{
        await pool.query('update newsletter set status.subribed = "FALSE" status.unsubscribed = "TRUE" where email = $1',[value]);
        console.log('user unsubscribed')
    }
    catch(err){
        throw new Error(err)
    }
}

async function deleteUser(value) {
    try{
        await pool.query('delete from newsletter where email = $1',[value]);
        console.log('user deleted')
    }
    catch(err){
        throw new Error(err)
    }
}



async function findEmail(value){
    try{
        let response = await pool.query('select * from newsletter where email = $1',[value]);
        console.log(response.rows)
        console.log('wtf')
        console.log("SEARCHING..",[...response.rows].find(r => r.email == value))
        if(await [...response.rows].find(r => r.email == value) == undefined) return false;
        return await [...response.rows].find(r => r.email == value) && response.rows !== undefined ? true : false;
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = {injectUser,subscribe,unsubscribe,deleteUser,findEmail, pool};