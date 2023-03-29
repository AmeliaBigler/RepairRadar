const sequelize = require('../config/connection');
const { User, Mechanic, Ticket, Bids, Room } = require('../models/index.js');

const userData = require('./userData.json');
const mechanicData = require('./mechanicData.json');
const ticketData = require('./ticketData.json');
const bidsData = require('./bidsData.json');
const roomData = require("./roomData.json")


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
  });

  await Mechanic.bulkCreate(mechanicData, {
    individualHooks: true,
  });

  await Ticket.bulkCreate(ticketData, {
    individualHooks: true,
  });

  await Bids.bulkCreate(bidsData, {
    individualHooks: true,
  });

  await Room.bulkCreate(roomData, {
    individualHooks: true
  });

  process.exit(0);
};

seedDatabase();