const User = require('./User.js');
const Ticket = require('./Ticket.js');
const Parts = require('./Parts.js');
const Bids = require('./Bids.js')

User.hasMany(Ticket, {
    foreignKey: 'userId',
});

Ticket.belongsTo(User, {
    foreignKey:'userId'
});

module.exports = { User, Ticket, Parts, Bids
}