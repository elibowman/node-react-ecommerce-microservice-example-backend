import DataTypes from 'sequelize';
import sequelize from '../../db'; 

export const Order = sequelize.define('Order', {
        userId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        preTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        tax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentId: { 
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true 
    }
);

Order.sync({ force: false }); // to toggle in case want to recreate table

export const OrderItem = sequelize.define('OrderItem', {
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DECIMAL
        },
        quantity: {
            type: DataTypes.DECIMAL
        }
    },
    {
        freezeTableName: true,
        indexes: [
            {
                fields: ['orderId', 'productId'], 
                unique: true
            }
        ]
    }
)
// OrderItem.index({ orderId: 1, productId: 1 }, { unique: true });
OrderItem.sync({ force: false });

// // demo code
// const jane = await User.create({
//   username: 'janedoe',
//   birthday: new Date(1980, 6, 20),
// });

// const users = await User.findAll();

export default {
    Order,
    OrderItem
};