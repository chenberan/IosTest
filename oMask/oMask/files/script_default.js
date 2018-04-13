// JavaScript Document


$(window).load(function(){
//	$(".main").css({"padding-top":($(window).height()*5)/100+"px"});
	sf=$(window).height()/1.5;
	if(sf>$(window).width()) {
		sf=$(window).width();
	}
//	var _url=document.documentURI;
//	var _idx=_url.indexOf('?');
	_param="?OHA_Local=true";
//	if(_idx>0) {
//		_param=_url.substring(_idx);
//	}
    document.location.href=oha_api.getHtml();
//	if(oha_config.lang=="CN") {
//		document.location.href="default_cn.html"+_param;
//	}
//	else if(oha_config.lang=="EN"){
//		document.location.href="default_us.html"+_param;
//	}
//	else if(oha_config.lang=="KR"){
//		document.location.href="default_kr.html"+_param;
//	}
//	else {
//		document.location.href="default_tw.html"+_param;
//	}

 });
