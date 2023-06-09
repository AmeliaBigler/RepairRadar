const User = require('./User.js');
const Ticket = require('./Ticket.js');
const Bids = require('./Bids.js');
const Mechanic = require('./Mechanic.js');
const Message = require('./Messages.js');
const Room = require('./Rooms.js');
const Part = require('./Parts.js');

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
    foreignKey: 'ticketId',
    onDelete: 'CASCADE'
});

Ticket.hasMany(Bids, {
    foreignKey: "ticketId",
    onDelete: "CASCADE"
});

Mechanic.hasMany(Ticket,{
    foreignKey: 'winner'
});

Ticket.belongsTo(Mechanic, {
    foreignKey: 'winner'
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

Part.belongsToMany(Ticket, {
    foreignKey: "partsId",
    through: {
        model: "TicketParts"
    }
})

module.exports = { User, Ticket, Mechanic, Bids, Room, Message };
