// JavaScript Document
	var ohaVer=0;
    var patR;
    var powerStus={
        off:"off",
        pause:"pause",
        play: "play", 
        stop:"stop", 

    }
    var isDevReady=0;
	function addhylerlink(){

$("body").prepend('<a href="../PhoneBull/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true'+'" id="quickstitch"><img src="../PhoneBull/img/icon.png"></a>')
}


	
	
	
$(window).load(function(){
//	alert("setCookie global(1)");
 
    oha_api.DevPlugIn=function() {
 		DeviceId=oha_api.DeviceId;
        $("#powerbtn").attr("status",powerStus.stop);
 		$.cookie('isLock', false, {expires:365, path:'/'});
 		$.cookie('devId', DeviceId, {expires:365, path:'/'});
 		OHA_CertOK();
    }

    oha_api.DevPlugOut=function() {
        jQuery(".loadingdot").removeClass("active");
        jQuery("#detect").show();
        jQuery("#powerbtn").hide();
        jQuery("#BusyMsg").hide();
        jQuery("#NoDevMsg").show();
        jQuery("#quickstitch").show();
        //	 poweron();
        //	 startOutput();
        jQuery(".powctrlbtn.stop").click();
        jQuery("#powctrlbtn").hide();
        jQuery(".powerbtn.active,.powerbtnX.active").hide();
        jQuery(".powerbtn.noactive,.powerbtnX.noactive").show();
        $(".modebtn").removeClass("working");
        $("#powerbtnX").removeClass("online");
        time_stop();
        DeviceId=-1;
        $.cookie('loadOK', '0', {expires:365, path:'/'});
        $.cookie('devId', '-1', {expires:365, path:'/'});
        isDevReady=0;
        $("#quickstitch").attr("href", '../PhoneBull/default.html?OHA_DevId=-1&OHA_Local=true');
        $("#powerbtn").attr("status",powerStus.off);
    }
        
    if(typeof oha_config.isCheckModelName == "undefined") {
         oha_config.isCheckModelName=true;
     }
   $.cookie('dfPage', '1', {expires:365, path:'/'});
    setsize();

	var uAgent=navigator.userAgent;
	var _vIdx=uAgent.indexOf("oVer:");
	if(_vIdx>=0) {
		ohaVer=parseInt(uAgent.substr(_vIdx+5, 2));
//		alert("ohaVer="+ohaVer);
		if(isNaN(ohaVer)) {
			ohaVer=0;
		}
	}
	var ual=uAgent.length;
	var _lang="";
	switch(ohaVer) {
	case 0:
		_lang=uAgent.substr(ual-2,2);
//		alert("Lang(0)="+_lang);
	break;
	case 1:
		var i=uAgent.indexOf("oLang:");
		_lang=uAgent.substr(i+6,2);
//		alert("Lang(1)="+_lang);
	break;
	}
	_lang=_lang.toUpperCase();

	setcookies();
	if(ohaVer==0) {
		$("#settings").hide();
	}

addhylerlink()
//if($.cookie('pload'+_lang)==null) {
//	document.location.href='../PhoneBull/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true';
//}

	var _url=document.documentURI;
	var _idx=_url.indexOf('?');
	_url=_url.substring(_idx+1);
	var pl=_url.split('&');
	for(var i=0;i<pl.length;i++) {
		var p=pl[i].split('=');
		if(p[0].trim()=='OHA_DevId') {
			DeviceId=parseInt(p[1]);
			if(DeviceId>=0) {
				isDevReady=1;
			}
		}
	}
//	var p=_url.split(':');
//	alert("p="+p);

	if(isDevReady==1) {
		if(DeviceId==-1) {
			OHA_CertOK(oha_config.model);
		}
		else {
			oha_api.DevPlugIn(oha_config.model);
		}
	}

	
 });
 


onresize=function() {
	sf=$(window).height()/1.5;
	if(sf>$(window).width()) {
		sf=$(window).width();
	}
    setsize();
}
//alert("Hello, othe TENS");
function setsize() {
//	$(".main").css({"padding-top":($(window).height()*5)/100+"px"});
	sf=$(window).height()/1.5;
	if(sf>$(window).width()) {
		sf=$(window).width();
	}
//	$("#usingtime").css({"padding-top":($(window).height()*5)/100+"px"});
//	$("#mainctrl").css({"padding-top":($(window).height()*8)/100+"px"});
//	$("#powerctrl").css({"padding-top":($(window).height()*8)/100+"px"});
	$("h3").css("font-size",sf*0.04+"px");
	$("h4").css("font-size",sf*0.03+"px");
	$("#status").css({"width":($(window).width()*20)/100,"height":($(window).width()*20)/100, "margin":"auto"});
	$(".modebtn").css({"font-size":($(window).width()*3)/100+"px","width":($(window).width()*15)/100+"px"});
	$(".modelist,.strlist").css({"width":($(window).width()*15)/100,"height":($(window).width()*15)/100, "font-size":($(window).width()*5)/100+"px","line-height":($(window).width()*15)/100+"px"});
	$(".timelist").css({"width":($(window).width()*15)/100,"height":($(window).width()*15)/100, "font-size":($(window).width()*5)/100+"px","line-height":($(window).width()*15)/100+"px"});
	$(".strctrl").css({"width":($(window).width()*12)/100,"height":($(window).width()*12)/100});
	$(".timer").css({"font-size":($(window).width()*15)/100+"px"});
	$(".title").css({"font-size":($(window).width()*5)/100+"px"});
	$(".subtitle").css({"font-size":($(window).width()*4)/100+"px"});
	$(".detectpic").css({"width":sf*0.15,"height":sf*0.1});
//	$(".loadingdot").css({"width":($(window).width()*2)/100,"height":($(window).width()*2)/100});
	$("#strbtnText").css({"font-size":($(window).width()*10)/100+"px","line-height":($(window).width()*20)/100+"px"});
//	$(".powerbtn").width($(window).width()*0.20);
//	$(".powerbtn").height($(window).width()*0.20);
//    $(".powctrlbtn").width($(window).width()*0.20);
//	$(".powctrlbtn").height($(window).width()*0.20);
//	$(".powerbtn h3, .powctrlbtn h3").css("bottom",-$(window).width()*0.1+"px");
	$("#settings").css({'width':sf*0.1,'height':sf*0.1,'border-radius':sf*0.02});    
    $("div.powerbtn, div.powctrlbtn").css({'width':sf*0.2,'height':sf*0.2})
}

var DeviceId=-1;

  function setstr(n){
//	 window.location.href='omass://str_'+n; 
	window.location.href='omass://str_'+n;
	 jQuery("#status div").text(n);
	 }
	 
  function setFreq(n){
//	 window.location.href='omass://str_'+n;
	 window.location.href='omass://freq_'+n; 
//	 jQuery("#status div").text(n);
  }
  
  function setWidth(n){
//	 window.location.href='omass://str_'+n; 
	 window.location.href='omass://width_'+n; 
//	 jQuery("#status div").text(n);
  }
  
function defaultmode(){
	setOpMode(0);
}

 
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60);
        /*hundredths = pad(time - (sec * 100) - (min * 6000), 2)*/;
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}



/*timmer*/
var _pt=-1;
var Example2 = new (function() {
    var $countdown,
        $form, // Form used to change the countdown time
        incrementTime = 70,
        currentTime = jQuery(".timer").text()*6000,
		stoptime= jQuery(".timer").text()*6000,
        updateTimer = function() {
            $countdown.html(formatTime(currentTime));
            if (currentTime == 0) {
                Example2.Timer.stop();
            	if(_pt>0) {
//            		$('.subtitle').text(_pt);
                	timerComplete();
           		}
            	_pt=-1;
//                timerComplete();
				var newtime= jQuery(".resettimer").text();
	            var resettimer=newtime*6000;
	            Example2.resetCountdown(resettimer);
	            jQuery("#powctrlbtn").hide();
				jQuery(".powerbtn.active").hide();
	            jQuery(".powerbtn.noactive").show();
				jQuery("#timelimit.modebtn").removeClass("working");
                return;
            }
            else if((currentTime < 50) && (currentTime )) {
            	_pt=currentTime;
            }else if(currentTime==stoptime){Example2.Timer.stop();}
            currentTime -= incrementTime / 10;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
//            timeup();
            stopOutput();
       		sendOhaCmd(["sound"]);

        },
        init = function() {
            $countdown = $('#countdown');
            //Example2.Timer = $.timer(updateTimer, incrementTime, true);
			
            $form = $('#example2form');
            $form.bind('submit', function() {
                Example2.resetCountdown();
                return false;
            });
        };
    this.resetCountdown = function(n) {
		
        var newTime = parseInt(n);
        if (newTime > 0) {currentTime = newTime;}
        time_stop()
    };
	
    $(init);
});


  function setTimeBtn(num) {
//    		console.log("setTimeBtn("+num+")");
    		_pt=-1;
  	jQuery(".timelist").each(function(i){
  		if(num==i) {
//   		alert(jQuery(this).text());
			jQuery("#timelimit.modebtn span.nowtime").text(jQuery(this).text());
			var newtime= jQuery(this).find("span.time").text();
            time_stop(newtime*60)
  		}
  	});
  }

  function setModeBtn(num) {
//    		alert("setModeBtn("+num+")");
    jQuery(".modelist").each(function(i){
    	if(num==i) {
//    		alert(jQuery(this).text());
            $("#mode.modebtn").attr("value", i);
			jQuery("#mode.modebtn span").text(jQuery(this).text());
			newmode= i;
			setPattern(i);
    	}
    })
  }

  function setStrBtn(num) {
//    		alert("setModeBtn("+num+")");
    jQuery(".strlist").each(function(i){
    	if(num==i) {
//    		alert(jQuery(this).text());
            $(this).addClass("active");
			jQuery("#str.modebtn span").eq(0).text(jQuery(this).text());
			setParam3(i);
    	}
        else {
            $(this).removeClass("active");
        }
    })
  }

var cookieConfig={
    oMaskMode: {
        key: 'oMaskMode', 
        value: {
            face: 'face', 
            body: 'body', 
        }
    },
}

function setcookies(){
	
	if($.cookie('testmode')!="yes"){	
	if($.cookie('strength')!=null) {
		 jQuery("#status div").text($.cookie('strength'));
//		 alert("hello, strength="+$.cookie('strength'));
	}
	if($.cookie('mode')!=null) {
//		 jQuery("#status div").text($.cookie('mode'));
//		alert("hello, mode("+$.cookie('mode')+")");
//		num=$.cookie('mode');
        num=oha_api.cookieRead('mode', '0');
        console.log("setcookies mode="+num);
		setModeBtn(num);
	}
	if($.cookie('timer')!=null) {
//		 jQuery("#status div").text($.cookie('timer'));
//		alert("hello, timer("+$.cookie('timer')+")");
		num=$.cookie('timer');
		 setTimeBtn(num);
	}
	if($.cookie(cookieConfig.oMaskMode.key)!==undefined) {
//		 jQuery("#status div").text($.cookie('timer'));
//		alert("hello, timer("+$.cookie('timer')+")");
		var _oMaskMode=$.cookie(cookieConfig.oMaskMode.key);
        if(_oMaskMode==cookieConfig.oMaskMode.value.face) {
            setFaceMode();
        }
        else {
            setBodyMode();
        }
	}
    else {
        setFaceMode();
    }
  }
	
}

function setFaceMode() {
    if(isDevReady) {
        var _set=oha_config.omassParam.face;
        var _strSetting=0;
        $("#str.modebtn .strlist").each(function(i){
            if($(this).hasClass("active")) {
                _strSetting=i;
            }
        })
        console.log("_strSetting="+_strSetting);
        var _p0=_set.low.strength;
        var _p1=_set.low.pulse;
        var _p2=_set.low.param3;
        switch(_strSetting) {
            case 0:
                var _p0=_set.low.strength;
                var _p1=_set.low.pulse;
                var _p2=_set.low.param3;
                break;
            case 1:
                var _p0=_set.middle.strength;
                var _p1=_set.middle.pulse;
                var _p2=_set.middle.param3;
                break;
            case 2:
                var _p0=_set.high.strength;
                var _p1=_set.high.pulse;
                var _p2=_set.high.param3;
                break;
            default:
        }
        console.log("Face strength:"+_p0+", Pulse:"+_p1+", Param3:"+_p2)
        window.location.href='omass://adjustParam_'+_p0+'_'+_p1+"_"+_p2;
    }
    $.cookie(cookieConfig.oMaskMode.key, cookieConfig.oMaskMode.value.face , { expires: 365 }); 
}

function setHandMode() {
    if(isDevReady) {
        var _set=oha_config.omassParam.hand;
        var _strSetting=0;
        $("#str.modebtn .strlist").each(function(i){
            if($(this).hasClass("active")) {
                _strSetting=i;
            }
        })
        var _p0=_set.low.strength;
        var _p1=_set.low.pulse;
        var _p2=_set.low.param3;
        switch(_strSetting) {
            case 0:
                var _p0=_set.low.strength;
                var _p1=_set.low.pulse;
                var _p2=_set.low.param3;
                break;
            case 1:
                var _p0=_set.middle.strength;
                var _p1=_set.middle.pulse;
                var _p2=_set.middle.param3;
                break;
            case 2:
                var _p0=_set.high.strength;
                var _p1=_set.high.pulse;
                var _p2=_set.high.param3;
                break;
            default:
        }
        console.log("Hand strength:"+_p0+", Pulse:"+_p1+", Param3:"+_p2)
        window.location.href='omass://adjustParam_'+_p0+'_'+_p1+"_"+_p2;
    }
    $.cookie(cookieConfig.oMaskMode.key, cookieConfig.oMaskMode.value.face , { expires: 365 }); 
}

function setFootMode() {
    if(isDevReady) {
        var _set=oha_config.omassParam.foot;
        var _strSetting=0;
        $("#str.modebtn .strlist").each(function(i){
            if($(this).hasClass("active")) {
                _strSetting=i;
            }
        })
        var _p0=_set.low.strength;
        var _p1=_set.low.pulse;
        var _p2=_set.low.param3;
        switch(_strSetting) {
            case 0:
                var _p0=_set.low.strength;
                var _p1=_set.low.pulse;
                var _p2=_set.low.param3;
                break;
            case 1:
                var _p0=_set.middle.strength;
                var _p1=_set.middle.pulse;
                var _p2=_set.middle.param3;
                break;
            case 2:
                var _p0=_set.high.strength;
                var _p1=_set.high.pulse;
                var _p2=_set.high.param3;
                break;
            default:
        }
        console.log("Foot strength:"+_p0+", Pulse:"+_p1+", Param3:"+_p2)
        window.location.href='omass://adjustParam_'+_p0+'_'+_p1+"_"+_p2;
    }
    $.cookie(cookieConfig.oMaskMode.key, cookieConfig.oMaskMode.value.face , { expires: 365 }); 
}

function setBodyMode() {
    $("#switchIcon").removeClass("face");
    if(isDevReady) {
//        window.location.href='omass://adjustParam_100_100_100';
        oha_api.runOhaCmd("omass://adjustParam_100_100_100");
    }
    $.cookie(cookieConfig.oMaskMode.key, cookieConfig.oMaskMode.value.body , { expires: 365 }); 
}

	function setPattern(n) {
        stopPattern();
        if(n==3) {
            if($("#powerbtn").attr("status")=="play") {
                runMix();
            }
            return;
        }
//        console.log("omass://pattern_"+n);
		window.location.href='omass://pattern_'+n;
	}

function stopPattern() {
    clearTimeout(patR);
}

function runMix(i){
    if(typeof i == "undefined") {
        i=0;
    }
    setPattern(i);
    if(++i==3) {
        i=0;
    }
    patR=setTimeout(function(){
        runMix(i);
    }, 10000);
}

	function setOpMode(n) {
//		window.location.href='omass://opmode_'+n;
        oha_api.runOhaCmd("omass://opmode_"+n);
//		alert("setOpMode("+n+")");
	}
	
	function setParam3(n) {
        var _set=oha_config.omassParam.face;
        if($("#faceMode").hasClass("active")) {
            _set=oha_config.omassParam.face;
        }
        else if($("#handMode").hasClass("active")) {
            _set=oha_config.omassParam.hand;
        }
        else if($("#footMode").hasClass("active")){
            _set=oha_config.omassParam.foot;
        }
        var p0=_set.low.strength;
        var p1=_set.low.pulse;
        var p2=_set.low.param3;
        switch(n) {
            case 0:
                p0=_set.low.strength;
                p1=_set.low.pulse;
                p2=_set.low.param3;
                break;
            case 1:
                p0=_set.middle.strength;
                p1=_set.middle.pulse;
                p2=_set.middle.param3;
                break;
            case 2:
                p0=_set.high.strength;
                p1=_set.high.pulse;
                p2=_set.high.param3;
                break;
            default:
        }
        console.log("setParam3("+p0+":"+p1+":"+p2+")");
        window.location.href='omass://adjustParam_'+p0+'_'+p1+"_"+p2;
	}
	 
	function callNotice() {
		window.location.href='omass://_notice';
	}
	
	 	
	function stopOutput(){
		window.location.href="omass://stop";
	 jQuery("#quickstitch").show();
        stopPattern();
//		sendOhaCmd(["sound"]);

	}


function loadJSON() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
//      document.getElementById("demo").innerHTML =
//      this.responseText;
        var _config=JSON.parse(this.responseText);
        JSON.stringify(_config);
        console.log("loadJSON="+JSON.stringify(_config));
    }
  };
  xhttp.open("GET", "oha_controller_options.txt", true);
  xhttp.send();
}

//   function poweroff(){
//	 window.location.href="omass://poweroff"+"_"+usingtime();
//	 }
	 
  function startOutput() {
      setstr(jQuery("#status div").text());
    jQuery("#quickstitch").hide();
      if($("#mode.modebtn").attr("value")==3) {
          setTimeout(function(){
              setPattern(3);
              setTimeout(function() {
                    window.location.href="omass://start";
              }, 200);
          }, 200);
      }
      else {
          setTimeout(function() {
                window.location.href="omass://start";
          }, 200);          
      }      
      
  }
  
  function sendOhaCmd(param) {
  	var _cmdStr="oha://";
  	for(i=0;i<param.length;i++) {
  		if(i!=0) {
  			_cmdStr+="_";
  		}
  		_cmdStr+=cmdTrans(param[i]);
  	}
  	setTimeout(function() {
  		window.location.href=_cmdStr;
//  	alert("sendOhaCmd("+_cmdStr+")");
  		}, 100);
//  	window.location.href=_cmdStr;
  }
  
  function cmdTrans(_str) {
		var _tmpStr=_str.replace(/%/g, "%%");
		_tmpStr=_tmpStr.replace(/_/g, "%_");
		return _tmpStr;
  }
  
//  function poweron(){
//	 window.location.href="omass://poweron"; 
//	 }	 

 function pause(){
	 window.location.href="omass://pause"; 
     stopPattern();
	}
	 
 function timeup(){
//	 window.location.href="omass://timeup"+"_"+usingtime(); 
            stopOutput();
   	  var newtime= jQuery(".resettimer").text();
	  var resettimer=newtime*6000;
	  Example2.resetCountdown(resettimer);
	  jQuery(".powerbtn.active,.powerbtnX.active").hide();
	  jQuery(".powerbtn.noactive,.powerbtnX.noactive").show();
//      jQuery("#timelimit.modebtn").removeClass("working");
      jQuery("#timelimit.modebtn,#str.modebtn").removeClass("working");
     $("#modeBar").removeClass("working");
	  sendOhaCmd(["sound"]);
};

 function OHA_Attached(){
	 jQuery(".loadingdot").addClass("active");
	 }
 function OHA_CertOK(){
 		isDevReady=1;
 		$("#quickstitch").attr("href", '../PhoneBull/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true');
 		$.cookie('loadOK', '1', {expires:365, path:'/'});
		 jQuery("#detect").hide();
        $("#powerbtnX").addClass("online");
		 jQuery("#powerbtn").show();
//		 jQuery("#quickstitch").hide();
		 setTimeout('setOpMode(1)',100);
		 setTimeout('setPattern(newmode)',200);
//	 	if(ohaVer>0) {
//			setTimeout('callNotice()',300);
//		}
        setFaceMode();
//        if($("#footMode").hasClass("active")) {
//            setFootMode();
//        }
//        else if($("#handMode").hasClass("active")) {
//            setHandMode();
//        }
//        else {
//            setFaceMode();
//        }
//        if($("#switchIcon").hasClass("face")) {
//            setFaceMode();
//        }
//        else {
//            setBodyMode();
//        }
//		 setTimeout('defaultmode()',300);
//	setcookies();
 }
// function OHA_DevReady(_id, _model){
////		alert("API version="+ohaVer);
// 	if(!oha_config.isCheckModelName || (_model==oha_config.model)) {
//// 		$.cookie('loadOK', '1', {expires:365, path:'/'});
//// 		$.cookie('devId', DeviceId, {expires:365, path:'/'});
////		 jQuery("#detect").hide();
////		 jQuery("#powerbtn").show();
//////		 jQuery("#quickstitch").hide();
////		 setTimeout('setOpMode(1)',100);
////		 setTimeout('setPattern(newmode)',200);
////	 	if(ohaVer>0) {
////			setTimeout('callNotice()',300);
////		}
// 	}
////	setcookies();
// }
 
 function runReady(_model) {
 }
	
function OHA_Detached(){
//	alert("OHA_Detached()");
	 jQuery(".loadingdot").removeClass("active");
	 jQuery("#detect").show();
    $("#powerbtnX").removeClass("online");
	 jQuery("#powerbtn").hide();
	  jQuery("#BusyMsg").hide();
	  jQuery("#NoDevMsg").show();
	 jQuery("#quickstitch").show();
//	 poweron();
    stopPattern();
	 startOutput();
	  jQuery(".powctrlbtn.stop").click();
	  jQuery("#powctrlbtn").hide();
	  jQuery(".powerbtn.active").hide();
 		$.cookie('loadOK', '0', {expires:365, path:'/'});
 		$.cookie('devId', '-1', {expires:365, path:'/'});
 	isDevReady=0;
 		$("#quickstitch").attr("href", '../PhoneBull/default.html?OHA_DevId=-1&OHA_Local=true');
}

//function OHA_DevOff(_id){
////	alert("OHA_Detached()");
//	if(_id==DeviceId) {
//	 jQuery(".loadingdot").removeClass("active");
//	 jQuery("#detect").show();
//	 jQuery("#powerbtn").hide();
//	  jQuery("#BusyMsg").hide();
//	  jQuery("#NoDevMsg").show();
//	 jQuery("#quickstitch").show();
////	 poweron();
////	 startOutput();
//	  jQuery(".powctrlbtn.stop").click();
//	  jQuery("#powctrlbtn").hide();
//	  jQuery(".powerbtn.active,.powerbtnX.active").hide();
//      jQuery(".powerbtn.noactive,.powerbtnX.noactive").show();
//        $(".modebtn").removeClass("working");
//    $("#powerbtnX").removeClass("online");
//        time_stop();
//	  DeviceId=-1;
// 		$.cookie('loadOK', '0', {expires:365, path:'/'});
// 		$.cookie('devId', '-1', {expires:365, path:'/'});
// 		isDevReady=0;
// 		$("#quickstitch").attr("href", '../PhoneBull/default.html?OHA_DevId=-1&OHA_Local=true');
//	}
//}

function OHA_Lock(_id) {
	if(_id==DeviceId) {
 		$.cookie('isLock', true, {expires:365, path:'/'});
	  jQuery(".loadingdot").removeClass("active");
	  jQuery("#detect").show();
	  jQuery("#powerbtn").hide();
	  jQuery("#BusyMsg").show();
	  jQuery("#NoDevMsg").hide();
	  $("#quickstitch").hide();
	}
}

function OHA_Unlock(_id) {
	if(_id==DeviceId) {
 		$.cookie('isLock', false, {expires:365, path:'/'});
		jQuery("#detect").hide();
		jQuery("#powerbtn").show();
		jQuery("#BusyMsg").hide();
		jQuery("#NoDevMsg").show();
		$("#quickstitch").show();

	}
}

//function OHA_ApiVer(_ver) {
//	ohaVer=_ver;
//}

function OHA_RunErr(_id, _errMsg) {
	if(_id==DeviceId) {
		alert("USB連線中斷, 請檢查您的USB接頭是否接觸不良!");
		OHA_DevOff(_id);
	}
}
	 
 function omassbreak(){
	 jQuery(".powerbtn.active").click();
	 }
 
  function omassgo(){
	 jQuery(".powctrlbtn.play").click();
	 }
 
 function timeset(n){
	 jQuery(".timer").text(n);
	 }
 function circle(rad,cname,angle){
	var radius = rad;
	var avd = angle/($(cname).length-1); 
	var ahd = avd*Math.PI/180;
	 $(cname).each(function(i){
            $(this).css({"left":Math.sin((ahd*i))*radius,"top":Math.cos((ahd*i))*radius*(-1)-10});
        });	
	 }
 
 function circle1(rad,cname,angle){
	var radius = rad;
	var avd = 180/($(cname).length-1); 
	var ahd = avd*Math.PI/180;
	 $(cname).each(function(i){
            $(this).css({"top":-Math.sin((ahd*i))*radius,"left":Math.cos((ahd*i))*radius*(-1)});
        });	
 }
 
 function usingtime(){
	return Number(jQuery(".resettimer").text()*60)-Number($("#countdown").text().substr(0,2)*60)-Number($("#countdown").text().substr(3,2));
	 }	 

var newmode=0;	
jQuery(document).ready(function(){

$("#countdown").timer_create({mode:"countdown",time:600,size:13, timeup:function() {timeup()}})
/*+ -按鈕*/   

    $("#faceMode").click(function() {
        if($("#modeBar").hasClass("working")) {
            return;
        }
        $(this).addClass("active");
        $("#handMode").removeClass("active");
        $("#footMode").removeClass("active");
        setFaceMode();
    })

    $("#handMode").click(function() {
        if($("#modeBar").hasClass("working")) {
            return;
        }
        $(this).addClass("active");
        $("#faceMode").removeClass("active");
        $("#footMode").removeClass("active");
        setHandMode();
    })

    $("#footMode").click(function() {
        if($("#modeBar").hasClass("working")) {
            return;
        }
        $(this).addClass("active");
        $("#faceMode").removeClass("active");
        $("#handMode").removeClass("active");
        setFootMode();
    })

  jQuery("#reduce").click(function(){
	  if($(this).hasClass("working")){
	    if(jQuery("#status div").text() > 1){
	    jQuery("#status div").text(jQuery("#status div").text()-1);
	    var newstr= jQuery("#status div").text();
	    setstr(newstr);
	    $.cookie('strength', newstr , { expires: 365 });
//	    alert("set cookie(strength="+newstr+")");
	  }else{
	    jQuery("#status div").text(1);
	    setstr(1);	  
	    }	
	  }  
	  })	
	jQuery("#add").click(function(){
		if($(this).hasClass("working")){
		  if(jQuery("#status div").text() < 12){
			jQuery("#status div").text(parseInt(jQuery("#status div").text())+1);
			var newstr= jQuery("#status div").text();
			setstr(newstr);
			$.cookie('strength', newstr , { expires: 365 }); 
//	    	alert("set cookie(strength="+newstr+")");
		  }else{
			jQuery("#status div").text(12);
			setstr(12);	  
		  }
		}
	})
    
/*POWER*/	
  jQuery(".powerbtn.noactive").click(function(){
//	  setstr(1);
//	  setTimeout('poweron()',100);
      $("#powerbtn").attr("status",powerStus.play);
      $("#switchIcon").hide();
	  setTimeout('startOutput()',100);
	  time_count();
	  jQuery(".powerbtn.noactive,.powerbtnX.noactive").hide();
	  jQuery(".powerbtn.active,.powerbtnX.active").show();
          jQuery("#timelimit.modebtn,#str.modebtn").addClass("working");
      $("#modeBar").addClass("working");
	  /*$("#playstus").text("暫停");*/
	  jQuery(".strctrl").addClass("working");
  })
  jQuery(".powerbtn.active").click(function(){
      $("#powerbtn").attr("status",powerStus.pause);
	  pause();
//	  stopOutput();
	  time_pause()
	  jQuery(".powerbtn.active,.powerbtnX.active").hide();
	  jQuery(".powerbtnX.noactive").show();
	  jQuery("#powctrlbtn").show();
      jQuery("#timelimit.modebtn,#str.modebtn").removeClass("working");
      $("#modeBar").removeClass("working");
//	  jQuery(".strctrl").removeClass("working");	  
	  //$("#playstus").text("繼續"+"   "+"停止");
  })
   jQuery(".powctrlbtn.play").click(function(){
//	  poweron();
      $("#powerbtn").attr("status",powerStus.play);
	  startOutput();
//	  setTimeout('setstr(jQuery("#status div").text())',100)
	  time_count();
	  jQuery("#powctrlbtn").hide();
	  jQuery(".powerbtn.active,.powerbtnX.active").show();
       jQuery(".powerbtnX.noactive").hide();
      jQuery("#timelimit.modebtn,#str.modebtn").addClass("working");
      $("#modeBar").addClass("working");
	  $("#playstus").text("暫停");
	  jQuery(".strctrl").addClass("working");
  })
     jQuery(".powctrlbtn.stop").click(function(){
//	  poweroff();
      $("#powerbtn").attr("status",powerStus.stop);
         $("#switchIcon").show();
	  stopOutput();
//	  setTimeout('setstr(1)',100)
	  var newtime= jQuery(".resettimer").text();
	  var resettimer=newtime*6000;
	  Example2.resetCountdown(resettimer);
	  jQuery("#powctrlbtn").hide();
	  jQuery(".powerbtn.noactive,.powerbtnX.noactive").show();
          jQuery("#timelimit.modebtn,#str.modebtn").removeClass("working");
      $("#modeBar").removeClass("working");
//		  jQuery(".strctrl").removeClass("working");
	    
	  //$("#playstus").text("啟動");
  })    

/*strength按鈕*/
  jQuery("#str.modebtn").click(function(){
      if($(this).hasClass("working")) {
          return;
      }
	jQuery(this).toggleClass("active"); 
	jQuery(".blackbg").fadeToggle();
	/*jQuery(".modelist").toggleClass("active");*/
	if(jQuery(this).hasClass("active")){
	   circle1($(window).height()/6,"#str.modebtn.active .strlist",0);
	}else{
	   circle1(0,"#str.modebtn .strlist",0);
	} 
  }) 
/*mode按鈕*/
  jQuery("#mode.modebtn").click(function(){
	jQuery(this).toggleClass("active"); 
	jQuery(".blackbg").fadeToggle();
	/*jQuery(".modelist").toggleClass("active");*/
	if(jQuery(this).hasClass("active")){
	circle($(window).height()/6,"#mode.modebtn.active .modelist",180);
	}else{
	circle(0,"#mode.modebtn.modelist",180);
	} 
  }) 
  jQuery("#timelimit.modebtn").click(function(){
if(!jQuery(this).hasClass("working")){  
	jQuery(this).toggleClass("active"); 
	jQuery(".blackbg").fadeToggle(); 
	/*jQuery(".modelist").toggleClass("active");*/
	if(jQuery(this).hasClass("active")){
	circle($(window).height()/6,"#timelimit.modebtn.active .timelist",-180);
	}else{
	circle(0,"#timelimit.modebtn .timelist",-180);
	} 
	}
  }) 
  jQuery(".blackbg").click(function(){
	jQuery("#timelimit.modebtn.active,#mode.modebtn.active,#str.modebtn.active").click();
  
  })
  jQuery(".strlist").each(function(i){
	  jQuery(this).addClass("strlist"+i);
	  jQuery(this).click(function(){
	  	setStrBtn(i);
		$.cookie('str',i, { expires: 365 }); 
	  })
  })
  
  jQuery(".modelist").each(function(i){
	  jQuery(this).addClass("modelist"+i);
	  jQuery(this).click(function(){
	  	setModeBtn(i);
		$.cookie('mode',i, { expires: 365 }); 
//		jQuery("#mode.modebtn span").text(jQuery(this).text());
//		newmode= i;
//		$.cookie('mode',i, { expires: 365 }); 
//		setPattern(i);
	  })
  })
  
  jQuery(".timelist").each(function(i){
	  jQuery(this).addClass("timelist"+i);
	 
	  jQuery(this).click(function(){
	   
	   	setTimeBtn(i);
		$.cookie('timer',i, { expires: 365 }); 
    	//time_stop(i)
		
	  })
  })
  
  $('#settings').click(function() {
//  	alert("Hello");
  	window.location.href='omass://_settings';
  });
  
//TEST模式進入
var timeout ;  
   
$("#detect").mousedown(function() {  
    timeout = setTimeout(function() {  
		if($.cookie('testmode')!="yes"){
	        alert("啟動TEST MODE");
			$.cookie('testmode', 'yes' , { expires: 365 }); 
		}else{
			 alert("關閉TEST MODE"); 
			$.cookie('testmode', 'no' , { expires: 365 }); 
		}
    }, 3000);  
});  
   
$("#detect").mouseup(function() {  
    clearTimeout(timeout);  
   // $("#mydiv").text("out");  
});  
  
$("#detect").mouseout(function() {  
    clearTimeout(timeout);  
   // $("#mydiv").text("out");  
});  

    $("#switchIcon").click(function(){
        if($(this).hasClass("face")) {
            setBodyMode();
        }
        else {
            setFaceMode();
        }
    });

})

 // detecting() 偵測中
 // detectok() 偵測完畢 顯示POWER
 // plugout()  回到最初畫面
 // timeset(n) 輸入時間
 // circle(rad,cname,angle) 半徑、class name、圓周角度
