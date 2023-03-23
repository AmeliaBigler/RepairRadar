const bids = require("express").Router()
const { Ticket, Bids, User, Mechanic } = require("../../models/index.js")

bids.post("/:id", async (req, res) => {
    const userData = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    const user = userData.get({ plain: true })
    const ticketData = await Ticket.findByPk(req.params.id)
    const ticket = ticketData.get({ plain: true })
    await Bids.create({
        content: req.body.content,
        mechanicId: user.id,
        ticketId: ticket.id
    })
    res.status(201).json("Create")
})

bids.delete("/bid/:id", async (req, res) => {
    await Bids.destroy({
        where: {
            id: req.params.id
        }
    })
    const ticketData = await Ticket.findByPk(req.body.id, {
        include: { model: Bids }
    });
    const ticket = ticketData.get({ plain: true });
    res.render("dashboard", { ticket });
});

module.exports = bids