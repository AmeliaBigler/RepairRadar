const message = require("express").Router()
const { Message, Room, User, Mechanic } = require("../models/index.js")
const isAuth = require("../util/isAuth.js")

message.get("/", isAuth, async (req, res) => {
    try {
        if (req.session.isMechanic) {
            const roomData = await Room.findAll({
                where: {
                    mechanicId: req.session.user_id
                },
                include: { model: User }
            })
            const rooms = roomData.map(room => room.get({ plain: true }))
            return res.render("rooms", {
                logged_in: req.session.logged_in,
                rooms: rooms,
                isMechanic: true
            })
        }
        const roomData = await Room.findAll({
            where: {
                userId: req.session.user_id
            },
            include: { model: Mechanic }
        })
        const rooms = roomData.map(room => room.get({ plain: true }))
        res.render("rooms", {
            rooms: rooms,
            isMechanic: false
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

message.get("/:id", isAuth, async (req, res) => {
    const messageData = await Message.findAll({
        where: {
            roomId: req.params.id
        },
        include: [{ model: User }, { model: Mechanic }]
    })
    const messages = messageData.map(message => message.get({ plain: true }))
    res.render("messages", {
        logged_in: req.session.logged_in,
        messages: messages,
        isMechanic: req.session.isMechanic
    })
})

message.post("/:id", isAuth, async (req, res) => {
    try {
        if (req.session.isMechanic) {
            const roomData = await Room.findByPk(req.params.id)
            const room = roomData.get({ plain: true })
            const userId = room.userId
            await Message.create({
                userId: userId,
                mechanicId: req.session.user_id,
                content: req.body.content,
                roomId: req.params.id,
                sentBy: "Mechanic"
            })
            return res.status(201).end()
        }
        const roomData = await Room.findByPk(req.params.id)
        const room = roomData.get({ plain: true })
        const mechanicId = room.mechanicId
        await Message.create({
            userId: req.session.user_id,
            mechanicId: mechanicId,
            content: req.body.content,
            roomId: req.params.id,
            sentBy: "User"
        })
        res.status(201).end()
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = message