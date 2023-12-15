// Code for countdown

var countDownDate = new Date("Jan 26, 2024 15:00:00:").getTime();
var x = setInterval(function(){
    var now = new Date().getTime();
    var distance = countDownDate - now

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
        document.getElementById("countdown").innerHTML = "Join us";
        document.getElementById("countdown").style.backgroundColor = "#006445";
    }
}, 1000);

// Code for changing text at different times of the day.


window.onload = function what(){
    const hour = new Date().getHours(); 
    let greeting;

    if (hour < 12){
    greeting = "Gooedemorgen";
    }else if(hour < 18){
    greeting = "Goedemiddag";
    }else if(hour < 23){
    greeting = "Goodeavond";
    }else{
    greeting = "Goedeavond";
    }
    
    document.getElementById("test").innerHTML = greeting;
};