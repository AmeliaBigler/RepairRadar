const ticket = require("express").Router()
const { Ticket } = require("../../models/index.js")
const geolib = require("geolib")


ticket.get("/", async (req, res) => {
    const lat = req.query.lat
    const long = req.query.long
    const radius = req.query.radius * 1.609

    console.log(lat, long, radius)
    const ticketData = await Ticket.findAll();
    const tickets = ticketData.map(ticket => ticket.get({ plain: true }))
    const filteredTickets = tickets.filter(ticket => {
        
        var distance = geolib.getDistance(
            {latitude: ticket.lat, longitude: ticket.lon},
            {latitude: lat, longitude: long}
        )
        console.log(distance)
        return  distance <= radius
      });
    console.log(filteredTickets)
    res.end()
})

module.exports = ticket