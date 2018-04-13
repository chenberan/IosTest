// JavaScript Document
var defaults ={
	  mode:"count",
	  time:0, 
	  size:10, 
	  timeup:function(){console.log('timeup')},
	  option:[600,1200,1800,2400,3000]	  
	}

var oha_counter=false;
var oha_timer;
var end_time;
var past_sec=0;
var count_time;
var set_time;
var counting_time;

//製作元件
$.fn.timer_create=function(opt){
  timmer_setting = $.extend({}, defaults, opt);  
  oha_timer=$(this)  
  oha_timer.css("font-size",$(window).height()*timmer_setting.size*0.01+"px")
  
  if(timmer_setting.mode=="countdown"){
	set_time=timmer_setting.time   
	count_time=timmer_setting.time  	
    oha_timer.html(settimeform(timmer_setting.time))
  }else{
    oha_timer.html(settimeform(timmer_setting.time))
  }
}



function settimeform(secs){
	if(typeof secs=="undefined"){
	  secs=0;
	}
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




var start_stamp=new Date().getTime()

function start_time(){
  if(timmer_setting.mode=="count"){	
    start_stamp=new Date().getTime() - (past_sec*1000)
  }else if(timmer_setting.mode=="countdown"){
    start_stamp=new Date().getTime() ;
  }
}

function now_time(){
  return new Date().getTime()
}

function past_time(){
 
 return settimeform(Math.floor((now_time()- start_stamp )/1000));
 
}



function count_down_time(e){ 
 e = start_stamp +  (e*1000)
 
 countime=e - now_time();
 if(countime<=0){
   countime=0;
   if(typeof timmer_setting.timeup=="function" ){
     timmer_setting.timeup();
	  clearInterval(oha_counter);	
   }
 }else{
 
 counting_time=Math.floor(countime /1000)
 if(count_time > set_time){
   alltime=count_time;
 }else{
   alltime=set_time;
 }
 $("#bar").css("width", Math.floor(counting_time*100/alltime)+"%")
 return settimeform(Math.floor(countime /1000));
 }
}



// count 


function time_count(sec){
  clearInterval(oha_counter);	
  start_time()	
  a=oha_timer	
  if(timmer_setting.mode=="count"){	
    if(typeof sec =="undefined"){		
	  oha_counter=setInterval(function(){a.html(past_time())},250);
	}else{
	  	
	  past_sec=sec
	  start_time()
	  oha_counter=setInterval(function(){a.html(past_time())},250);
	}
  }else if(timmer_setting.mode=="countdown"){
   if(typeof sec =="undefined"){	  
     end_time = count_time
   }else{
	 end_time = sec
   }
	oha_counter=setInterval(function(){a.html(count_down_time(end_time))},250);
   
  }
}

function time_pause(sec){
    past_sec=Math.floor((now_time()- start_stamp)/1000); 
	count_time=count_time - past_sec
    clearInterval(oha_counter);
	if (timmer_setting.mode=="countdown"){
	  if(typeof sec != "undefined"){	  		  
        
        count_time=sec;
	    oha_timer.html(settimeform(sec));  
	  }
	}
}

function time_stop(sec){
  past_sec=0;
  
  if(timmer_setting.mode=="count"){	 
    clearInterval(oha_counter);
	oha_timer.html(settimeform()); 
  }else if (timmer_setting.mode=="countdown"){
	if(typeof sec != "undefined"){
	  set_time = sec;  
	}	  
    clearInterval(oha_counter);
    count_time=set_time;
	oha_timer.html(settimeform(set_time));  
  }
}


//時間控制器
time_set_style={"width":"100%","height":"63%","bottom":0,"left":0,"z-index":"999","position":"absolute"}
time_set_bg_style={"width":"100%","height":"100%","background-color":"rgba(0,0,0,1)","top":0,"left":0,"position":"absolute","z-index":"-1"}
time_opt_style="cursor: pointer;background: #FFF;width: 20%;display: inline-block;margin: 1%;text-align: center;padding:2% 0;margin-top:1%;"
time_opts_style="height: 100%;position: relative;left:5%;"
time_set_close_syle="background-color:green;padding:2%0;width:88%;position:absolute;bottom:5%;text-align:center;color:#FFF;cursor:pointer;"
$.fn.timer_set_create=function(){
  this.click(function(){
	$("body").append("<div id='oha_time_set'><div class='bg'></div><div class='oha_time_opts'></div></div>")  		
	timeopts=timmer_setting.option;
    $(timmer_setting.option).each(function(i){
	  t=timmer_setting.option[i]/60;	
	  $("#oha_time_set .oha_time_opts").append("<div class='oha_time_opt' onclick='time_stop("+timmer_setting.option[i]+")'>"+t+" min</div>")
	})
    $("#oha_time_set .oha_time_opts").append("<div class='oha_time_set_close' onclick='$(\"#oha_time_set\").remove()'>OK</div>");
    $("#oha_time_set").css(time_set_style);
	$("#oha_time_set .bg").css(time_set_bg_style);
	$("#oha_time_set .oha_time_opts").attr("style",time_opts_style);
	$("#oha_time_set .oha_time_opt").attr("style",time_opt_style).css("font-size",$(window).height()*0.03+"px");
	$("#oha_time_set .oha_time_set_close").attr("style",time_set_close_syle).css("font-size",$(window).height()*0.06+"px");
  
  })
}