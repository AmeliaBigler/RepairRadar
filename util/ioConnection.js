const ioConnection = (io) => {

    io.on("connection", async (socket) => {
        const room = socket.handshake.query.room
        socket.join(room)
        socket.on("message", (data)=> {
            io.to(data.roomId).emit("newMessage", data.content)
        })
        socket.on("disconnect", () => {
            console.log("Disconnected")
        })
    })
}

module.exports = ioConnection