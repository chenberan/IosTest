//console.log("oha_timer definition")
(function ($) {
    $.fn.oha_timer=function(_opt) {
        var self=this;
        var _default={
            maxTime:-1,     // in the unit of "sec", -1 indicates no-max time
            minTime:0,  // in the unit of "sec"        
            setTime:600,
            stepTime:60,
            microAdjustMode:false,      // Adjust inc/dec timer with step 15 sec when less than 1 min remain time
            microModeStepTime: 15, 
        }
        $.extend(_default, _opt);
        var startT, curT, remainSec;
        var timerH;     // Timer handler
        var timeSet=_default.setTime;
        this.max=_default.maxTime;
        this.min=_default.minTime;
        this.timeup=function() {
            console.log('this.timeup')
    //        timeup();
        }

        if(_default.hasOwnProperty("timeup")) {
//            console.log("timeup is updated");
            this.timeup=_default.timeup;
        }
//        this.each(function() {
////            console.log("hello, oha_timer");
//        });
//       if(typeof _t!=="undefined") {
//            var _tx=parseFloat(_t);
//            if(_tx > 0) {
//                this.setTime(_tx);
//            }
//        }
        if(typeof _max!=="undefined") {
            var max=parseInt(_max);
            if(max >0) {
                this.max=max;
            }
        }
        var lastSetTime=timeSet;
        console.log("oha_timer conductor timeSet="+timeSet);
    //    $(init);

        this.setTime=function(_t) {
            timeSet=_t;
            lastSetTime=_t;
            remainSec=_t;
            $(this).text(formatTime(timeSet));
        };
        
        this.setMax=function(_max) {
            if(typeof _max == "undefined") {
                console.log("oha_timer.setMax has no set time");
                return;
            }
            var max=parseInt(_max);
            if(max >0) {
                this.max=max;
            }
        }

         this.setMin=function(_min) {
            if(typeof _min == "undefined") {
                console.log("oha_timer.setMin has no set time");
                return;
            }
            var min=parseInt(_min);
            if(min >0) {
                this.min=min;
            }
        }

       this.incTime=function(_ts) {
            var t=_default.stepTime;    // Default = 60sec
            if(typeof _ts!=="undefined") {
                t=_ts;
            }
            if(this.max<0 || (this.max>Math.floor((timeSet+t)/60))) {
                timeSet+=t;
                lastSetTime+=t;
                remainSec+=t;
                show(remainSec);
            }
            else {
                if(typeof oha_api !=="undefined") {
                    if(this.max>0) {
                        oha_api.showToast("Timer max. value arrives");
                    }
                }
            }
           return timeSet;
        }

        this.decTime=function(_ts) {
            var t=_default.stepTime;    // Default = 60sec
            if(typeof _ts!=="undefined") {
                t=parseInt(_ts);
            }
            if(remainSec-t>=this.min) {
                timeSet-=t;
                lastSetTime-=t;
                remainSec-=t;
                show(remainSec);
           }
            else {
                if(typeof oha_api !=="undefined") {
                    oha_api.showToast("Invalid operation!!");
                }
            }
            return timeSet;
        }

        this.getRemainTime=function() {
            return remainSec;
        }
        
        this.play=function() {
            startT=new Date().getTime();
            timerH=setInterval(function() {
                checkTime()
            }, 250);
        }

        this.pause=function(){
            clearInterval(timerH);
            lastSetTime=remainSec;
        }

        this.stop=function(){
            stop();
        }

        function init () {
//            console.log("init(), timeSet="+timeSet+","+formatTime(timeSet));
            remainSec=_default.setTime;
            $(self).text(formatTime(timeSet));
//            $(window).ready(function() {
//                $(self).text(formatTime(timeSet));
//            })
    //        $(timerContainer).text(formatTime(timeSet));
        }

        function stop() {
            clearInterval(timerH);
            lastSetTime=timeSet;
            remainSec=timeSet;
            $(self).text(formatTime(timeSet));
        }

        function checkTime() {
            curT=new Date().getTime();
            var _pastSec=Math.floor((curT-startT)/1000);
            var _remain=lastSetTime-_pastSec;
    //        console.log('hello, checkTime, _remain='+_remain+", remainSec="+remainSec)
            if(_remain !==remainSec) {
                remainSec=_remain;
    //            if(remainSec<0) {
    //                remainSec=0;
    //            }
    //            $(timerContainer).text(formatTime(remainSec));
                show(remainSec);
            }
            if(remainSec<=0) {
                console.log("oha_timer stop")
                stop();
                self.timeup();
            }
        }

    //    function timeup() {
    //        console.log('timeup')
    //        this.timeup();
    //    }
        function show(_t) {
            $(self).text(formatTime(_t));
        }

        function formatTime(_sec) {
            var min = Math.floor(_sec / 60);
            sec = _sec - (min * 60);
            /*hundredths = pad(time - (sec * 100) - (min * 6000), 2)*/;
            return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
        }
    //    $(window).load(function() {
    //        this.init();
    //    })

        function pad(number, length) {
            var str = '' + number;
            while (str.length < length) {str = '0' + str;}
            return str;
        }

        init();
        return this;
    }
})(jQuery);
