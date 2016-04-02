'use strict';
$(function(){
	$.mobile.loading("show");
	$.ajaxSettings.async = false;
	//定义一个数组
	var dietArr = [];
	var dietInfo = [];
	var diet_info = "";
	//获取10个营养师的资料
	$.getJSON("../php/Diet/chkDiet.php?anywords=1",function(data) {
		for(var i = 0; i < 5; i++){

			var $html = "";
			diet_info = data["Dietitian"+i]; 
			//console.log(diet_info);
			dietInfo.push(diet_info)
			//console.log(data.Dietitian0.Diet_name);
			var $href = "#";
			//图片链接暂无，随便找一张
			var $src = "#";
			var $name = diet_info.Diet_name;
			//医生的介绍
			var $text = "<b>简介：</b>"+diet_info.description+"....";
			var $a = '<li><a href="'+ $href +'" data-ajax="false" rel="external" data-no="'+i+'">';
			var $img = "<img src=\""+ $src + "\">";
			var $h2 = "<h2>"+$name+"</h2>";
			var $p = "<p>"+$text+"</p></a></li>";
			var $each_piece = $a + $img + $h2 + $p;
			dietArr.push($each_piece);
			//console.log(dietArr.join(" "));	
		}	
	});
	console.log(dietInfo);
	$("#list_diet").empty();
	//console.log(typeof dietArr.join(" "));
	var $diet_list = dietArr.join(" ");
	//加载列表完成
	$("#list_diet").append($diet_list);
	$("#list_diet").listview("refresh");
	$.mobile.loading("hide");
	$.ajaxSettings.async = true;

	//链接点击响应
	
	$("a").on("click",function(){
		$.mobile.loading("show");
		
		var id = $(this).attr("data-no");
		console.log(id)
		var dietinfo = dietInfo[id];
		console.log(dietinfo);
		getDietInfo(dietinfo);
		$.mobile.loading("hide");

		$.mobile.changePage("#pagetwo");
	});
	
});

var getDietInfo = function(dietinfo){
	console.log(dietinfo.Diet_name);
	$("#diet_name").append(dietinfo.Diet_name);
	console.log(dietinfo.description);
	$("#diet_description").append("<b>介绍:</b>"+dietinfo.description+"..........");	
	
	
}