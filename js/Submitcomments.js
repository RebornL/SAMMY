// JavaScript Document
var isAjax = 0;//防止点击多次
var Leave_1st_page = 0;//未离开首页为0
var Come_to_an_end = 0;//整个流程结束
//修改订单的操作

var goToModifyOrder = function(){
	$.mobile.loading("show");
	var order_ID = $(this).attr("data-no");//获取订单ID
	document.getElementById("usersubmitsammycomment").reset(); //还是这种reset靠谱
	
	$("select[name=Dietitian_ID]").attr("disabled",false);//先启用

	
	if(isAjax) {return;}
	isAjax = 1;//防止再次点击有效
	//根据订单ID（即order_ID）的唯一，再次查询数据得到唯一的数据，返回json数据显示填表
	$.getJSON("../php/userchkorder.php?order_ID="+order_ID,function(data){
		//得到的json数据格式：{"Order0":{"order_ID":"92","user_id":"0","ToS":"0","ToC":"0","Dietitian_ID":"1","user_name":"\u7684\u554a","sex":"0","address":"\u7684\u554a\u554a\u54c7\u54c7\u54c7","age":"12","contract":"123123123","description":"","service_time":"1211-03-01","commit_time":"2015-08-14 01:02:25","order_status":"0"}}
		//alert(JSON.stringify(data));
		$.each(data,function(key,order_info){

			for (var item in order_info){
                if((item == "order_ID") || (item == "user_id") || (item == "contract")){
					$("#"+item).val(order_info[item]);
				}
				else if(item == "Dietitian_ID"){
					$("#"+item).find("option:selected").attr("selected",false);//撤销选中

					$("#"+item).find("option[value='"+order_info[item]+"']").attr("selected",true);//设置value值为order_info[item]选中
					$("#"+item).prev("span").text($("#"+item).find("option[value='"+order_info[item]+"']").text());
				}
			}
			
			$("select[name=Dietitian_ID]").attr("disabled",true); //暂时设置为不可用，会导致不能提交该项

			isAjax = false;//表明可以再次点击
			$.mobile.loading("hide");
            $.mobile.changePage("#modify");//此刻切换到评价订单的界面
			if ($("#Dietitian_ID-button").length==1)//清除障碍
			{	//$("#Dietitian_ID").unwrap().unwrap();
				$("#Dietitian_ID-button").removeClass("ui-state-disabled").removeAttr("aria-disabled");
				//aria-disabled
			}//去掉它的父元素			
			isAjax = 0;
		});
	});
	
};

//确认提交事件
var commitOrder = function(event){
	event.preventDefault();//阻止页面跳转
	if (!Form_Validity("usersubmitsammycomment")){return;}
	if(isAjax) {return;}
	isAjax = 1;
	$("select[name=Dietitian_ID]").attr("disabled",false).removeClass('ui-state-disabled'); //提交前恢复可用，能提交这一项
	//突然发现这句被注释掉了，导致不能提交这一项
	var $info="";
	var $button="";
	$.mobile.loading("show");
	var formValues = $('#usersubmitsammycomment').serialize();

	var $hint = $("#hint");
	$hint.empty();
	$.ajaxSettings.async = false;
	$.getJSON("../php/Diet/addDietCom.php", formValues,function(data){
		//获取到返回的json数据信息,通过data.send_status查看信息
		if(data > 0){
			$info = "<p><span>评价成功！谢谢您的意见！</span></p>";
			$button = "<a href=\"./Submitcomments.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
			
		}else{
			$info = "<p><span>不好意思！您的评价提交失败！</span></p>";
			$button = "<a href=\"./Submitcomments.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
		}
	
	});
	$hint.append($info+$button);//弹出提示框
	$.mobile.loading("hide");//关闭加载图标
	$.mobile.changePage("#commit");
	isAjax = 0;
};


//绑定事件
var bindEvent = function(){
	//查询按钮绑定
	//$("#search_button").unbind().bind("click",searchOrder);
	//点击列表进入修改订单
	$("#search_button").unbind().bind("click",function(){searchOrder(3);});

	//$("#resultlist").off().on("click","a",goToModifyOrder);//函数名称也不想改变了
	//提交评论
	$("#submit_button1").unbind().bind("click",commitOrder);//按钮的名字都不想改变了
	
};

isbind=0;
//页面加载后进行的操作入口
$(document).on("pagebeforeshow","#search",function(){	

if (Leave_1st_page == 0)//第一次来
	{
		//searchOrder();//每次页面search加载都执行
	}
else if (Leave_1st_page > 0)
	{
		window.location = "./Submitcomments.html";//离开过 就重新加载  经典js方法
	}

});

$(document).on("pageshow","#commit",function(){	//一旦#commit页面显示#commit
	
	Come_to_an_end = 1;//一显示最后页面 1
});
$(document).on("pageshow", "#modify", function () {	//一旦#commit页面显示#commit

    Leave_1st_page = 1; //离开首页 1
		
});
$(document).on("pagebeforeshow", "#modify", function () {	//这里倒数第二页是modify

if (Come_to_an_end == 0)//第一次去最后的页面
	{
		//什么都不做
	}
else if (Come_to_an_end > 0)
	{
		window.location = "./Submitcomments.html";//到了最后页面返回来的话 就重新加载  经典js方法
	}

});

$(document).ready(function() {
    bindEvent();//第一次加载好整个html才执行
	searchOrder(3);
});