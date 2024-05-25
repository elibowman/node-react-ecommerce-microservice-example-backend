import { DataTypes } from 'sequelize';
import sequelize from '../../db'; 


const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING,
        birthday: DataTypes.DATE,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.INTEGER
    },
    { 
        freezeTableName: true
    }
);
User.sync({ force: false });

// // demo code
// const jane = await User.create({
//   username: 'janedoe',
//   birthday: new Date(1980, 6, 20),
// });

// const users = await User.findAll();

export default User;