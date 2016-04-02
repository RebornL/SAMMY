$(function(){
	//以后这个URL要改成传进去的type来判断资深营养师还是专家营养师
	$.getJSON("../../php/deletephp/dietitianinfo.php",function(data) {
		var $html = "";
		$("#list_diet").empty();
		for(var i=0;i < data.id.length;i++){
			//var str = "<ul data-role=\"listview\" data-inset=\"true\">";
			//点击该医生转向另一个界面处理的链接
			var $herf = "#";//暂定为这个，以后可根据ID来判断
			//图片的链接
			var $src = data.picture[i];
			//医生的名字
			var $name = data.name[i];
			//医生的介绍
			var $text = data.introduction[i];
			var $a = "<li><a href=\""+ $herf +"\" data-ajax=\"false\" rel=\"external\">";
			var $img = "<img src=\""+ $src + "\">";
			var $h2 = "<h2>"+$name+"</h2>";
			//var $p = "<p>"+$text+"</p></a></li></ul>";
			var $p = "<p>"+$text+"</p></a></li>";
			//var $each_piece = str + $a + $img + $h2 + $p;
			var $each_piece = $a + $img + $h2 + $p;
			$("#list_diet").append($each_piece);
			//$html = $html + $each_html;
		}
		//$("#listview").html($html);
		$("div[data-role=content] ul").listview("refresh");
		
	});
	

});