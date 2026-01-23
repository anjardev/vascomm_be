import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
      },
    },
    {
      paranoid: true, // soft delete
      timestamps: true,
      tableName: 'users',
    }
  );

  return User;
};
