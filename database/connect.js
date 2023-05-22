const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.NEXT_PUBLIC_DATABASE_URL);

const conn = async () => {
    try {
        await sequelize.sync(); // Pass `{ force: true }` only if you want to drop existing tables and recreate them
        console.log('Database connection established and tables synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports.db = sequelize;
module.exports.connect = conn;
