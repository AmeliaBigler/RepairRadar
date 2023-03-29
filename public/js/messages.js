var url = window.location.pathname;
var id = url.split("/");
var isMechanic = document.getElementById("isMechanic").dataset.ismechanic;
const chat = document.querySelector("#chat");

var socket = io({ query: { room: id[2] } });

const sendChat = async (event) => {
    event.preventDefault()
    var input = document.querySelector("#chatInput")
    var content = document.querySelector("#chatInput").value.trim();
    var date = new Date().toLocaleTimeString("en-us", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: "numeric",
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
    })
    input.value = ""
    if (content) {
        const response = await fetch(`/messages/${id[2]}`, {
            method: "post",
            body: JSON.stringify({ content: content }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            socket.emit("message", {
                content: content,
                roomId: id[2]
            });

            const divEl = document.createElement("div");
            divEl.textContent = `You at ${date}`;
            divEl.setAttribute("class", "yours messages")
            chat.appendChild(divEl);
            const divEl2 = document.createElement("div");
            divEl2.textContent = content;
            divEl.appendChild(divEl2);
            divEl2.setAttribute("class", "message")
        }
    }
}
socket.on("newMessage", (data) => {
    var date = new Date().toLocaleTimeString("en-us", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: "numeric",
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
    })
    const divEl = document.createElement("div");
    divEl.textContent = `Them at ${date}`;
    divEl.setAttribute("class", "mine messages")
    chat.appendChild(divEl);
    const divEl2 = document.createElement("div");
    divEl2.textContent = data;
    divEl.appendChild(divEl2);
    divEl2.setAttribute("class", "message")
})

var chatForm = document.getElementById("submit").addEventListener("click", sendChat)