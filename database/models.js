const { db } = require('./connect.js');
const { DataTypes } = require('sequelize')

const ComponentPost = db.define('ComponentPost', {
    component_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    thumbnail_url: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(ComponentPost, {
    foreignKey: 'user_id',
    as: 'componentPosts',
});

ComponentPost.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports.ComponentPost = ComponentPost;
module.exports.User = User;
