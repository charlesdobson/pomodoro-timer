var POMODORO_LENGTH = 25;   //  Standard pomodoro length
var SHORT_BREAK_LENGTH = 5; //  Standard short break length
var LONG_BREAK_LENGTH = 15; //  Standard long break length

var pomodoro = {
    started : false,    //  State of timer
    minutes : 0,        //  Current minutes
    seconds : 0,        //  Current seconds
    fillerHeight : 0,   //  Height of background filler
    fillerIncrement : 0,//  Value to increment fillerHeight
    interval : null,    //  Reference of current interval
    minutesDom : null,  //  Reference of minutes DOM
    secondsDom : null,  //  Reference of seconds DOM
    fillerDom : null,   //  Reference of filler DOM

    init : function() {
        var self = this;

        // Get DOM object references
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.fillerDom  = document.querySelector('#filler');
        this.interval   = setInterval(function() {
            self.intervalCallback.apply(self);
        }, 1000);

        // Listener for "pomodoro" button
        document.querySelector('#pomodoro').onclick = function() {
            self.startPomodoro.apply(self);
        };

        // Listener for "shortBreak" button
        document.querySelector('#shortBreak').onclick = function() {
            self.startShortBreak.apply(self);
        };

        // Listener for "longBreak" button
        document.querySelector('#longBreak').onclick = function() {
            self.startLongBreak.apply(self);
        };

        // Listener for "stop" button
        document.querySelector('#stop').onclick = function() {
            self.stopTimer.apply(self);
        };
    },

    // Called to set variables after button press
    resetVariables : function(minutes, seconds, started) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.started = started;
        this.fillerIncrement = 200/(this.minutes*60);
        this.fillerHeight = 0;   
    },

    // Called by pomodoro listener to set timer
    startPomodoro : function() {
        this.resetVariables(POMODORO_LENGTH, 0, true);
    },

    // Called by shortBreak listener to set timer
    startShortBreak : function() {
        this.resetVariables(SHORT_BREAK_LENGTH, 0, true);
    },

    // Called by longBreak listener to set timer
    startLongBreak : function() {
        this.resetVariables(LONG_BREAK_LENGTH, 0, true);
    },

    // Called by stop listener to stop and reset timer
    stopTimer : function() {
        this.resetVariables(25, 0, false);
        this.updateDom();
    },

    // Add leading 0 if necessary to maintain xx:xx:xx timer format
    toDoubleDigit : function(num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },

    // Updated minutes, seconds and filler height when called
    updateDom : function() {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + 'px';
    },

    // Called each second, update minutes and seconds and calls updateDom to display changes
    intervalCallback : function() {
        if (!this.started) return false;

        if (this.seconds == 0) {
            if (this.minutes == 0) {
                // If both seconds and minutes are 0, timer is completed
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        }
        else {
            this.seconds--;
        }
        this.updateDom();
    },

    // End the timer once complete
    timerComplete : function() {
        this.started = false;
        this.fillerHeight = 0;
    }
};

// Called init() when window loads
window.onload = function() {
    pomodoro.init();
};
