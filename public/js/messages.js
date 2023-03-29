var url = window.location.pathname;
var id = url.split("/");
var isMechanic = document.getElementById("isMechanic").dataset.ismechanic;
var chatForm = document.getElementById("chatForm");
const chat = document.querySelector("#chat");

var socket = io({ query: { room: id[2] } });

const sendChat = async (event) => {
    event.preventDefault();
    var input = document.querySelector("#chatInput");
    input.value = ""
    var content = document.querySelector("#chatInput").value.trim();
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
            divEl.textContent = "You:";
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
    const divEl = document.createElement("div");
    divEl.textContent = "Them";
    divEl.setAttribute("class", "mine messages")
    chat.appendChild(divEl);
    const divEl2 = document.createElement("div");
    divEl2.textContent = data;
    chat.appendChild(divEl2);
    divEl2.setAttribute("class", "message")
})

document.querySelector("#chatForm").addEventListener("submit", sendChat);