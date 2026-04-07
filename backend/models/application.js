const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Application', {
    _id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    studentName: { type: DataTypes.STRING, allowNull: false },
    hostelPreference: { type: DataTypes.STRING, allowNull: false },
    roomType: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
  });
};