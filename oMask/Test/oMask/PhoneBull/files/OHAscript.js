

function ohaset(){
  setOpMode(0) //設置 0:專業模式, 1:按摩模式 
}


//OHA 的狀態產生的 javascript 動作

//裝置插上
function OHA_Attached(){
  

}

//認證完成 
function OHA_CertOK(_model){
 	if(_model=="oMass") {
 		isDevReady=1;
 		powerbtnset("off");
 		loadingok();
		window.setTimeout(function() { ohaset() }, 150);
		window.setTimeout(function() { setoptmode(defaultopmode) }, 300);
//		window.setTimeout(function() { loadingok() }, 300); // 完�? loading?��?�?
	}
}

//認證完成 
function OHA_DevReady(_id, _model){
 	if(_model=="oMass") {
 		DeviceId=_id;
 		powerbtnset("off");
 		loadingok();
		window.setTimeout(function() { ohaset() }, 150);
		//window.setTimeout(function() { setoptmode(defaultopmode) }, 300);
//		window.setTimeout(function() { loadingok() }, 300); // 完成 loading的動作
 	}
}
	

//裝置移除
function OHA_Detached(){
	loadgo();// 回到 loading 畫面
}
 
//裝置移除
function OHA_DevOff(_id){
	if(_id==DeviceId) {
	  DeviceId=-1;
		$.cookie('devId', '-1', {expires:365, path:'/'});
	  loadgo();// 回到 loading 畫面
	}
}


//偵錯
function OHA_RunErr(_id, _errMsg) {
	if(_id==DeviceId) {
		alert("連線中斷, 請檢查您的USB接頭是否接觸不良!");
		OHA_DevOff(_id);
		DeviceId=-1;
		loadgo(); //回到 loading畫面
	 	$.cookie('devId', '-1', {expires:365, path:'/'});

	}
}

function OHA_Lock(_id) {
	if(_id==DeviceId) {
		runLock();
	}
}

function OHA_Unlock(_id) {
	if(_id==DeviceId) {
		runUnlock();
	}
}

// 其他function


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
