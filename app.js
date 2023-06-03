$(() => {
    let breakLength = 5;
    let sessionLength = 25;
    let startStop = false;
    let timer_id;
    let time_left;
    let alarm = document.getElementById("beep");

    const formatTime = (minutes, seconds) => {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes + ":" + seconds;
    }

    const playAudio = () => {
        alarm.play();
    }

    const stopAudio = () => {
        alarm.pause();
        alarm.currentTime = 0;
    }

    const timer = () => {
        time_left = $("#time-left").text();
        let count = parseInt(time_left.split(":")[0] * 60) + parseInt(time_left.split(":")[1]);
        count--;
        if (count == -1) {
            playAudio();
            if ($("#timer-label").text() == "Session") {
                $("#time-left").text(formatTime(breakLength, 0));
                $("#timer-label").text("Break");
                return;
            } else {
                $("#time-left").text(formatTime(sessionLength, 0));
                $("#timer-label").text("Session");
                return;
            }
        }
        let minutes = Math.floor(count / 60);
        let seconds = count - minutes * 60;
        time_left = formatTime(minutes, seconds);
        $("#time-left").text(time_left);
    }

    $("#break-length").text(breakLength);
    $("#session-length").text(sessionLength);
    $("#time-left").text(formatTime(sessionLength, 0));

    const selected = {
        "color": "#F03A47",
        "border": "2px solid #F03A47",
        "box-shadow": "none"
    }

    const unselected = {
        "color": "#276FBF",
        "border": "2px solid #276FBF",
        "box-shadow": "1px 1px"
    }

    $("button").on("click", (e) => {

        if (e.target.id == "reset") {
            stopAudio();
            breakLength = 5;
            sessionLength = 25;
            startStop = false;
            $("#start_stop").html('<i class="fa-solid fa-play"></i>').css(unselected);
            $("#break-length").text(breakLength);
            $("#session-length").text(sessionLength);
            $("#time-left").text(formatTime(sessionLength, 0));
            $("#timer-label").text("Session");
            if (timer_id) {
                clearInterval(timer_id);
            }
        }
        
        if (e.target.id == "start_stop") {  
            if (startStop == false) {
                $("#start_stop").html('<i class="fa-solid fa-pause"></i>').css(selected);
                startStop = true;
                timer_id = setInterval(timer, 1000);
            } else {
                $("#start_stop").html('<i class="fa-solid fa-play"></i>').css(unselected);
                clearInterval(timer_id);
                startStop = false;
                $("#time-left").text(time_left);
            }
        }

        if ($(e.target).hasClass("increment")) {
            if (e.target.id == "break-increment") {
                if (breakLength < 60) {
                    breakLength++;
                }
                $("#break-length").text(breakLength);                
            } else {
                if (sessionLength < 60) {
                    sessionLength++;
                }
                $("#session-length").text(sessionLength);
                $("#time-left").text(formatTime(sessionLength, 0));
            }
        } else if ($(e.target).hasClass("decrement")) {
            if (e.target.id == "break-decrement") {
                if (breakLength > 1) {
                    breakLength--;
                }
                $("#break-length").text(breakLength); 
            } else {
                if (sessionLength > 1) {
                    sessionLength--;
                }
                $("#session-length").text(sessionLength);
                $("#time-left").text(formatTime(sessionLength, 0));
            }
        }

    });
});