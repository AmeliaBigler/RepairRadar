const ticket = require("express").Router();
const { Ticket, Parts, TicketParts, User, Bids } = require("../models/index.js");
const isAuth = require("../util/isAuth");

ticket.get("/:id", async (req, res) => {
    const ticketData = await Ticket.findByPk(req.params.id);
    const ticket = ticketData.get({ plain: true });
    res.render("ticket", { ticket });
})

ticket.post("/", isAuth, async (req, res) => {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    const newTicket = await Ticket.create({
        title: req.body.title,
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        modelYear: req.body.modelYear,
        issue: req.body.issue,
        userId: user.id
    }, {
        returning: ["id"]
    });
    if (req.body.parts.length){
        var parts = req.body.parts
        var partsWithIds = parts.map(async part => {
            const partData = Parts.findOne({
                where: {
                    name: part
                }
            });
            var partplain = partData.get({ plain: true });
            return {
                ticketId: newTicket.id,
                partsId: partplain.id
            }
        });
        await TicketParts.bulkCreate(partsWithIds);
        return res.status(201).render(`/tickets/${newTicket.id}`);
    };
        var partsData = await Parts.findOne({
            where: {
                name: req.body.parts
            }
        });
        var part = partsData.get({ plain: true});
        await TicketParts.create({
            ticketId: newTicket.id,
            partsId: parts.id
        })
        res.status(201).render(`/tickets/${newTicket.id}`);
});

ticket.delete("/:id", async (req, res) => {
    try {
        await Ticket.destroy({
            where: {
                id: req.params.id
            }
        })
        const ticketData = await Ticket.findByPk(req.body.id, {
            include: { model: Bids }
        });
        const ticket = ticketData.get({ plain: true });
        res.render("dashboard", { ticket });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = ticket;
