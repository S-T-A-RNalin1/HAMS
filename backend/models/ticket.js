const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Ticket', {
    _id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    studentName: { type: DataTypes.STRING, allowNull: false },
    issue: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'open' },
  });
};