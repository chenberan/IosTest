// JavaScript Document
var oha_config={
	debug_mode:false,			// Debug mode, must be set as "false" before release
	sw_ver:1.803,
	model:"oMass",				// Model Name, must be the same as Config.html
	page_name:"korea0",			// Page Name, different page must be different page name
    default_language:oha_api.langCode.English, 
            // oha_api.langCode.English: English
            // oha_api.langCode.TraditionChinese: Traditional Chinese
            // oha_api.langCode.SimpleChinese: Simplify Chinese
            // oha_api.langCode.Korean: Korea Language
    isCheckModelName: true,        
            // If thie UI page checking for Model name, 
            // "true": oha_api.DevPlugIn() will be launched if the plugged device model name 
            //      is matched with oha_config.model
            // "false": oha_api.DevPlugIn() will be launched if any OHA device is plugged
    omassParam:{
        face:{
            low: {
                strength: 50, 
                pulse: 50, 
                param3: 40, 
            }, 
            middle: {
                strength: 75,
                pulse: 75, 
                param3: 60, 
            }, 
            high: {
                strength: 100,
                pulse: 100, 
                param3: 80, 
            }, 
        }, 
        hand:{
            low: {
                strength: 100,
                pulse: 100, 
                param3: 80, 
            }, 
            middle: {
                strength: 100,
                pulse: 100, 
                param3: 90, 
            }, 
            high: {
                strength: 100,
                pulse: 100, 
                param3: 100, 
            }, 
        }, 
        foot:{
            low: {
                strength: 100,
                pulse: 100, 
                param3: 80, 
            }, 
            middle: {
                strength: 100,
                pulse: 100, 
                param3: 90, 
            }, 
            high: {
                strength: 100,
                pulse: 100, 
                param3: 100, 
            }, 
        }, 
    }
}

// ================== Definition for UI page by language setting =====================
oha_config.html_config=new Object();
oha_config.html_config[oha_api.langCode.English]="default_us.html";
oha_config.html_config[oha_api.langCode.TraditionChinese]="default_tw.html";
oha_config.html_config[oha_api.langCode.SimpleChinese]="default_cn.html";
oha_config.html_config[oha_api.langCode.Korean]="default_kr.html";
// ================== Definition for Title/Subtitle=====================
//English
oha_config.title=new Object();
oha_config.subtitle=new Object();

//oha_config.title[oha_api.langCode.English]="oTHE Demo(v"+oha_config.sw_ver+")";
//oha_config.subtitle[oha_api.langCode.English]="oTHE OHA API Demo";
oha_config.title[oha_api.langCode.English]="oMask(V"+oha_config.sw_ver.toFixed(3)+")";
oha_config.subtitle[oha_api.langCode.English]="Smart TENS face massager";
// TraditionalChinese
oha_config.title[oha_api.langCode.TraditionChinese]="oMask(V"+oha_config.sw_ver.toFixed(3)+")";
oha_config.subtitle[oha_api.langCode.TraditionChinese]="Smart TENS face massager";
// SimleChinese
oha_config.title[oha_api.langCode.SimpleChinese]="oMask(V"+oha_config.sw_ver.toFixed(3)+")";
oha_config.subtitle[oha_api.langCode.SimpleChinese]="Smart TENS face massager";
// Korea
oha_config.title[oha_api.langCode.Korean]="oMask(V"+oha_config.sw_ver.toFixed(3)+")";
oha_config.subtitle[oha_api.langCode.Korean]="Smart TENS face massager";

oha_config.title[oha_api.isoCountries.Japan]="oMask(V"+oha_config.sw_ver.toFixed(3)+")";
oha_config.subtitle[oha_api.isoCountries.Japan]="Smart TENS face massager";
// =========================================================================

oha_api.init(oha_config);           // Initial the oha_api with customized config object
