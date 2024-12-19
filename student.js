// Sample structure to store the created tickets
let tickets = [];

// Function to generate unique ticket number
function generateTicketNumber() {
    return 'TKT-' + Math.floor(Math.random() * 10000);
}

// Function to create a ticket
function createTicket(ticketData) {
    const ticketNumber = generateTicketNumber();
    ticketData.ticketNumber = ticketNumber;  // Assign the ticket number
    tickets.push(ticketData);
    displayTicket(ticketData);
}

// Function to display the ticket list in the "Open Ticket" section
function displayTicket(ticketData) {
    const ticketList = document.getElementById("ticket-list");
    const ticketItem = document.createElement("li");
    ticketItem.innerHTML = `
        <span>Ticket Number: <a href="#" onclick="viewTicketDetails('${ticketData.ticketNumber}')">${ticketData.ticketNumber}</a></span> | 
        Category: ${ticketData.category} | Subject: ${ticketData.subject}
    `;
    ticketList.appendChild(ticketItem);

    // Show the ticket list container if it's hidden
    document.getElementById("ticket-list-container").style.display = "block";
}

// Function to show ticket details when the ticket number is clicked
function viewTicketDetails(ticketNumber) {
    const ticket = tickets.find(t => t.ticketNumber === ticketNumber);
    if (ticket) {
        alert(`
            Ticket Number: ${ticket.ticketNumber}
            Subject: ${ticket.subject}
            Category: ${ticket.category}
            Description: ${ticket.description}
        `);
    }
}

const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotBody = document.getElementById('chatbot-body');
const userOptions = document.getElementById('user-options');

// Open Chatbot
chatbotIcon.addEventListener('click', () => {
    chatbotWindow.style.display = 'flex';
});

// Close Chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

// Handle Option Click
function handleOptionClick(userMessage) {
    addMessage('user', userMessage);
    userOptions.style.display = 'none';

    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage('bot', botResponse);

        setTimeout(() => {
            showOptions(); // Show both options again
        }, 500);
    }, 1000);
}

// Add Message Function
function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message');
    if (sender === 'bot') {
        messageDiv.innerHTML = ` 
            <img class="bot-avatar" src="https://cdn-icons-png.flaticon.com/512/13330/13330989.png" alt="Bot">
            <div class="bot-message">${message}</div>
        `;
    } else {
        messageDiv.innerHTML = `<div class="user-message">${message}</div>`;
    }
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Bot Responses
function getBotResponse(userMessage) {
    switch (userMessage) {
        case 'Feedback Form':
            return '<a href="https://docs.google.com/forms/d/e/1FAIpQLSdrcjzdaoskRyopMShIQCh6t6kzXGdVW1FSjSQCwrz2T6c4Zg/viewform" target="_blank" style="color:blue; text-decoration:underline;">Click Here to Provide Feedback</a>';
        case 'How can I submit my complaint on this website?':
            return '1. Choose one option from among these three given icons.<br>' +
                   '2. Use one of the icons like text, image, and options to file your complaint.<br>' +
                   '3. Proceed with submitting your problem.<br>' +
                   '4. To verify if your problem is submitted or not, check the open ticket from the homepage.';
        default:
            return 'I am here to help!';
    }
}

// Show Options
function showOptions() {
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('user-options');

    optionsContainer.innerHTML = `
        <div class="user-option" onclick="handleOptionClick('Feedback Form')">Feedback Form</div>
        <div class="user-option" onclick="handleOptionClick('How can I submit my complaint on this website?')">How can I submit my complaint on this website?</div>
    `;

    chatbotBody.appendChild(optionsContainer);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}