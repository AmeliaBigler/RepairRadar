const ioConnection = (io) => {

    io.on("connection", (socket) => {
       
        socket.on("joinRoom", (data) => {
            console.log(`Joining room ${data.room}`)
            const room = data.room
            socket.join(room)
        })
       
        socket.on("ticket", (data) => {
            console.log("Received new ticket!")
            console.log(socket.request.session)
            data.username = socket.request.session.username
            var stringData = JSON.stringify(data)
            io.emit("newTicket", stringData)
        })
        socket.on("ticketDelete", (data) => io.emit("ticketDelete", data))
        
        socket.on("message", (data) => {
            socket.broadcast.to(data.roomId).emit("newMessage", data.content)
        })
        
        socket.on("disconnect", () => {
            console.log("Disconnected")
        })
    })
}

module.exports = ioConnection