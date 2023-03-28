const ioConnection = (io) => {

    io.on("connection", (socket) => {
        const room = socket.handshake.query.room
        socket.join(room)
        socket.on("message", (data) => {
            socket.broadcast.to(data.roomId).emit("newMessage", data.content)
        })
        socket.on("disconnect", () => {
            console.log("Disconnected")
        })
    })
}

module.exports = ioConnection