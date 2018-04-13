var apiConfig={
    Version:0.970, 
}
var __toastCode=
    '<div class="oha_api toastViewDiv">\
        <div class="oha_api toastView">\
            <text></text>\
        </div>\
    </div>';
$("html").append(__toastCode); 

$(window).ready(function(){
//	$(".main").css({"padding-top":($(window).height()*5)/100+"px"});
    document.documentElement.style.webkitUserSelect='none';
    var uAgent=navigator.userAgent;
//    console.log("userAgent="+uAgent)
//    var _pat="/oPlateform[ ]*[^;]+!([ ]*|$)";
    var _pat=/oPlateform[ ]*:[ ]*[^; ]+(?=[ ]*([;]|$))/g;
    var _plateform=uAgent.match(_pat);
    if(_plateform!=null) {
        var _p=_plateform[_plateform.length-1];
        _p=_p.substring(_p.indexOf(":")+1).trim();
        if(_p.toLowerCase()=="android") {
            oha_api.ohaConfig.plateForm="Android";
    //        $("#titleText").css({"color":"red"});

        }
        else if(_p.toLowerCase()=="ios") {
            oha_api.ohaConfig.plateForm="iOS";
       }
    }
    _pat=/appVer[ ]*:[ ]*[0-9]+(?=[ ]*([;]|$))/g;
    var _appVer=uAgent.match(_pat);
    console.log("App Version="+_appVer);
    if(_appVer!=null) {
        _p=_appVer[_appVer.length-1];
        _p=_p.substring(_p.indexOf(":")+1).trim();
         oha_api.ohaConfig.appVer=parseInt(_p);
    }
    var _vIdx=uAgent.indexOf("oVer:");
    var ohaVer=-1;
    if(_vIdx>=0) {
        ohaVer=parseInt(uAgent.substr(_vIdx+5, 2));
        if(isNaN(ohaVer)) {
            ohaVer=0;
        }
        oha_api.ohaConfig.ohaVer=ohaVer;
    }
    var ual=uAgent.length;
    var _lang=oha_api.ohaConfig.default_language;
    switch(ohaVer) {
    case 0:
        _lang=uAgent.substr(ual-2,2);
//		alert("Lang(0)="+_lang);
    break;
    case 1:
        var i=uAgent.indexOf("oLang:");
            if(i>0) {
                _lang=uAgent.substr(i+6,2);
            }
//		alert("Lang(1)="+_lang);
    break;
    }
    var _idx=uAgent.indexOf("oLangNew:");
    
    if(_idx>0) {
        _lang=uAgent.substr(i+6,uAgent.indexOf(";", i));
    }
//	_lang="KR";
    _lang=_lang.toLowerCase();
    if(_lang=="cn") {
        oha_api.langSet=oha_api.langCode.SimpleChinese;
//        oha_api.ohaConfig.html=oha_api.langCode.SimpleChinese+"?OHA_Local=true";
//        oha_api.ohaConfig.title=oha_api.ohaConfig.title_conf.title.cn;
//        oha_api.ohaConfig.subtitle=oha_api.ohaConfig.title_conf.subtitle.cn;
    }
    else if((_lang=="us")||(_lang=="en")){
        oha_api.langSet=oha_api.langCode.English;
//        oha_api.ohaConfig.html=oha_api.ohaConfig.html_config.en+"?OHA_Local=true";
//        oha_api.ohaConfig.title=oha_api.ohaConfig.title_conf.title.en;
//        oha_api.ohaConfig.subtitle=oha_api.ohaConfig.title_conf.subtitle.en;
    }
    else if((_lang=="kr")||(_lang=="ko")){
        oha_api.langSet=oha_api.langCode.Korean;
//        oha_api.ohaConfig.html=oha_api.ohaConfig.html_config.kr+"?OHA_Local=true";
//        oha_api.ohaConfig.title=oha_api.ohaConfig.title_conf.title.kr;
//        oha_api.ohaConfig.subtitle=oha_api.ohaConfig.title_conf.subtitle.kr;
    }
    else if((_lang=="tw")||(_lang=="zh")){
        oha_api.langSet=oha_api.langCode.TraditionChinese;;
//        oha_api.ohaConfig.html=oha_api.ohaConfig.html_config.tw+"?OHA_Local=true";
//        oha_api.ohaConfig.title=oha_api.ohaConfig.title_conf.title.tw;
//        oha_api.ohaConfig.subtitle=oha_api.ohaConfig.title_conf.subtitle.tw;
    }
    else {
        oha_api.langSet=_lang;
    }
//    console.log("hello, lang="+_lang)
//    console.log("hello, userAgent end, this.ohaConfig.html="+oha_api.ohaConfig.html)
    oha_api.initToastSize();
//    oha_api.a();
    if(oha_api.getPlateForm()=="iOS") {
        setTimeout('oha_api.runOhaCmd("oha://ohaUI")',1000);        
    }
    else {
        oha_api.runOhaCmd("oha://ohaUI");
    }
});

function OHA_DevReady(_id, _model){
//    console.log("OHA_DevReady, _model="+_model+", ohaConfig.model="+oha_api.ohaConfig.model);
    var _modelX=_model.split(":");
    for(var i=0;i<_modelX.length;i++) {
        if(_modelX[i]=="RO") {
            oha_api.ohaConfig.isReadOnly=true;
        }
    }
 	if(!oha_api.ohaConfig.isCheckModelName || (_modelX[0]==oha_api.ohaConfig.model)) {
//        console.log("Hello, model matches")
 		oha_api.DeviceId=_id;
        oha_api.DevPlugIn();
 	}
}

function OHA_DevOff(_id){
    oha_api.DeviceId=-1;
    oha_api.DevPlugOut();
}

function OHA_INTR(_id, _data) {
    if(_id==oha_api.DeviceId) {
        oha_api.OHA_INTR(_data);
    }
}
function OHA_RET(_id, _srcCmd, _recvData){
    var _srcCmd1=_srcCmd;
    if(_id==oha_api.DeviceId) {
        if(_srcCmd.indexOf("G:")==0) {
            _srcCmd1=_srcCmd.substring(2);
        }
        oha_api.OHA_RET(_srcCmd1, _recvData);
    }
}

var oha_api=new function (){
    var __urlCmdQ=[];
    var __toastQ=[];
    var __isUrlCmdActive=false;
    var _isToastQNotEmpty=false;
    var __urlCmdInterval;
    this.isoCountries = {
        'Afghanistan': 'AF',
        'Aland Islands': 'AX',
        'Albania': 'AL',
        'Algeria': 'DZ',
        'American Samoa': 'AS',
        'Andorra': 'AD',
        'Angola': 'AO',
        'Anguilla': 'AI',
        'Antarctica': 'AQ',
        'Antigua And Barbuda': 'AG',
        'Argentina': 'AR',
        'Armenia': 'AM',
        'Aruba': 'AW',
        'Australia': 'AU',
        'Austria': 'AT',
        'Azerbaijan': 'AZ',
        'Bahamas': 'BS',
        'Bahrain': 'BH',
        'Bangladesh': 'BD',
        'Barbados': 'BB',
        'Belarus': 'BY',
        'Belgium': 'BE',
        'Belize': 'BZ',
        'Benin': 'BJ',
        'Bermuda': 'BM',
        'Bhutan': 'BT',
        'Bolivia': 'BO',
        'Bosnia And Herzegovina': 'BA',
        'Botswana': 'BW',
        'Bouvet Island': 'BV',
        'Brazil': 'BR',
        'British Indian Ocean Territory': 'IO',
        'Brunei Darussalam': 'BN',
        'Bulgaria': 'BG',
        'Burkina Faso': 'BF',
        'Burundi': 'BI',
        'Cambodia': 'KH',
        'Cameroon': 'CM',
        'Canada': 'CA',
        'Cape Verde': 'CV',
        'Cayman Islands': 'KY',
        'Central African Republic': 'CF',
        'Chad': 'TD',
        'Chile': 'CL',
        'China': 'CN',
        'Christmas Island': 'CX',
        'Cocos (Keeling) Islands': 'CC',
        'Colombia': 'CO',
        'Comoros': 'KM',
        'Congo': 'CG',
        'Congo, Democratic Republic': 'CD',
        'Cook Islands': 'CK',
        'Costa Rica': 'CR',
        'Cote D\'Ivoire': 'CI',
        'Croatia': 'HR',
        'Cuba': 'CU',
        'Cyprus': 'CY',
        'Czech Republic': 'CZ',
        'Denmark': 'DK',
        'Djibouti': 'DJ',
        'Dominica': 'DM',
        'Dominican Republic': 'DO',
        'Ecuador': 'EC',
        'Egypt': 'EG',
        'El Salvador': 'SV',
        'Equatorial Guinea': 'GQ',
        'Eritrea': 'ER',
        'Estonia': 'EE',
        'Ethiopia': 'ET',
        'Falkland Islands': 'FK',
        'Faroe Islands': 'FO',
        'Fiji': 'FJ',
        'Finland': 'FI',
        'France': 'FR',
        'French Guiana': 'GF',
        'French Polynesia': 'PF',
        'French Southern Territories': 'TF',
        'Gabon': 'GA',
        'Gambia': 'GM',
        'Georgia': 'GE',
        'Germany': 'DE',
        'Ghana': 'GH',
        'Gibraltar': 'GI',
        'Greece': 'GR',
        'Greenland': 'GL',
        'Grenada': 'GD',
        'Guadeloupe': 'GP',
        'Guam': 'GU',
        'Guatemala': 'GT',
        'Guernsey': 'GG',
        'Guinea': 'GN',
        'Guinea-Bissau': 'GW',
        'Guyana': 'GY',
        'Haiti': 'HT',
        'Heard Island & Mcdonald Islands': 'HM',
        'Holy See (Vatican City State)': 'VA',
        'Honduras': 'HN',
        'Hong Kong': 'HK',
        'Hungary': 'HU',
        'Iceland': 'IS',
        'India': 'IN',
        'Indonesia': 'ID',
        'Iran, Islamic Republic Of': 'IR',
        'Iraq': 'IQ',
        'Ireland': 'IE',
        'Isle Of Man': 'IM',
        'Israel': 'IL',
        'Italy': 'IT',
        'Jamaica': 'JM',
        'Japan': 'JP',
        'Jersey': 'JE',
        'Jordan': 'JO',
        'Kazakhstan': 'KZ',
        'Kenya': 'KE',
        'Kiribati': 'KI',
        'Korea': 'KR',
        'Kuwait': 'KW',
        'Kyrgyzstan': 'KG',
        'Lao People\'s Democratic Republic': 'LA',
        'Latvia': 'LV',
        'Lebanon': 'LB',
        'Lesotho': 'LS',
        'Liberia': 'LR',
        'Libyan Arab Jamahiriya': 'LY',
        'Liechtenstein': 'LI',
        'Lithuania': 'LT',
        'Luxembourg': 'LU',
        'Macao': 'MO',
        'Macedonia': 'MK',
        'Madagascar': 'MG',
        'Malawi': 'MW',
        'Malaysia': 'MY',
        'Maldives': 'MV',
        'Mali': 'ML',
        'Malta': 'MT',
        'Marshall Islands': 'MH',
        'Martinique': 'MQ',
        'Mauritania': 'MR',
        'Mauritius': 'MU',
        'Mayotte': 'YT',
        'Mexico': 'MX',
        'Micronesia, Federated States Of': 'FM',
        'Moldova': 'MD',
        'Monaco': 'MC',
        'Mongolia': 'MN',
        'Montenegro': 'ME',
        'Montserrat': 'MS',
        'Morocco': 'MA',
        'Mozambique': 'MZ',
        'Myanmar': 'MM',
        'Namibia': 'NA',
        'Nauru': 'NR',
        'Nepal': 'NP',
        'Netherlands': 'NL',
        'Netherlands Antilles': 'AN',
        'New Caledonia': 'NC',
        'New Zealand': 'NZ',
        'Nicaragua': 'NI',
        'Niger': 'NE',
        'Nigeria': 'NG',
        'Niue': 'NU',
        'Norfolk Island': 'NF',
        'Northern Mariana Islands': 'MP',
        'Norway': 'NO',
        'Oman': 'OM',
        'Pakistan': 'PK',
        'Palau': 'PW',
        'Palestinian Territory, Occupied': 'PS',
        'Panama': 'PA',
        'Papua New Guinea': 'PG',
        'Paraguay': 'PY',
        'Peru': 'PE',
        'Philippines': 'PH',
        'Pitcairn': 'PN',
        'Poland': 'PL',
        'Portugal': 'PT',
        'Puerto Rico': 'PR',
        'Qatar': 'QA',
        'Reunion': 'RE',
        'Romania': 'RO',
        'Russian Federation': 'RU',
        'Rwanda': 'RW',
        'Saint Barthelemy': 'BL',
        'Saint Helena': 'SH',
        'Saint Kitts And Nevis': 'KN',
        'Saint Lucia': 'LC',
        'Saint Martin': 'MF',
        'Saint Pierre And Miquelon': 'PM',
        'Saint Vincent And Grenadines': 'VC',
        'Samoa': 'WS',
        'San Marino': 'SM',
        'Sao Tome And Principe': 'ST',
        'Saudi Arabia': 'SA',
        'Senegal': 'SN',
        'Serbia': 'RS',
        'Seychelles': 'SC',
        'Sierra Leone': 'SL',
        'Singapore': 'SG',
        'Slovakia': 'SK',
        'Slovenia': 'SI',
        'Solomon Islands': 'SB',
        'Somalia': 'SO',
        'South Africa': 'ZA',
        'South Georgia And Sandwich Isl.': 'GS',
        'Spain': 'ES',
        'Sri Lanka': 'LK',
        'Sudan': 'SD',
        'Suriname': 'SR',
        'Svalbard And Jan Mayen': 'SJ',
        'Swaziland': 'SZ',
        'Sweden': 'SE',
        'Switzerland': 'CH',
        'Syrian Arab Republic': 'SY',
        'Taiwan': 'TW',
        'Tajikistan': 'TJ',
        'Tanzania': 'TZ',
        'Thailand': 'TH',
        'Timor-Leste': 'TL',
        'Togo': 'TG',
        'Tokelau': 'TK',
        'Tonga': 'TO',
        'Trinidad And Tobago': 'TT',
        'Tunisia': 'TN',
        'Turkey': 'TR',
        'Turkmenistan': 'TM',
        'Turks And Caicos Islands': 'TC',
        'Tuvalu': 'TV',
        'Uganda': 'UG',
        'Ukraine': 'UA',
        'United Arab Emirates': 'AE',
        'United Kingdom': 'GB',
        'United States': 'US',
        'United States Outlying Islands': 'UM',
        'Uruguay': 'UY',
        'Uzbekistan': 'UZ',
        'Vanuatu': 'VU',
        'Venezuela': 'VE',
        'Vietnam': 'VN',
        'Virgin Islands, British': 'VG',
        'Virgin Islands, U.S.': 'VI',
        'Wallis And Futuna': 'WF',
        'Western Sahara': 'EH',
        'Yemen': 'YE',
        'Zambia': 'ZM',
        'Zimbabwe': 'ZW'
    };
    
	this.isoLangs = {
        'Abkhaz':'ab', 
        'Afar':'aa', 
        'Afrikaans':'af', 
        'Akan':'ak', 
        'Albanian':'sq', 
        'Amharic':'am', 
        'Arabic':'ar', 
        'Aragonese':'an', 
        'Armenian':'hy', 
        'Assamese':'as', 
        'Avaric':'av', 
        'Avestan':'ae', 
        'Aymara':'ay', 
        'Azerbaijani':'az', 
        'Bambara':'bm', 
        'Bashkir':'ba', 
        'Basque':'eu', 
        'Belarusian':'be', 
        'Bengali':'bn', 
        'Bihari':'bh', 
        'Bislama':'bi', 
        'Bosnian':'bs', 
        'Breton':'br', 
        'Bulgarian':'bg', 
        'Burmese':'my', 
        'Catalan; Valencian':'ca', 
        'Chamorro':'ch', 
        'Chechen':'ce', 
        'Chichewa; Chewa; Nyanja':'ny', 
        'Chinese':'zh', 
        'Chuvash':'cv', 
        'Cornish':'kw', 
        'Corsican':'co', 
        'Cree':'cr', 
        'Croatian':'hr', 
        'Czech':'cs', 
        'Danish':'da', 
        'Divehi; Dhivehi; Maldivian;':'dv', 
        'Dutch':'nl', 
        'English':'en', 
        'Esperanto':'eo', 
        'Estonian':'et', 
        'Ewe':'ee', 
        'Faroese':'fo', 
        'Fijian':'fj', 
        'Finnish':'fi', 
        'French':'fr', 
        'Fula; Fulah; Pulaar; Pular':'ff', 
        'Galician':'gl', 
        'Georgian':'ka', 
        'German':'de', 
        'Greek, Modern':'el', 
        'Guaraní':'gn', 
        'Gujarati':'gu', 
        'Haitian; Haitian Creole':'ht', 
        'Hausa':'ha', 
        'Hebrew (modern)':'he', 
        'Herero':'hz', 
        'Hindi':'hi', 
        'Hiri Motu':'ho', 
        'Hungarian':'hu', 
        'Interlingua':'ia', 
        'Indonesian':'id', 
        'Interlingue':'ie', 
        'Irish':'ga', 
        'Igbo':'ig', 
        'Inupiaq':'ik', 
        'Ido':'io', 
        'Icelandic':'is', 
        'Italian':'it', 
        'Inuktitut':'iu', 
        'Japanese':'ja', 
        'Javanese':'jv', 
        'Kalaallisut, Greenlandic':'kl', 
        'Kannada':'kn', 
        'Kanuri':'kr', 
        'Kashmiri':'ks', 
        'Kazakh':'kk', 
        'Khmer':'km', 
        'Kikuyu, Gikuyu':'ki', 
        'Kinyarwanda':'rw', 
        'Kirghiz, Kyrgyz':'ky', 
        'Komi':'kv', 
        'Kongo':'kg', 
        'Korean':'ko', 
        'Kurdish':'ku', 
        'Kwanyama, Kuanyama':'kj', 
        'Latin':'la', 
        'Luxembourgish, Letzeburgesch':'lb', 
        'Luganda':'lg', 
        'Limburgish, Limburgan, Limburger':'li', 
        'Lingala':'ln', 
        'Lao':'lo', 
        'Lithuanian':'lt', 
        'Luba-Katanga':'lu', 
        'Latvian':'lv', 
        'Manx':'gv', 
        'Macedonian':'mk', 
        'Malagasy':'mg', 
        'Malay':'ms', 
        'Malayalam':'ml', 
        'Maltese':'mt', 
        'Māori':'mi', 
        'Marathi (Marāṭhī)':'mr', 
        'Marshallese':'mh', 
        'Mongolian':'mn', 
        'Nauru':'na', 
        'Navajo, Navaho':'nv', 
        'Norwegian Bokmål':'nb', 
        'North Ndebele':'nd', 
        'Nepali':'ne', 
        'Ndonga':'ng', 
        'Norwegian Nynorsk':'nn', 
        'Norwegian':'no', 
        'Nuosu':'ii', 
        'South Ndebele':'nr', 
        'Occitan':'oc', 
        'Ojibwe, Ojibwa':'oj', 
        'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic':'cu', 
        'Oromo':'om', 
        'Oriya':'or', 
        'Ossetian, Ossetic':'os', 
        'Panjabi, Punjabi':'pa', 
        'Pāli':'pi', 
        'Persian':'fa', 
        'Polish':'pl', 
        'Pashto, Pushto':'ps', 
        'Portuguese':'pt', 
        'Quechua':'qu', 
        'Romansh':'rm', 
        'Kirundi':'rn', 
        'Romanian, Moldavian, Moldovan':'ro', 
        'Russian':'ru', 
        'Sanskrit (Saṁskṛta)':'sa', 
        'Sardinian':'sc', 
        'Sindhi':'sd', 
        'Northern Sami':'se', 
        'Samoan':'sm', 
        'Sango':'sg', 
        'Serbian':'sr', 
        'Scottish Gaelic; Gaelic':'gd', 
        'Shona':'sn', 
        'Sinhala, Sinhalese':'si', 
        'Slovak':'sk', 
        'Slovene':'sl', 
        'Somali':'so', 
        'Southern Sotho':'st', 
        'Spanish; Castilian':'es', 
        'Sundanese':'su', 
        'Swahili':'sw', 
        'Swati':'ss', 
        'Swedish':'sv', 
        'Tamil':'ta', 
        'Telugu':'te', 
        'Tajik':'tg', 
        'Thai':'th', 
        'Tigrinya':'ti', 
        'Tibetan Standard, Tibetan, Central':'bo', 
        'Turkmen':'tk', 
        'Tagalog':'tl', 
        'Tswana':'tn', 
        'Tonga (Tonga Islands)':'to', 
        'Turkish':'tr', 
        'Tsonga':'ts', 
        'Tatar':'tt', 
        'Twi':'tw', 
        'Tahitian':'ty', 
        'Uighur, Uyghur':'ug', 
        'Ukrainian':'uk', 
        'Urdu':'ur', 
        'Uzbek':'uz', 
        'Venda':'ve', 
        'Vietnamese':'vi', 
        'Volapük':'vo', 
        'Walloon':'wa', 
        'Welsh':'cy', 
        'Wolof':'wo', 
        'Western Frisian':'fy', 
        'Xhosa':'xh', 
        'Yiddish':'yi', 
        'Yoruba':'yo', 
        'Zhuang, Chuang':'za', 
    }

    this.langSet="en";
    this.langCode={
        English:"en", 
        TraditionChinese:"tw", 
        SimpleChinese:"cn", 
        Korean:"kr", 
    }
    var self=this;

    this.ohaConfig={
        apiVer:-1,
        title:"", 
        subtitle:"", 
        plateForm:"PC", 
        isCheckModelName: true, 
        html:"", 
        default_language:this.langCode.English, 
        isReadOnly:false, 
    }
    
    this.init=function(_config){
        if(typeof _config !== undefined) {
            $.extend(true, oha_api.ohaConfig, _config);
        }
    }
    
    this.DeviceId=-1;
    
    this.DevPlugIn=function(){
        console.log("Device is plugged in!!")
    }
    
    this.DevPlugOut=function(){
        console.log("Device is plugged out!!")
    }
    
    this.OHA_INTR=function(_data) {
        console.log("Interrupt data in==>"+_data);
    }
    
    this.OHA_RET=function(_srcCmd, _retData) {
        console.log("Read command return(command="+_srcCmd+", return data="+_retData);
    }
    
    this.initToastSize=function() {
        __x.__initSize();
    }
    
    this.getPlateForm=function() {
        return this.ohaConfig.plateForm;
    }
    
    this.getAppVer=function() {
        return this.ohaConfig.appVer;
    }
    
    this.isReadOnly=function() {
        return this.ohaConfig.isReadOnly;
    }
//    this.set = function (_config, _htmlConfig) {
//        $.extend(true, this.ohaConfig, _config);
//        this.ohaConfig.html=_htmlConfig[this.ohaConfig.default_language]+"?OHA_Local=true";
//        
//    }
//    if (typeof oha_config !== 'undefined') {
//        $.extend(true, this.ohaConfig, oha_config);
//    }
//    if(typeof html_config !== 'undefined') {
//        this.ohaConfig.html=html_config[this.ohaConfig.default_language]+"?OHA_Local=true";
//    }
    //console.log("hello, api, this.ohaConfig.html="+this.ohaConfig.html);

    function getNum(_p) {
        var _pat=/0[xX].+/;
        if(_pat.test(_p)) {
            return parseInt(_p.substr(2),16);
        }
        else {
            return parseInt(_p);
        }
    }

    this.runOhaCmd = function(_cmdStr) {
//        console.log('runOhaCmd('+_cmdStr+');')
        if(this.ohaConfig.plateForm=="Android" && this.ohaConfig.appVer >= 184) {
    //        console.log('OhaJsInterface.CMD('+_cmdStr+');')
    //        OhaJsInterface.CMD(_cmdStr);
            var _a=OhaJsInterface.CMD(_cmdStr);
//            console.log('runOhaCmd('+_cmdStr+")="+_a);
            return _a;
        }
        else if(this.ohaConfig.plateForm=="iOS" && this.ohaConfig.appVer >459) {
    //        alert("window.OHANativeApis.JSCommand("+"_cmdStr"+")");
            return window.OHANativeApis.JSCommand(_cmdStr);
        }
        else {
            if(__isUrlCmdActive) {
                __urlCmdQ.push(_cmdStr);
            }
            else {
                __isUrlCmdActive=true;
                __urlCmdQ.push(_cmdStr);
//                window.location.href=_cmdStr;
    //            console.log('Url command('+_cmdStr+');')
                setTimeout(function() {
                    __x.__runUrlCmd();
                }, 200);
            }
        }
        return null;
    }
    
    this.ApiCmdWr=function(_cmd) {
        var _cmdArray=_cmd.split(":");
        var _cmdX="";
        for(i=0;i<_cmdArray.length;i++) {
            if(isNaN(parseInt(_cmdArray[i], 16))){
                console.log("Fail:Illegal format, \""+_cmdArray[i]+"\" is not a valid HEX number!!");
                return "Fail:Illegal format, \""+_cmdArray[i]+"\" is not a valid HEX number!!";
            }
            if(i!==0) {
                _cmdX+=":";
            }
            if(i>1) {
                _cmdX+="H,"+_cmdArray[i];
            }
            else {
                _cmdX+=_cmdArray[i];
            }
        }
        var _cmdStr="oha://cw_"+this.DeviceId+"_G:"+_cmdX;
//        console.log("apiCmdWr: "+_cmdStr);
        this.runOhaCmd(_cmdStr);
    }

    this.ApiCmdRd=function(_cmd) {
        var _pat=/((?:0x)?[0-9a-fA-F]+):((?:0x)?[0-9a-fA-F]+):((?:0x)?[0-9a-fA-F]+)((?::(?:0x)?[0-9a-fA-F]+)*)$/g;
        if(_pat.test(_cmd)) {   // ex. oha://cr_2024_G:04:05:H,06
//    inStr=inStr.replace(/\S\S/g, function addSpace(x) {return x+" "}).trim();
//    inStr=inStr.replace(/\b\S\b/g, function addSpace(x) {return " 0"+x+" "}).trim();
//    inStr=inStr.replace(/\s+/g, " ");
//    inStr=inStr.toUpperCase();
            var _cmdNo=getNum(RegExp.$1);
            var _sCmdNo=getNum(RegExp.$2);
            var _count=getNum(RegExp.$3);
            if(oha_api.getPlateForm()=="Android") {
                return OhaJsInterface.OHA_CMDR(DeviceId, _cmdNo, _sCmdNo, _count);
            }
        }
    }
    
    this.setToastPos=function(_percent) {
        if(((oha_api.ohaConfig.plateForm=="Android") && (oha_api.ohaConfig.appVer>=199)) &&
          (oha_api.ohaConfig.plateForm=="iOS") &&(oha_api.ohaConfig.appVer>463)) {
            return;
        }

        if(typeof _percent=="undefined") {
            $(".oha_api.toastViewDiv").css({"top":"90%"});
            return;
        }
        var _p=parseInt(_percent);
        if(typeof _p !== "number") {
            console.log("setToastPos Error! _percent="+_percent);
            return;
        }
        if(_p<0 || _p>100) {
            console.log("setToastPos range Error! _percent="+_p);
        }
        $(".oha_api.toastViewDiv").css({"top":_p+"%"});
    }
    
    function getMessage(_msg) {
        if(typeof _msg=="string") {
            return _msg;
        }
        if(typeof _msg=="object") {
            if(oha_api.langSet in _msg) {
                return _msg[oha_api.langSet];
            }
            else {
                if(oha_api.default_language in _msg) {
                    return _msg.oha_api.default_language;
                }
                else {
                    return _msg[Object.keys(_msg)[0]];
                }
            }
        }
    }
    
    this.showToast=function(_msg) {
        var _msg1=getMessage(_msg);
        if(((oha_api.ohaConfig.plateForm=="Android") && (oha_api.ohaConfig.appVer>=199)) ||
          (oha_api.ohaConfig.plateForm=="iOS") &&(oha_api.ohaConfig.appVer>463)) {
            this.runOhaCmd("oha://showToast_"+_msg1);
        }
        else {
            __toastQ.push(_msg1);
            if(__toastQ.length>1) {
                return;
            }
            __x.__showToast();
        //    __showToast();
        }

    }

    this.getHtml=function() {
        var _html="";
        if(oha_api.ohaConfig.html_config.hasOwnProperty(oha_api.langSet)) {
            _html=this.ohaConfig.html_config[oha_api.langSet];
        }
        else {
            if(this.ohaConfig.html_config.hasOwnProperty(oha_api.default_language)) {
                _html=this.ohaConfig.html_config[oha_api.default_language];
            }
            else {
                _html=this.ohaConfig.html_config[Object.keys(this.ohaConfig.html_config)[0]];
            }
        }
        _html+="?OHA_Local=true";
        return _html;
    }

    this.getTitle=function() {
        var _title="";
        if(this.ohaConfig.title.hasOwnProperty(oha_api.langSet)) {
            _title=this.ohaConfig.title[oha_api.langSet];
        }
        else {
            _title=this.ohaConfig.title[oha_config.default_language];
        }
//        switch(oha_api.langSet) {
//            case oha_api.langCode.TraditionChinese:
//                _title=this.ohaConfig.title.tw;
//                break;
//            case oha_api.langCode.SimpleChinese:
//                _title=this.ohaConfig.title.cn;
//                break;
//            case oha_api.langCode.English:
//                _title=this.ohaConfig.title.en;
//                break;
//            case oha_api.langCode.Korean:
//                _title=this.ohaConfig.title.kr;
//                break;
//        }
        return _title;
    }

    this.getSubTitle=function() {
        var _subTitle="";
        if(this.ohaConfig.title.hasOwnProperty(oha_api.langSet)) {
            _subTitle=this.ohaConfig.subtitle[oha_api.langSet];
        }
        else {
            _subTitle=this.ohaConfig.subtitle[oha_config.default_language];
        }
//        switch(oha_api.langSet) {
//            case oha_api.langCode.TraditionChinese:
//                _html=this.ohaConfig.subtitle.tw;
//                break;
//            case oha_api.langCode.SimpleChinese:
//                _html=this.ohaConfig.subtitle.cn;
//                break;
//            case oha_api.langCode.English:
//                _html=this.ohaConfig.subtitle.en;
//                break;
//            case oha_api.langCode.Korean:
//                _html=this.ohaConfig.subtitle.kr;
//                break;
//        }
        return _subTitle;
    }

    this.setUiAlpha=function(_alpha) {
        if(oha_api.getPlateForm()=="iOS") {
            $("html").css({"opacity":parseFloat(_alpha)})
            return;
        }
        if(typeof _alpha == "undefined") {
            this.runOhaCmd("oha://alpha_0.8");
            return;
        }
        if(typeof(_alpha)=="number") {
            if(_alpha <=1 && _alpha >=0) {
                this.runOhaCmd("oha://alpha_"+_alpha)
            }
            else {
                self.showToast("Alpha value is not correct("+_alpha+")");
            }
        }
        else {
            self.showToast("Alpha value is not a number("+_alpha+")");
        }
    }

    this.cookieWrite=function(_key, _data) {
        if(__cookieCmdOk()) {
            this.runOhaCmd('oha://cookie_write_'+_key+"_"+_data);
        }
        else {
            $.cookie(_key, _data, {expires:365});
        }
    }

    this.cookieRead=function(_key, _default) {
        if(__cookieCmdOk()) {
            var _ret=this.runOhaCmd('oha://cookie_read_'+_key+"_"+_default);
            return _ret;
        }
        else {
            var _c=$.cookie(_key);
            if(_c==null) {
                _c=_default;
            }
            return _c;
        }
    }

    this.cookieRemove=function(_key) {
        if(__cookieCmdOk()) {
            this.runOhaCmd('oha://cookie_remove_'+_key);
        }
        else {
            $.removeCookie(_key);
        }
    }

    this.cookieRemoveAll=function() {
        if(__cookieCmdOk()) {
            this.runOhaCmd('oha://cookie_removeAll');
        }
        else {
            for(var _x in $.cookie()) {
                $.removeCookie(_x);
            }
        }
    }
    
    this.checkOhaString=function(_str) {
        if(_str.includes("oha_sensor")) {
            var _ohaSensorPat=/(?:oha_sensor)[ ]+([^=]+)=[ ]*([^ ]+)[ ]+([^ ]+)[ ]*[(]([^()]+)[)],(.*)$/;
            if(_ohaSensorPat.test(_str)) {
                alert("oha_sensor string pass!!\n\tSensorName="+RegExp.$1+"\n\tSensorValue="+RegExp.$2+"\n\tSensorUnit="+RegExp.$3+"\n\tRawData="+RegExp.$4+"\n\tDescription="+RegExp.$5);
            }
            else {
                alert("oha_sensor string fail!")
            }
        }
//        var _ohaSensorPat=/(?:oha_sensor)[ ]+([^=]+)=[ ]*([^ ]+)[ ]+([^ ]+)[ ]*[(]([^()]+)[)],(.*)$/;
//        var _ohaHttpPat=/^[ ]*(?:oha_http)[ ]*(.*)$/;

    }

    function __cookieCmdOk () {
        return ((self.ohaConfig.plateForm=="Android") && (self.ohaConfig.appVer > 189));
    }

    __x=new function () {
        var self=this;
        this.__showToast=function() {
            if(__toastQ.length==0) {
                return;
            }
            var _msg=__toastQ[0]
            $(".oha_api.toastViewDiv").stop();
            $(".oha_api.toastView").text(_msg);
            $(".oha_api.toastViewDiv").fadeIn(500);
            setTimeout(function() {
        //        $(".oha_api.toastViewDiv").fadeOut(1000, function(){
        //            __toastQ.splice(0,1);
        //            __showToast();
        //        });
                $(".oha_api.toastViewDiv").fadeOut(1000);
                __toastQ.splice(0,1);
                self.__showToast();
            }, 2000);

        }

        this.__initSize=function () {
            var _w=$(window).width();
            $(".oha_api.toastViewDiv").css({"font-size":0.04*_w+"px"});
            $(".oha_api.toastView").css({"border-radius":0.02*_w+"px"});
        }

        this.__runUrlCmd=function() {
            if(__urlCmdQ.length==0) {
                __isUrlCmdActive=false;
            }
            else {
                var _cmd=__urlCmdQ[0];
                __urlCmdQ.splice(0,1);
                window.location.href=_cmd;
        //        console.log('Url command('+_cmd+');')
                setTimeout(function() {
                    self.__runUrlCmd();
                }, 200);
            }
        }
    }
    
    
}

//if(typeof oha_config!=="undefined") {
//    $.extend(true, oha_api.ohaConfig, oha_config);
//}
//var scriptTag = document.createElement('script');
//    scriptTag.type="text/javascript";
//    scriptTag.src = oha_api.ohaConfig.api_path+"jquery.cookie.js";
//    document.head.appendChild(scriptTag);
$(".oha_api.toastView").css({"background-color":"black", "color":"white", "position":"fixed", "font-family":"'Arial', sans-serif", 
                    "word-wrap":"break-word", "left":"10%", "width":"80%", "border-radius":0.03*$(window).width()});
$(".oha_api.toastViewDiv").css({"display":"none", "position":"fixed", "position":"fixed", "width":"100%", 
                    "left":"0", "top":"90%", "text-align":"center", "font-size":0.04*$(window).width(), "z-index":"99999"});