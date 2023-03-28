const bids = require("express").Router();
const { Ticket, Bids, User, Mechanic } = require("../../models/index.js");

bids.post("/:id", async (req, res) => {
    try {
        const mechanicData = await Mechanic.findOne({
        where: {
            username: req.body.username
        }
        });
        const mechanic = mechanicData.get({ plain: true });
        const ticketData = await Ticket.findByPk(req.params.id);
        const ticket = ticketData.get({ plain: true });
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