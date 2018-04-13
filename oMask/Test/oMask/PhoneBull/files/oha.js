// oha 指令集
var DeviceId=-1;


//暫時停用
function OHA_GetLoadMode() {
  	mode=0;		// Remote mode
  	window.location.href='oha://loadMode_'+mode; 
//  	setTimeout('setLoadMode()',100);
}


//傳送強度 頻率 寬度
function setall(str,freq,wid){
//	alert("Hello, setall start");
	window.setTimeout(function() { setstr(str) }, 150);
	window.setTimeout(function() { setFreq(freq) }, 300);
	window.setTimeout(function() { setWidth(wid)}, 450);
//	alert("Hello, setall end");
}


//強度設置 0~16
function setstr(n){ 
	window.location.href='omass://str_'+n; 	
	
	 }
//頻率  0~16	 
function setFreq(n){
//	 window.location.href='omass://str_'+n;
	 window.location.href='omass://freq_'+n; 
//	 jQuery("#status div").text(n);

  }


//perth寬度設置  0~16	
function setWidth(n){
//	 window.location.href='omass://str_'+n; 
	 window.location.href='omass://width_'+n; 
//	 jQuery("#status div").text(n);
  }
  


	 
//模式 n為內建模式的代碼
function setPattern(n) {
	window.location.href='omass://pattern_'+n;
}


// 模式設定 0專業模式 1 簡易模式	 
function setOpMode(n) {
		window.location.href='omass://opmode_'+n;
//		alert("setOpMode("+n+")");
	}


// settime	n秒
function settime(n){
//	 window.location.href='omass://time_'+n; 
	 }

//斷電時使用	 	
function stopOutput(){
		window.location.href="omass://stop";
//		sendOhaCmd(["sound"]);

	}


//開始	 
function startOutput() {
//	alert("startOutput");
  	window.location.href="omass://start";
}
 
 
//暫停 時間不歸0
function pause(){
	 window.location.href="omass://pause"; 
	} 
  

