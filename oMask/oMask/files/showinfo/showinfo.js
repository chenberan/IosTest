// JavaScript Document

function inputinfo(function01 , function02 ,maincolor,subcolor,btn01,btn02,closebtn){
winwidth = $(window).width();
winhei = $(window).height();	
$("body").append("<div id='inputinfo'></div>")
$("#inputinfo").after("<div id='inputinfobox' style='display:none'><div id='inputinfo01' class='inputinfobtn'>"+btn01+"</div><div id='inputinfo02'  class='inputinfobtn'>"+btn02+"</div><div id='inputinfoclose' class='inputinfobtn'>"+closebtn+"</div></div>")

$("#inputinfo").css({
  "width": 0.1 * winwidth +"px",
  "height": 0.1 * winwidth +"px",
  "background-color":maincolor,
  "background-image":"url(files/showinfo/css/icon_light.png)",
  "background-size":"95%",
  "background-position":"center",
  "background-repeat":"no-repeat",
  "padding":0.02 * winwidth +"px",
  "position":"absolute",
  "top": 0.1 * winhei +"px", 
  "right": 0,
  "border-radius":0.02 * winwidth +"px",
  "cursor":"pointer",	
})

$("#inputinfobox").css({
  "width": 0.8 * winwidth +"px",
  "background-color":subcolor,
  "padding":0.02 * winwidth +"px",
  "position":"absolute",
  "top": 0.1 * winhei +"px", 
  "left": 0.1 * winwidth +"px",
  "border-radius":0.1 * winwidth +"px",
  "z-index":"999999",
})

$(".inputinfobtn").css({
  "width": "90%",
  "height": 0.1 * winwidth +"px",
  "font-size": 0.08 * winwidth +"px",
  "line-height": 0.1 * winwidth +"px",
  "background-color":"rgba(255,255,255,1)",
  "color":"#000",
  "padding":0.02 * winwidth +"px",
  "margin":0.05 * winwidth +"px auto",
  "text-align":"center",
  "font-family":"微軟正黑體",
  "cursor":"pointer"
})

$("#inputinfoclose").css({
  "background-color":"rgba(155,155,155,1)",
  "color":"#FFF",
})



$("#inputinfo").click(function(){
  $("#inputinfobox").fadeIn(300)
})

$("#inputinfoclose").click(function(){
   $("#inputinfobox").fadeOut(300)
})

$("#inputinfo01").click(function(){
  if (typeof function01 == "function"){ function01()}
})

$("#inputinfo02").click(function(){
  if (typeof function02 == "function"){ function02()}
})

}