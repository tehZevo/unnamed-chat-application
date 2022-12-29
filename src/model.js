const { Sequelize, Model, DataTypes } = require("sequelize");

const ID = {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
  primaryKey: true,
};

module.exports = (sequelize) => {
  const Channel = sequelize.define('Channel', {
    id: ID
  });

  const Message = sequelize.define('Message', {
    id: ID,
    content: DataTypes.STRING,
  });

  Channel.hasMany(Message);
  Message.belongsTo(Channel);

  return {Channel, Message}
}
