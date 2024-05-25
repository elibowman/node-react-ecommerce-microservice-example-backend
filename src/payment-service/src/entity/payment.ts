import DataTypes from 'sequelize';
import sequelize from '../../db'; 

const Payment = sequelize.define('Payment', {
        orderId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paymentAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true 
    }
);

Payment.sync({ force: false }); // to toggle in case want to recreate table

// // demo code
// const jane = await User.create({
//   username: 'janedoe',
//   birthday: new Date(1980, 6, 20),
// });

// const users = await User.findAll();

export default Payment;