const User = require('./User.js');
const Ticket = require('./Ticket.js');
const Parts = require('./Parts.js');
const Bids = require('./Bids.js');
const Mechanic = require('./Mechanic.js');
const TicketParts = require("./TicketParts")

User.hasMany(Ticket, {
    foreignKey: 'userId',
});

Ticket.belongsTo(User, {
    foreignKey:'userId'
});

Mechanic.hasMany(Bids, {
    foreignKey: 'mechanicId',
    foreignKey: 'userId'
});

Bids.belongsTo(Ticket,{
    foreignKey: 'ticketId'
});

Parts.belongsToMany(Ticket, {
    through: TicketParts
});


module.exports = { User, Ticket, Parts, Mechanic, Bids, TicketParts }
