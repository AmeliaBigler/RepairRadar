const ioConnection = (io) => {

    io.on("connection", (socket) => {

        socket.on("joinRoom", (data) => {
            const room = data.room
            socket.join(room)
        })

        socket.on("ticket", (data) => {
            data.username = socket.request.session.username
            var stringData = JSON.stringify(data)
            io.emit("newTicket", stringData)
        })
        socket.on("ticketDelete", (data) => {
            console.log("Ticket delete received")
            io.emit("ticketDelete", data)})

        socket.on("ticketWinner", data => {
            console.log("Ticket winner received")
            io.emit("newTicketWinner", data)})

        socket.on("message", (data) => {
            socket.broadcast.to(data.roomId).emit("newMessage", data.content)
        })

        socket.on("disconnect", () => {
            console.log("Disconnected")
        })
    })
}

module.exports = ioConnection