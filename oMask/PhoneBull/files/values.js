//Loading 圖片
var loadingpic = ["files/p06.jpeg","files/p02.jpeg","files/p03.jpeg","files/p04.jpeg","files/p05.jpeg","files/p01.jpeg"];



//預設時間選項
var timemode=[10,20,30,40,50,60];




var limittime=180; //極限時間(分鐘)，超過極限時間就不能再往上加

// [模式名稱,強度,頻率,寬度,圖片,按鈕的css變化]
var opmode=[
    ["按摩",7,9,5, "files/p_relax.png",{"background-color":"#009fe8"}],
    ["提神",11,11,5,"files/p_normal.png",{"background-color":"#8dc21f"}],
	["振奮",11,15,11,"files/p_crazy_1.png",{"background-color":"#ffe100"}],
	["狂暴",15,15,15,"files/bull.gif",{"background-color":"#f7b52c"}]	
]

var defaultmode=timemode[0] //初始預設時間(分)
//var defaultmode="0.1";
var defaultopmode=0 //初始預設模式




//外觀選項
//主畫面背景[圖片,css]
var mainbg = ["files/bull_3.png",{"background-color":"rgba(74,78,89,0.9)"}];

//暫停按鈕 [文字內容,css]
var offbtn =["PAUSE",
             {"background-color":"lightblue",
			  "color":"#FFF"
			 }			 
			]
var resetbtn =["STOP",
             {"background-color":"red",
			  "color":"#FFF"
			 }			 
			]


//狀態顯示 [欄位TITLE、欄位顏色、標題顏色、內文顏色]
var modetips=[
    ["模式","#FF8800","#FFF","#FFF"],
	["強度","#FF8800","#FFF","#FFF"],
	["頻率","#FF8800","#FFF","#FFF"]
]



//電源按鈕選項 [圖片,css]
var wait=["files/p_wait.png",{"background-color":"#999"}]; //待機按鈕圖