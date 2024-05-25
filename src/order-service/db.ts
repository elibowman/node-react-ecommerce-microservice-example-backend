
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

mongoose.connect('mongodb://0.0.0.0:27017/testDb');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('MongoDb connection established. Ready state: ' + mongoose.connection.readyState);
})


// MySQL
const sequelize = new Sequelize('mysql://root:root@0.0.0.0:3306/testdb');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('MySQL connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.error('Exiting...');
        process.exit();
    }
};

testConnection();

export default sequelize;