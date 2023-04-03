const ticket = require("express").Router()
const { Ticket } = require("../../models/index.js")
const geolib = require("geolib")


ticket.get("/", async (req, res) => {
    const lat = req.query.lat
    const long = req.query.long
    const radius = req.query.radius * 1609.34

    const ticketData = await Ticket.findAll();
    const ticket = ticketData.map(ticket => ticket.get({ plain: true }))
    const filteredTickets = ticket.filter(ticket => {
        
        var distance = geolib.getDistance(
            {latitude: ticket.lat, longitude: ticket.lon},
            {latitude: lat, longitude: long}
        )
        return  distance <= radius
      });
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.render("search", {
        logged_in: req.session.logged_in,
        isMechanic: req.session.isMechanic,
        tickets: filteredTickets
    })
})

module.exports = ticket