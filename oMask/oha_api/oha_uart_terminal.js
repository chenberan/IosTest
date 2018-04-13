(function(_jq){
    var termHtml='\
            <div class="debugBar">\
                <div class="barBtnDiv0 barBtnDiv">\
                    <button type="button" class="barBtn barBtn0">115200 bps</button>\
                </div>\
                <div class="barBtnDiv1 barBtnDiv">\
                    <button type="button" class="barBtn barBtn1"><span class="uartOff textActive">OFF</span>/<span\ class="uartOn">ON</span></button>\
                </div>\
                <div class="barBtnDiv2 barBtnDiv">\
                    <button type="button" class="barBtn barBtn2">Clear</button>\
                </div>\
                <div class="barBtnDiv3 barBtnDiv">\
                    <button type="button" class="barBtn barBtn3"><span class="uartHex textActive">HEX</span>/<span class\ ="uartAsc">ASC</span></button>\
                </div>\
            </div>\
            <div class="debugOut">\
                <div  class="outputPanel"></div>\
            </div>\
            <div class="debugInput">\
                <input class="inputArea" type="text">\
                <div class="prefix">TX></div>\
            </div>\
    ';
    
    var _css="<style>\
        .oUartTerm .debugBar {\
            position:absolute;\
            top:0;\
            left:0;\
            height:10%;\
            width:100%;\
            background-color:white;\
        }\
        .oUartTerm .barBtnDiv {\
            position:absolute;\
            top:0;\
            width:25%;\
            height:100%;\
            font-size:3.5vw;\
        }\
        .oUartTerm .barBtnDiv.barBtnDiv0 {\
            left:0;\
        }\
        .oUartTerm .barBtnDiv.barBtnDiv1 {\
            left:25%;\
        }\
        .oUartTerm .barBtnDiv.barBtnDiv2 {\
            left:50%;\
        }\
        .oUartTerm .barBtnDiv.barBtnDiv3 {\
            left:75%;\
        }\
        .oUartTerm .barBtn {\
            width:100%;\
            height:100%;\
            border-radius:1vw;\
            padding:0;\
            font-size:3.5vw;\
        }\
        .oUartTerm .textActive {\
            color:red;\
        }\
        .oUartTerm .debugInput {\
            position:absolute;\
            top:90%;\
            left:0;\
            width:100%;\
            height:10%;\
            font-size:4vw;\
        }\
        .oUartTerm .inputArea {\
            position: absolute;\
            width: 88%;\
            height: 100%;\
            top: 0;\
            left: 0;\
            padding-left:12%;\
            border-width:0;\
            color: black;\
            background-color: #d0d0d0;\
        }\
        .oUartTerm .debugOut {\
            position:absolute;\
            top:10%;\
            left:0;\
            height:80%;\
            width:100%;\
            background-color:#e0e0e0;\
        }\
        .oUartTerm .outputPanel{\
            height: 100%;\
            width: 100%;\
            display: inline-block;\
            vertical-align: middle;\
            background-color: white;\
            border-style: solid;\
            border-width: 0;\
            border-color: gray;\
            background-color: #A0A0A0;\
            color: white;\
            text-align: left;\
            overflow: auto;\
            text-overflow: clip;\
            font-size:4vw;\
        }\
        .oUartTerm .prefix::before{\
            content:'';\
            display:inline-block;\
            height:100%;\
            width:0;\
            vertical-align:middle;\
        }\
        .oUartTerm .prefix {\
            position: relative;\
            background-color: transparent;\
            display: inline-block;\
            /* margin: auto; */\
            text-align: center;\
            width: 10%;\
            height: 100%;\
            vertical-align:middle;\
            color: black;\
        }\
    </style>";
    
    var _panelLineNo=0;
    _jq.fn.oUartTerm=function(_opt) {
        $(this).addClass("oUartTerm");
//        $('head').append('<link rel="stylesheet" href="oha_api/oha_uart_terminal.css" type="text/css" />');
        $('head').append(_css);
        var _default={
            baudRate: 9600,
            enable: false, 
            mode: "hex", 
            cookieEnable: false,        // if true, the previous setting will be used
            sendHex: function(_in){    // Function to send the input area
                console.log("sendHex:"+_in);
            }, 
            sendAscii: function(_in){
                console.log("sendAscii:"+_in);
            }, 
            maxLine:512, 
        };
        var rxStr=""
        var cookieOpt={
            baudRate: {
                key: 'baudRate',
                default : '19200',
                options: ['9600','19200','38400','57600','115200'],
            }, 
            enable: {        // On/off initial
                key: 'enable',
                default: 'true', 
                options: {
                    enable:'true', 
                    disable:'false',
                }, 
            }, 
            uartMode: {
                key: 'umode',
                default: 'hex', 
                options: {hex:'hex',
                          ascii:'asc',
                         }, 
            }
        }
        function cookieInit() {
            var _cookieObj=new Object();
            _cookieObj.baudRate=parseInt(oha_api.cookieRead(cookieOpt.baudRate.key, cookieOpt.baudRate.default));
            if(oha_api.cookieRead(cookieOpt.enable.key, cookieOpt.enable.default)=="true") {
                _cookieObj.enable=true;
            }
            else {
                _cookieObj.enable=false;
            }
            _cookieObj.mode=oha_api.cookieRead(cookieOpt.uartMode.key, cookieOpt.uartMode.default);
            return _cookieObj;
        }
        var isDevPlugIn=false;
        _jq.extend(_default, _opt);
        if(_default.cookieEnable) {
            _jq.extend(_default, cookieInit());
        }
        $(this).append(termHtml);
        var self = this;
        var debugInPressed=false;
        var keyEnable=false;  
        this.devPlugIn=function() {
//            console.log("oUartTerm.devPlugIn()")
        //                    alert("devPlugIN("+_default.baudRate+")")
            isDevPlugIn=true;
            _panelLineNo=0;
            if(_default.enable) {
                oha_api.ApiCmdWr("04:04");
                powerOff();
                powerOn();
            }
            else {
                powerOff();
            }
            setBaudrate(_default.baudRate);
        }
        
        this.devPlugOut=function() {
            isDevPlugIn=false;
        //                    console.log("oUartTerm.devPlugOut()")
        }
        this.showRX=function(_recvList) {
            if(_default.mode=="asc") {
                for(i=0;i<_recvList.length;i++) {
                    var _charCode=parseInt(_recvList[i], 16);
                    if(_charCode==0 || _charCode==10) {
                        if(rxStr.length!==0) {
                            insertOutData(rxStr);
                        }
                        rxStr="";
                    }
                    else if(rxStr.length > 512) {
                        insertOutData(rxStr);
                        rxStr="";
                    }
                    else {
                        rxStr+=String.fromCharCode(_charCode);
                    }
        //                            rxStr+=String.fromCharCode(_charCode);
                }
        //                        insertOutData("RX(ASC):\""+rxStr+"\"");
            }
            else {
                for(i=0;i<_recvList.length;i++) {
        //                            if(i%8==0) {
        //                                if(i==0) {
        //                                    rxStr+="RX(HEX):";
        //                                }
        //                                else {
        //                                    rxStr+="<br>RX(HEX):";
        //                                }
        //                            }
                    if(_recvList[i].length==1) {
                        rxStr+="0"+_recvList[i]+" ";
                    }
                    else {
                        rxStr+=_recvList[i]+" ";
                    }
                    if(i%8==7) {
                        insertOutData("RX(HEX):"+rxStr.toLocaleUpperCase());
                        rxStr="";
                    }
                }
        //                        insertOutData(rxStr);
            }
        }
       function insertOutData (inStr) {
            if(inStr.length==0) {

                return;
            }
            _jq(self).find(".outputPanel").append("<div>"+inStr+"</div>");
           _panelLineNo++;
           if(_panelLineNo>_default.maxLine+50) {
//                   _jq(self).find(".outputPanel div").remove();
               _jq(self).find(".outputPanel div:lt(50)").remove();
               _panelLineNo-=50;
           }
//               var _h=_jq(self).find(".outputPanel div").eq(0).height();
           _jq(self).find(".outputPanel").scrollTop(99999); 
//                var _cn=_jq(self).find(".outputPanel").children().size();
//                if(_cn > config_setting.MaxLine) {
//                    _jq(self).find(".outputPanel div:lt("+(_cn-config_setting.MaxLine)+")").remove();
//                }
//                var _h=_jq(self).find(".outputPanel div").eq(0).height();
//                _jq(self).find(".outputPanel").animate({scrollTop:_h*config_setting.MaxLine}, 200); 

        }

        function init() {
            var _baudrate=parseInt(_default.baudRate);
            setBaudrate(_baudrate);
            setEnable(_default.enable);
            setMode(_default.mode);
        }

        function setBaudrate(_baud) {
            var _baudX=parseInt(_baud);
            var _baudIdx=0;
            switch(_baudX) {
                case 9600:
                    _baudIdx=0;
                    break;
                case 19200:
                    _baudIdx=1;
                    break;
                case 38400:
                    _baudIdx=2;
                    break;
                case 57600:
                    _baudIdx=3;
                    break;
                case 115200:
                    _baudIdx=4;
                    break;
                default:
                    _baudIdx=0;
                    break;
            }
            if(isDevPlugIn) {
//                    alert("setBaudrate("+_baud+")");
//                    console.log("oha_api.ApiCmdWr(04:00:"+_baudIdx+":02:08)");
                oha_api.ApiCmdWr("04:00:"+_baudIdx+":02:08");
            }
            _jq(self).find(".barBtn.barBtn0").text(_baud+" bps");
        }

        function setEnable(_enable) {
            if(_enable) {
                _jq(self).find(".uartOn").addClass("textActive")
                _jq(self).find(".uartOff").removeClass("textActive")
            }
            else {
                _jq(self).find(".uartOff").addClass("textActive")
                _jq(self).find(".uartOn").removeClass("textActive")
            }
        }

        function setMode(_mode) {
            if(_mode=="asc") {
                _jq(self).find(".uartHex").removeClass("textActive");
                _jq(self).find(".uartAsc").addClass("textActive");
            }
            else {
                _jq(self).find(".uartHex").addClass("textActive");
                _jq(self).find(".uartAsc").removeClass("textActive");
            }
        }

        function checkData(_mode, _e) {
//                console.log("checkData(mode="+_mode+", code="+_e.which+", _in="+_in)
            if(_mode!=="asc") {
                var content=String.fromCharCode(_e.which);
                var patt=/[ 0-9a-fA-F]/;
                if(patt.test(content)){
                    return  true;
                }else{
                    alert("Error! input Hex number sperate with space!");
                    return false;
                }
            }
            return true;
        }

        function toHexFormat (_inStr) {
            inStr=_inStr;
            inStr=inStr.replace(/\S\S/g, function(x) {return x+" "}).trim();
            inStr=inStr.replace(/\s\S(?=(?:$|\s+))/g, function(x) {return " 0"+x.slice(1,2)+" "});
            inStr=inStr.replace(/^\S$/, function(x) {return "0"+x});
            inStr=inStr.replace(/\s+/g, " ");
            inStr=inStr.toUpperCase();

            return inStr;
        }

        function powerOn() {
            console.log("oUartTerm.powerOn")
            if(typeof oha_api!=="undefined") {
                oha_api.ApiCmdWr("02:00:00:05:00:00:AA:AA");
                oha_api.ApiCmdWr("02:01:00:05:00:00:AA")
            }
        }
        function powerOff() {
            console.log("oUartTerm.powerOff")
            if(typeof oha_api!=="undefined") {
                oha_api.ApiCmdWr("02:00:00:05:00:00:AA:AA");
                oha_api.ApiCmdWr("02:01:00:05:00:00:55")
            }
        }

        _jq(self).find(".barBtn.barBtn0").click(function(){
            var _baudTxt=$(this).text();
            var _baud=9600;
            var _pat=/^ *([0-9]+) *bps *$/;
            if(_pat.test(_baudTxt)) {
                switch(RegExp.$1) {
                    case "9600":
                        _baud=19200;
                        break;
                    case "19200":
                        _baud=38400;
                        break;
                    case "38400":
                        _baud=57600;
                        break;
                    case "57600":
                        _baud=115200;
                        break;
                    case "115200":
                        _baud=9600;
                        break;
                    default:
                        _baud=9600;
                }
                $(this).text(_baud+" bps")
                setBaudrate(_baud);
                if(_default.cookieEnable) {
                    oha_api.cookieWrite(cookieOpt.baudRate.key, ""+_baud);
                }
            }
            else {
                $(this).text("9600 bps");
                setBaudrate(_baudrate);
            }
//                console.log($(this).text());
        });
        _jq(self).find(".barBtn.barBtn1").click(function(){
            _jq(this).find(".uartOn,.uartOff").toggleClass("textActive");
            if(_jq(this).find(".uartOn").hasClass("textActive")) {
                // Enable oUART
                console.log("Enable oUART");
                powerOn();
                if(_default.cookieEnable) {
                    oha_api.cookieWrite(cookieOpt.enable.key, cookieOpt.enable.options.enable);
                }
            }
            else {
                // Disable oUART
                console.log("Disable oUART");
                powerOff();
                if(_default.cookieEnable) {
                    oha_api.cookieWrite(cookieOpt.enable.key, cookieOpt.enable.options.disable);
                }
            }
        });
        _jq(self).find(".barBtn.barBtn2").click(function(){
            _jq(self).find(".outputPanel div").remove();
        });
        _jq(self).find(".barBtn.barBtn3").click(function(){
            _jq(this).find(".uartHex,.uartAsc").toggleClass("textActive");
            if(_jq(this).find(".uartHex").hasClass("textActive")) {
                // Hex mode
                console.log("Hex mode");
                _default.mode="hex";
                if(_default.cookieEnable) {
                    oha_api.cookieWrite(cookieOpt.uartMode.key, cookieOpt.uartMode.options.hex);
                }
            }
            else {
                // ASCII
                console.log("Ascii mode");
                _default.mode="asc";
                if(_default.cookieEnable) {
                    oha_api.cookieWrite(cookieOpt.uartMode.key, cookieOpt.uartMode.options.ascii);
                }
            }
//                _jq(self).find(".debugInput .inputArea").val("");
        });
        _jq(self).find(".debugInput .inputArea").keypress(function(e) {
//                console.log("key in "+e.which);
//                if(!keyEnable) {
//                    return;
//                }
            switch(e.which) {
                case 13:        // enter
                    if(_default.mode=="asc") {
                        insertOutData("TX(ASC):\""+_jq(this).val()+"\"");
                        _default.sendAscii(_jq(this).val());
                    }
                    else {
                        console.log("sendHex:"+_jq(this).val());
                        var _hexStr=toHexFormat(_jq(this).val());
                        insertOutData("TX(HEX):"+_hexStr);
                        _default.sendHex(_hexStr.split(" "));
                        _jq(this).val(_hexStr);
                    }
                    break;
//                    case 32:
////                        _in.text(_in.text()+String.fromCharCode(160));  // &nbsp;
//                        if(_default.mode=="asc") {
//                            _in.text(_cur.val()+String.fromCharCode(160));
//                        }
//                        else {
//                            _in.text(toHexFormat(_cur.val()+String.fromCharCode(e.which)));
//                        }
//                        break;
                default:
                    if(_default.mode=="hex") {
                        if(!self.checkData(_default.mode, e)) {
//                            console.log("now:"+toHexFormat(_in.text()+String.fromCharCode(e.which)));
//                                _jq(this).val(toHexFormat(_jq(this).val()+String.fromCharCode(e.which)));
                            return false;
                        }
                    }
            }
//               if(e.which!==13) {
//                    if(self.checkData(_default.mode, e, _in.text())) {
//                        _in.text(self.toHexFormat(_in.text()+String.fromCharCode(e.which)));
//                    }
//                }
//                else {
//                    _default.send(_in.text(), _default.mode);
////                    ctrlObj.insertOutData(_in.text());
//                    _in.text("");
//                }
        })
//        _jq(self).find(".inputClipBoard").focusin(function(e) {
////                console.log("focus in:"+e.type);
//            _jq(self).find(".debugInput span").eq(2).addClass("blink");
////                _jq(this).find(".inputClipBoard").focus();
//        });     
//
////            _jq(self).find(".debugInput").focusout(function(e) {
//////                console.log("focus out:"+e.type);
////                _jq(this).find("span").eq(2).removeClass("blink");
//////                _jq(this).find(".inputClipBoard").blur();
////            });
//
//        _jq(self).find(".inputClipBoard").focusout(function(e) {
////                console.log("focus out:"+e.type);
//            _jq(self).find(".debugInput span").eq(2).removeClass("blink");
////                _jq(this).find(".inputClipBoard").focus();
//        });     

        _jq(self).find(".debugInput").keydown(function(e) {
//                console.log("keydown("+e.which+")");               
            if(e.which==8) {
                var _in=_jq(this).find("span").eq(1);
                if(_in.text().length>0) {
                    _in.text(_in.text().slice(0, -1));
                }
            }
        });
//            _jq(document).click(function(){
////                console.log("document is clicked")
//                if(debugInPressed) {
//                    _jq(self).find(".debugInput").find("span").eq(2).addClass("blink");
//                    keyEnable=true;
//                }
//                else {
//                    _jq(self).find(".debugInput").find("span").eq(2).removeClass("blink");
//                    keyEnable=false;
//                }
//                debugInPressed=false;
//            })
//            _jq(self).find(".debugInput").click(function(){
////                console.log("debugInput is clicked")
////                $(this).focus()
//                debugInPressed=true;
//            })

        init();
        return self;
    };
    
})(jQuery);

//function OHA_INTR(_id, _recvData) {
//    
//}