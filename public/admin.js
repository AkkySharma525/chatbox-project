const socket = io(); // Connect to the server

// Log connection in browser console
socket.on("connect", function() {
    console.log("Admin connected to the server");
});

// Receive messages from chatbox and display them in Admin Dashboard
socket.on("chatMessage", function(msg) {
    console.log("New message received:", msg);
    
    // Create a new list item to display the message
    const li = document.createElement("li");
    li.textContent = msg;

    // Append it to the messages list
    const messagesList = document.getElementById("messages-list");
    messagesList.appendChild(li);

    // Scroll to the latest message
    scrollToBottom(messagesList);
});

// Scroll to the bottom of the message list
function scrollToBottom(messagesList) {
    messagesList.scrollTop = messagesList.scrollHeight;
}

// Sending a reply
const form = document.getElementById("send-message-form");
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    const messageInput = document.getElementById("message");
    const replyMessage = messageInput.value.trim();
    
    // Only send a message if it's not empty
    if (replyMessage) {
        // Send the reply message to the users
        socket.emit("chatMessage", `Admin: ${replyMessage}`);

        // Clear the input field after sending
        messageInput.value = '';
        
        // Scroll to the bottom of the chat list
        scrollToBottom(document.getElementById("messages-list"));
    }
});
