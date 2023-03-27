var url = window.location.pathname
var id = url.split("/")
var isMechanic = document.getElementById("isMechanic").dataset.ismechanic
var chatForm = document.getElementById("chatForm")

var socket = io({query: {room: id[2]}})

const sendChat = async (event) => {
    event.preventDefault()
    var input = document.querySelector("#chatInput")
    var content = document.querySelector("#chatInput").value.trim()
    if(content){
        const response = await fetch(`/messages/${id[2]}`, {
            method: "post",
            body: JSON.stringify({content: content}),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok){
            socket.emit("message",{
                content: content,
                roomId: id[2]
            })
            
            const chat = document.querySelector("#chat")
            const liEl = document.createElement("li")
            liEl.textContent = "You:"
            chat.appendChild(liEl)
            const liEl2 = document.createElement("li")
            liEl2.textContent = content
            chat.appendChild(liEl2)
        }
    }
}
socket.on("newMessage", (data) => {
    console.log(data)
})

document.querySelector("#chatForm").addEventListener("submit", sendChat)