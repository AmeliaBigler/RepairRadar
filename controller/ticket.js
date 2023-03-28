const ticket = require("express").Router();
const { Ticket, Parts, TicketParts, User, Bids, Mechanic } = require("../models/index.js");
const isAuth = require("../util/isAuth");

ticket.get("/:id", async (req, res) => {
    const ticketData = await Ticket.findByPk(req.params.id, {
        include: [{ model: Mechanic }]
    });
    const ticket = await ticketData.get({ plain: true });

    return res.render("ticket", {
        ticket: ticket
    });
})

ticket.get("/", isAuth, async (req, res) => {
    res.render("newTicket", {
        logged_in: req.session.logged_in,
        user: req.session.username
    });
})

ticket.post("/", isAuth, async (req, res) => {
    try {
        // const userData = await User.findByPk(req.session.user_id);
        // const user = userData.get({ plain: true });
        const newTicket = await Ticket.create({
            title: req.body.title,
            carMake: req.body.carMake,
            carModel: req.body.carModel,
            modelYear: req.body.modelYear,
            issue: req.body.issue,
            userId: req.session.user_id
        },
            {
                returning: ["id"]
            });
        // if (req.body.parts.length){
        //     var parts = req.body.parts
        //     var partsWithIds = parts.map(async part => {
        //         const partData = Parts.findOne({
        //             where: {
        //                 name: part
        //             }
        //         });
        //         var partplain = partData.get({ plain: true });
        //         return {
        //             ticketId: newTicket.id,
        //             partsId: partplain.id
        //         }
        //     });
        //     await TicketParts.bulkCreate(partsWithIds);
        //     return res.status(201).render(`/tickets/${newTicket.id}`);
        // };
        //     var partsData = await Parts.findOne({
        //         where: {
        //             name: req.body.parts
        //         }
        //     });
        //     var part = partsData.get({ plain: true});
        //     await TicketParts.create({
        //         ticketId: newTicket.id,
        //         partsId: parts.id
        //     })
        // res.status(201).render(`./tickets/${newTicket.id}`);
        res.status(201).render('./dashboard');
    }
    catch (error) {
        res.status(500).json(error);
    }
});

ticket.put('/:id', isAuth, async (req, res) => {
    // update a ticket with a winning bid
    /* req.body example:
      {
        "winner":"Sal"
      }
    */
    try {
        const ticketData = await Ticket.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!ticketData) {
            res.status(404).json({ message: 'No ticket with this id!' });
            return;
        }
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

ticket.delete("/:id", isAuth, async (req, res) => {
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
