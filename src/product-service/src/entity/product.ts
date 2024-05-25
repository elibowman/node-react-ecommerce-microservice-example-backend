// const DataTypes = require('sequelize');
// const sequelize = require('../../db');

// const Product = sequelize.define('Login', {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         price: {
//             type: DataTypes.STRING
//         },
//         type: {
//             type: DataTypes.STRING
//         },
//         quantity: {
//             type: DataTypes.INTEGER
//         }
//     },
//     {
//         freezeTableName: true
//     }
// );


// const Image = sequelize.define('Image', {
//         productId: {
//             type: DataTypes.STRING,
//             references: {
//                 model: Product,
//                 key: 'id'
//             }
//         }
//     },
//     {
//         freezeTableName: true
//     }
// )

// Product.hasMany(Image);
// Image.belongsTo(Product);

// Product.sync({ force: false });
// Image.sync({ force: false });

// module.exports = Product;



// require('../../db');
import '../../db-mongo';
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    quantity: Number,
    imagePaths: [String]
});

export default mongoose.model("Products", productSchema);
// module.exports = { Product: mongoose.model("Products", productSchema), db };