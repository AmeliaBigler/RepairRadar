const sequelize = require('../config/connection');
const { User, Mechanic, Parts, Ticket, Bids, TicketParts } = require('../models');

const userData = require('./userData.json');
const mechanicData = require('./mechanicData.json');
const partsData = require('./partsData.json');
const ticketData = require('./ticketData.json');
const bidsData = require('./bidsData.json');
const ticketPartsData = require('./TicketParts.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
  });

  await Mechanic.bulkCreate(mechanicData, {
    individualHooks: true,
  });

  await Parts.bulkCreate(partsData, {
    individualHooks: true,
  });

  await Ticket.bulkCreate(ticketData, {
    individualHooks: true,
  });

  await Bids.bulkCreate(bidsData, {
    individualHooks: true,
  });

  await TicketParts.bulkCreate(ticketPartsData, {
    individualHooks: true,
  });


  process.exit(0);
};

seedDatabase();