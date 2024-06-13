const Mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const Db = Mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

async function testConnection() {
  try {
    await Db.getConnection();
    console.log("Koneksi ke database berhasil!!!");
  } catch (error) {
    console.log("Koneksi gagal", error);
  }
}

async function query(sql, values) {
  try {
    const [executeQuery] = await Db.query(sql, values ?? []);
    return executeQuery;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  testConnection,
  query,
};
