const { db } = require('./connect.js');
const { DataTypes } = require('sequelize');

const ComponentMeta = db.define('ComponentMeta', {
  component_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  guts_id: {
    type: DataTypes.STRING
  }
});

const User = db.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(ComponentMeta, {
  foreignKey: 'user_id',
  as: 'componentPosts',
});

ComponentMeta.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports.ComponentMeta = ComponentMeta;
module.exports.User = User;
