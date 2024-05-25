import DataTypes from 'sequelize';
import sequelize from '../../db'; 

const Cart = sequelize.define('Cart', {
        userId: { 
            type: DataTypes.INTEGER
        },
        token: {
            type: DataTypes.STRING
        },
        productId: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true 
    }
);

Cart.sync({ force: false }); // to toggle in case want to recreate table

// // demo code
// const jane = await User.create({
//   username: 'janedoe',
//   birthday: new Date(1980, 6, 20),
// });

// const users = await User.findAll();

export default Cart;