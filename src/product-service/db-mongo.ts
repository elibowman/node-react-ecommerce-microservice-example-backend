import mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0:27017/testDb');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('MongoDb connection established. Ready state: ' + mongoose.connection.readyState);
})

export default db;