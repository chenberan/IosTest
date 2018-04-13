// 開始參數與cookie設置
var defaultsec=defaultmode*60



//
var winwid=$(window).width();
var winhei=$(window).height();
var notforset="#power,#energy";
var isDevReady=0;




//開場動畫
function loadingpics(){
  $(loadingpic).each(function(i){
    $(".bxslider").append('<li><div class="spic" style="background-image:url('+loadingpic[i]+');" /></div></li>');
  })
  /*$("#slider01 img").eq(0).addClass("active");
  $("#slidermain01").append("<img src='"+loadingpic[0]+"' />")*/
  $(".spic").reheight(0.82);
  $('.bxslider').bxSlider({
//  mode: 'horizontal',
  mode: 'fade',
  captions: true,
  infiniteLoop:false,
  hideControlOnEnd:true
  });
}

$(document).on("click","#slider01 img",function(){
	$("#slidermain01 img").attr("src",$(this).attr("src"));
	$("#slider01 img").removeClass("active");
	$(this).addClass("active");
	
})

//?‹å ´?•ç•«
var bull = "0.1,0.8".split(",")

var cPos = 0

function swapC() {
    $('.bull_2').animate({ "opacity":bull[cPos] }, 1000)
	
    cPos++
    if (cPos == bull.length) {
        cPos = 0
    }
    bullani=window.setTimeout(function() { swapC() }, 1000)
}

function stopswapC(){
	clearTimeout(bullani);
	}
	
//開場動畫結束
function loadingok(){
//	jQuery("#quickstitch").hide();
	stopswapC();
	$("#loading").hide();	
	$("#main").show();	
	$("#slidermain02").show();	
	isDevReady=1;
	$("#quickstitch").attr("href", '../oMass/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true');
    $.cookie('loadOK', '1', {expires:365, path:'/'});
    $.cookie('isLock', false, {expires:365, path:'/'});
 	$.cookie('devId', DeviceId, {expires:365, path:'/'});
	}


//動畫再開
function loadgo(){
	jQuery("#quickstitch").show();
	swapC();	
	$("#main").hide();
	$("#slidermain02").hide();	
	$("#loading").show();		
	$("#plug_text").show();
	$("#busy_text").hide();
    $.cookie('loadOK', '0', {expires:365, path:'/'});
 	$.cookie('devId', '-1', {expires:365, path:'/'});
 	isDevReady=0;
	$("#quickstitch").attr("href", '../oMass/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true');
	}

function runLock() {
//	loadgo();
	swapC();	
	$("#main").hide();
	$("#slidermain02").hide();	
	$("#loading").show();
	$("#plug_text").hide();
	$("#busy_text").show();
	$("#quickstitch").hide();
    $.cookie('isLock', true, {expires:365, path:'/'});
}	


function runUnlock() {
	powerbtnset("off");
//	loadingok();
	stopswapC();
	$("#loading").hide();	
	$("#main").show();	
	$("#slidermain02").show();	
	$("#plug_text").show();
	$("#busy_text").hide();
	$("#quickstitch").show();
    $.cookie('isLock', false, {expires:365, path:'/'});
}	

//計時器

//defaultsec=5
var counter=false
var worksec =""


//時間回歸到預設，或是重設新的時間
// timer() 倒數計時功能邏輯  
function timer(newtime){
	  
	  if(worksec >=1){
	    worksec=worksec-1;
	    $("#time").text(settimeform(worksec))
	    setbar()
	    }else{
	     worksec=0;
	     $("#time").text(settimeform(worksec))
	     window.setTimeout(function() { time_stop() }, 1000) //回到預設時間
	     //alert("Time is up.")
	     sendOhaCmd(["sound"]);
		 resetpower();	   
	    }	
		
}
//暫停時間


  //時間格式調整
function settimeform(secs){
	var themins=Math.floor(secs/60)
	if(themins>=10){	  
      showmin=themins.toString()      
	  }else{	 
      showmin="0"+themins.toString()      
	  }
	  
	var thesec=secs % 60;
	if(thesec >= 10){
	  showsec=thesec.toString()   		
	  }else{
	  showsec="0"+thesec.toString()   		  	
	  }   
	
	return  showmin+":"+ showsec
	  
}	

//回到default時間 ， defaulttime(n) 設定新的時間為n分鐘
function defaulttime(newtime){  
    if(typeof newtime =="undefined"){
	 //time_stop()
	}else{
	  defaultsec = newtime
	  $("#time").text(settimeform(defaultsec))
	  window.setTimeout(function() { defaulttime() }, 500) 
     // clearInterval(counter);	
	 setbarval(newtime)
	}

	
	setbar()
}

  //bar的進度表 倒數
timeval=defaultsec;
function setbarval(sec){
    timeval=sec;	
}
function setbar(){
	
}  

 
//調時間
var timebtn=0;

$(document).on("click","#settime",function(){
	if(timebtn==0){
	  $(notforset).slideUp();
	  $("#setmodediv").slideUp();
	  $("#settimediv").slideDown()
	    timebtn=1
		modebtn=0
		$("#close").show();	
		}else if(timebtn==1){
	  $(notforset).slideDown();
	  $("#setmodediv").slideUp();
	  $("#settimediv").slideUp()
	    timebtn=0	
		$("#close").hide();				
	  }	
	})

//微調時間
$(document).on("click","#redtime",function(){
  if(powerstatus == "off" ){
      if(set_time > 60){	  
	    time_stop(set_time-60)
	  }
  }else{
	 if(count_time > 60){ 
	 time_pause()
     count_time=count_time-60
     time_count()
	 }
  }	
})

$(document).on("click","#addtime",function(){
  if(powerstatus == "off"){
      time_stop(set_time+60)	  
  }else{
	  
	 time_pause()
     count_time=count_time+60
     time_count()
  }	

})

//秀圖片
$(document).on("click","#showpic",function(){
    $("#slidermain02").addClass("active");
//    $("#slidermain02").css({"z-index":"5"});
    $("#closepicfa").show();
})

$(document).on("click","#closepic",function(){
    $("#slidermain02").removeClass("active");
    $("#closepicfa").hide();
})


//調模式
var modebtn=1;
$(document).on("click","#setmode",function(){
	if(modebtn==0){
	  $(notforset).slideUp();
	  $("#setmodediv").slideDown();
	  $("#settimediv").slideUp()
	    modebtn=1
		timebtn=0;
		$("#close").show();	
		}else if(modebtn==1){
	  $(notforset).slideDown();
	  $("#setmodediv").slideUp();
	  $("#settimediv").slideUp();
	  $("#close").hide();
	    modebtn=0					
	  }	
	})
  

//關閉時間與模式

$(document).on("click","#close",function(){	
	  $(notforset).slideDown();
	  $("#setmodediv").slideUp();
	  $("#settimediv").slideUp();
	  $("#close").hide();
	    modebtn=0;
		timebtn=0;				
	 
	})



//上下置中

$.fn.vmid= function(left){
	if(typeof left !="undefined"){
		this.css("left",left+"px")
		}
	this.css("position","absolute")
    gotop=(winhei-this.height())/2;	
	this.css("top",gotop)	
	}

//左右置中
$.fn.hmid= function(top){
	if(typeof top !="undefined"){
		this.css("top",top+"px")
		}
	this.css("position","absolute")
    goleft=(winwid-this.width())/2;	
	this.css("left",goleft)	
	}

//上下左右置中
$.fn.amid= function(obj,callback){
	 
	var winwid=$(window).width();
    var winhei=$(window).height();
	
	
	if(typeof obj =="undefined"){
	  this.css("position","absolute")
	  goleft=(winwid-this.width())/2;	
	  this.css("left",goleft)
      gotop=(winhei-this.height())/2;	
   	  this.css("top",gotop)	
	}else{
	  this.css("position","absolute")
	  objwid=$(obj).width()
	  objhei=$(obj).height()
	  goleft=(objwid-this.width())/2;	
	  this.css("left",goleft)
      gotop=(objhei-this.height())/2;	
   	  this.css("top",gotop)			
	}
	if (typeof callback == 'function') { // make sure the callback is a function
        callback.call(this); // brings the scope to the callback
    }
}





//微調位置
$.fn.optset = function(top,left) {	
    var winwid=$(window).width();
    var winhei=$(window).height();
	thistop=parseInt(this.css('top'));
	thisleft=parseInt(this.css('left'));
	
	movetop = top * winhei;
	moveleft = left * winwid;
	
    this.css( "top", thistop-movetop+"px" );
	this.css( "left", thisleft-moveleft+"px" );
	
};


//調整寬比例

$.fn.rewidth = function(rate) {	
  this.width(winwid*rate)	
}
//調整高比例
$.fn.reheight = function(rate,callback) {	
  this.height(winhei*rate)
  if (typeof callback == 'function') { // make sure the callback is a function
        callback.call(this); // brings the scope to the callback
    }	
}

//調整寬高比
$.fn.rerito = function(base,wid,hei) {	
  oldwid=this.width();
  oldhei=this.height();
  rito=wid/hei;
  if(base=="width"){
	  this.height(oldwid*(1/rito))
	  }
  if(base=="height"){
	  this.width(oldhei*(rito))
	  }
}


//調整字體大小
$.fn.refont = function(rate) {	
  this.css("font-size",winhei*rate+"px")	
}

//字體置中

$.fn.fontmid = function() {	
  this.css("line-height",this.height()+"px")	
}

//漸層調整
function gradient(){
  fullwidth=$("#energy").width()
  $("#bar").css("background","linear-gradient(to right, #6fce6f 0,#e2e524 "+fullwidth*0.5+"px,#f43030 "+fullwidth+"px)")
  
}

//調整setmode 把可設定的格式置入
function modestyle(){
	$(timemode).each(function(i){
		$("#settimediv").append('<div class="mode timemode" onclick="orig(parseInt($(this).text())*60)"><span>'+timemode[i]+'</sapn> min</div>')
		})			
	totalmode=timemode.length;
	modehei=winhei*0.33;
	finalhei=modehei/totalmode;
	$(".timemode").height(finalhei);
	$(".timemode").css({"font-size":finalhei*0.6+"px","line-height":finalhei+"px"})
	
	$(opmode).each(function(i){
		$("#setmodediv").append('<div class="mode opmode" onclick="remode('+i+')"><span>'+opmode[i][0]+'</sapn><span class="modetip">強度 '+opmode[i][1]+', 頻率 '+opmode[i][2]+'</span></div>')
		})			
 
	totalmode=opmode.length;
	modehei=winhei*0.33;
	finalhei=modehei/totalmode;
	$(".opmode").height(finalhei);
	$(".opmode").css({"font-size":finalhei*0.6+"px","line-height":finalhei+"px"})
	
	
	
	}
//模式套用
function setoptmode(i){
   
  	
    $(".btn img").remove();
	$(".btn").append("<img src='"+opmode[i][4]+"'/>");
	$(".btn").animate(opmode[i][5]);	 
  
  setall(opmode[i][1],opmode[i][2],opmode[i][3] )//omass語法
  
  $("#modetip0").find(".tipres").text(opmode[i][0]);
  $("#modetip1").find(".tipres").text(opmode[i][1]);
  $("#modetip2").find(".tipres").text(opmode[i][2]);
  if(powerstatus != "off"){
   powerstatus = i;   	
  }
}

//電源狀態控制
function powerbtnset(status){
	
	if(status=="off"){          //關機狀態
	  $(".btn img").remove()	
	  $(".btn").append("<img src='"+wait[0]+"'/>");
	   $(".btn").animate(wait[1]);	   
	 // time_pause();	
	}else{		 
	 setoptmode(status) 
	 console.log(status)
	// time_pause()	 
	// time_count()	 
	}
}

var powerstatus="off";
var nowstatus=false
//Power動作
$(document).on("click",".btn",function(){	

    if(powerstatus=="off"){	
       setTimeout(function(){startOutput()}, 600);
	    time_count();
       	$("#quickstitch").hide();
		if(nowstatus != false){
	     
	    	powerstatus=nowstatus 
			powerbtnset(nowstatus)	
	    	nowstatus = false
//			startOutput() //開始輸出
		} else{
	    	powerbtnset(0)	 
	    	powerstatus=0
	  	}
	  	$("#offbtn").show()
	  	$("#resetbtn").show()	
	  	$(".tipblock").animate({"opacity":"1"})  	
	}else{
	  if(powerstatus > opmode.length -2 ){
	    powerstatus=0;
	  }	else{
		powerstatus = powerstatus + 1;  
	  }	  	
	  powerbtnset(powerstatus)
	 		
	}
})
//關電源動作
function offpower(){
  if(powerstatus != "off"){
    nowstatus = powerstatus;
  }
  powerstatus="off";
  powerbtnset("off")
  $("#offbtn").hide();
  $("#resetbtn").hide();
  $(".tipblock").animate({"opacity":"0.1"})
  time_pause();   
  pause() //暫停輸出	
}

function resetpower(){
  $("#quickstitch").show();
  time_stop();
  	
  if(powerstatus != "off"){
    nowstatus = powerstatus;
  }
  powerstatus="off";
  powerbtnset("off")
  $("#offbtn").hide();
  $("#resetbtn").hide();
  $(".tipblock").animate({"opacity":"0.1"})  
  
  stopOutput()	//停止輸出
}


//暫停
$(document).on("click","#offbtn",function(){	
  offpower();  	
})


//重置
$(document).on("click","#resetbtn",function(){	
  resetpower();  	
})

//模式更換
function remode(i){  
  if(powerstatus == "off"){	   
	setoptmode(i)
	powerbtnset("off")
	 }else{
	 
	setoptmode(i)	 
  }
	nowstatus = i ;	
	$("#close").click();
}



//?žæ­¸?Ÿå??€??
function orig(sec){
  if(typeof sec =="undefined"){
	  sec = defaulttime
	  
	}
 	
 
  if(powerstatus == "off"){	
    time_stop(sec);
	//offpower();	
  }else{
	time_stop(sec);
	time_count();
	setbarval(sec)
  }
  $("#close").click();
}

//

//slider click
$(document).on("click","div#slidermain01 .bx-next",function(){
	$("div#slidermain02 .bx-next").click()
	
})

$(document).on("click","div#slidermain01 .bx-prev",function(){
	$("div#slidermain02 .bx-prev").click()
	
})





//位置大小調整

function setsize(){
  //loading 部分
  $("#bull img").rewidth(0.16)
  $("#bull").amid()
  $("#bull").optset(-0.42,0.27);
//  $("#bull").optset(-0.40,0.35);
  
  
  $("#plug_text").amid();
  $("#plug_text").optset(-0.36,-0.05);
//  $("#plug_text").optset(-0.36, -0.15);
  $("#plug_text").refont(0.05);
  $("#busy_text").amid();
  $("#busy_text").optset(-0.36,-0.05);
//  $("#busy_text").optset(-0.36,0.15);
  $("#busy_text").refont(0.06);

  //loading?–ç?
  $("#slider01").vmid();
  $("#slider01").reheight(0.1);
  
  
  $("#slider01").rewidth(1);
  $("#slider01").optset(-0.243,0);
  
  $("#slidermain01").reheight(0.82);
   $("#slidermain02").reheight(0.82);
  
  //ä¸»é¸??
  $("#time").refont(0.12);
  $("#time").rewidth(0.6);
  $("#redtime,#addtime").refont(0.08);
  $("#redtime,#addtime").rewidth(0.15);
  $("#main").rewidth(0.9);
  $("#main").reheight(0.9);  
  $("#main").amid();
  $(".set").refont(0.045);
  $("#energy").reheight(0.05);
  $("#energy").rewidth(0.85);
  gradient()
  $("#power").reheight(0.4);
  $("#power").rewidth(0.9);
  $(".btn").reheight(0.25);
  $(".btn").rerito("height",1,1);  
  $(".btn").amid("#power");
  
  $("#offbtn").reheight(0.1);
  $("#offbtn").rerito("height",1,1);  
  $("#offbtn").amid("#power");
  $("#offbtn").optset(-0.08,0.30);
  $("#offbtn").refont(0.03);
  $("#offbtn").fontmid()
  
  $("#resetbtn").reheight(0.1);
  $("#resetbtn").rerito("height",1,1);  
  $("#resetbtn").amid("#power");
  $("#resetbtn").optset(0.08,0.30);
  $("#resetbtn").refont(0.03);
  $("#resetbtn").fontmid()
  
  
  $(".tipblock").rewidth(0.18);
  $(".tipblock").reheight(0);
  $(".tipblock").refont(0.03);
  $(".tipblock").amid("#power");
  $(".tipblock").optset(0.15,-0.32);
  
  $("#close").reheight(0.06);
  $("#close").rerito("height",1,1);
  $("#close").refont(0.03);
  $("#close").fontmid()
  
  $("#closepic").reheight(0.06);
  $("#closepic").rerito("height",1,1);
  $("#closepic").refont(0.03);
  $("#closepic").fontmid()
  
  
  $(".modetip").refont(0.03)
  
  $(".bx-wrapper .bx-controls-direction a").rewidth(0.08)
  
} 

//動態CSS設定
function mycss(){
  $("#main").css("background-image","url("+mainbg[0]+")").css(mainbg[1]);
  $("#offbtn").text(offbtn[0]).css(offbtn[1]);
  $("#resetbtn").text(resetbtn[0]).css(resetbtn[1]);
  
  
  $("#modetip0").css("border-color",modetips[0][1]).css("color",modetips[0][3]);
  $("#modetip0 .tiptitle").css("background-color",modetips[0][1]).css("color",modetips[0][2]);
  $("#modetip0 .tiptitle").text(modetips[0][0])
  
  $("#modetip1").css("border-color",modetips[1][1]).css("color",modetips[1][3]);
  $("#modetip1 .tiptitle").css("background-color",modetips[1][1]).css("color",modetips[1][2]);
  $("#modetip1 .tiptitle").text(modetips[1][0])
  
  $("#modetip2").css("border-color",modetips[2][1]).css("color",modetips[2][3]);
  $("#modetip2 .tiptitle").css("background-color",modetips[2][1]).css("color",modetips[2][2]);
  $("#modetip2 .tiptitle").text(modetips[2][0])
  
  $(".tipblock").css("opacity","0.1")
}


function cursors(){
$('#settime').css('cursor','pointer');
$('#redtime').css('cursor','pointer');
$('#addtime').css('cursor','pointer');
$('#setmode').css('cursor','pointer');
$('#close').css('cursor','pointer');
$('.btn').css('cursor','pointer');
$('#offbtn').css('cursor','pointer');
$('#resetbtn').css('cursor','pointer');	
$('#slider01 img').css('cursor','pointer');
$('#closepic').css('cursor','pointer');



}

function timeup() {
	resetpower();
	sendOhaCmd(["sound"]);
}

//window resize
$(window).resize(function(){
  winwid=$(window).width();
  winhei=$(window).height();	
	$(".mode").remove();
	modestyle()
	setsize()	
})

//window load
$(window).load(function(){
//  alert("setCookie global(0)");
  winwid=$(window).width();
  winhei=$(window).height();
   loadingpics()   
   //time_stop()
   modestyle()	
   
   setsize()
   mycss()
   cursors()
   
//   powerbtnset("off")	
   swapC()   
 // OHA_DevReady(0, "oMass")
  $.cookie('dfPage', '0', {expires:365, path:'/'});
var ohaVer=0;
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
	if($.cookie('pload'+_lang)==null) {
		
		document.location.href='../oMass/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true';
		$.cookie('pload'+_lang, '1', {expires:365, path:'/'});
	}
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
			OHA_CertOK('oMass');
		}
		else {
			OHA_DevReady(DeviceId, 'oMass');
		}
	}
	$("#quickstitch").attr("href", '../oMass/default.html?OHA_DevId='+DeviceId+'&OHA_Local=true');
    $("#time").timer_create({mode:"countdown",time:defaultsec,size:13,timeup:function(){timeup()}})
  
})

    
