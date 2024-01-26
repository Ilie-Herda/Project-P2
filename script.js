// Code for countdown
var countDownDate = new Date("Jan 26, 2024 15:00:00").getTime(); // Set the date of the countdown
var x = setInterval(function(){
    var now = new Date().getTime();
    var distance = countDownDate - now

    // Time calculator
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Kom nu langs bij de open dag!";
        document.getElementById("countdown").style.backgroundColor = "#004630";
        document.getElementById("countdown").style.border = "none";
        document.getElementById("countdown").style.fontSize = "50px";
    }
}, 1000);

// Code for changing text at different times of the day.
window.onload = function what(){
    const hour = new Date().getHours(); 
    let greeting;

    if (hour < 12){
    greeting = "Goedemorgen";
    }else if(hour < 18){
    greeting = "Goedemiddag";
    }else if(hour < 23){
    greeting = "Goedeavond";
    }else{
    greeting = "Goedeavond";
    }
    
    document.getElementById("timegreet").innerHTML = greeting;
    document.getElementById("timegreetbot").innerHTML = greeting +"<br>Hoe kan ik je helpen";
};

// Code for the chatbot
document.addEventListener("DOMContentLoaded", function(){
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; 
    const API_KEY = "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"; // API KEY
    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; 
    }

    const generateResponse = (chatElement) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = chatElement.querySelector("p");
    
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            })
        }
        
        // Code for error
        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        }).catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Er is iets misgegaan. Probeer het over een paar seconden opnieuw.";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim(); 
        if(!userMessage) return;

        
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        setTimeout(() => {
            
            const incomingChatLi = createChatLi("Denken...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
    
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {

        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});