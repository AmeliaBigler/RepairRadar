const User = require('./User.js');
const Ticket = require('./Ticket.js');
const Bids = require('./Bids.js');
const Mechanic = require('./Mechanic.js');
const Message = require('./Messages.js');
const Room = require('./Rooms.js');

User.hasMany(Ticket, {
    foreignKey: 'userId',
});

Ticket.belongsTo(User, {
    foreignKey: 'userId'
});

Mechanic.hasMany(Bids, {
    foreignKey: 'mechanicId',
});

Bids.belongsTo(Mechanic, {
    foreignKey: 'mechanicId',
})

Bids.belongsTo(Ticket, {
    foreignKey: 'ticketId'
});

Ticket.hasMany(Bids, {
    foreignKey: "ticketId"
});

Mechanic.hasMany(Ticket,{
    foreignKey: 'winner',
    onDelete: "CASCADE"
});

Ticket.belongsTo(Mechanic, {
    foreignKey: 'winner',
    onDelete: "CASCADE"
});

Message.belongsTo(User, {
    foreignKey: "userId"
})

Message.belongsTo(Mechanic, {
    foreignKey: "mechanicId"
})

Room.belongsTo(User, {
    foreignKey: "userId"
})

Room.belongsTo(Mechanic, {
    foreignKey: "mechanicId"
})

module.exports = { User, Ticket, Mechanic, Bids, Room, Message };
