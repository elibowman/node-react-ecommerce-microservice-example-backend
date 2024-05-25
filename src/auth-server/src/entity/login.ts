import DataTypes from 'sequelize';
import sequelize from '../../db'; 

const Login = sequelize.define('Login', {
        email: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        token: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true 
    }
);
Login.sync({ force: false }); // to toggle in case want to recreate table

// // demo code
// const jane = await User.create({
//   username: 'janedoe',
//   birthday: new Date(1980, 6, 20),
// });

// const users = await User.findAll();

export default Login;

