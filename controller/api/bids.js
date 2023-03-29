const bids = require("express").Router();
const { Ticket, Bids, User, Mechanic } = require("../../models/index.js");

bids.post("/:id", async (req, res) => {
    try {
        //Find the mechanic by the username on the request
        const mechanicData = await Mechanic.findOne({
        where: {
            username: req.body.username
        }
        });
        const mechanic = mechanicData.get({ plain: true });
        //Find the ticket that the bid was submitted to
        const ticketData = await Ticket.findByPk(req.params.id);
        const ticket = ticketData.get({ plain: true });
        //Create the bid on that ticket and attach it to the ticket and the mechanic
        await Bids.create({
            amount: req.body.amount,
            content: req.body.content,
            mechanicId: mechanic.id,
            ticketId: ticket.id
        });
        res.status(201).json("Create");
    } catch (err) {
        res.status(400).json(err);
    }
})

bids.delete("/:id", async (req, res) => {
    await Bids.destroy({
        where: {
            id: req.params.id
        }
    });
    const ticketData = await Ticket.findByPk(req.body.id, {
        include: { model: Bids }
    });
    const ticket = ticketData.get({ plain: true });
    res.render("dashboard", { ticket });
});

module.exports = bids