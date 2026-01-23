import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';

import UserModel from './user.model.js';
import ProductModel from './product.model.js';
import RefreshTokenModel from './refreshToken.model.js';

// ✅ CARA BENAR (PAKAI 1 OBJECT CONFIG)
const sequelize = new Sequelize(databaseConfig);

const db = {};

// init models
db.User = UserModel(sequelize);
db.Product = ProductModel(sequelize);
db.RefreshToken = RefreshTokenModel(sequelize);

// relations
db.User.hasMany(db.RefreshToken, { foreignKey: 'userId' });
db.RefreshToken.belongsTo(db.User, { foreignKey: 'userId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
