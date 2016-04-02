var Form_items = "";//$("#" + Form_name).children();// 表单的所有DIV
//这个文件只包含函数的定义
//hideallerror 函数说明
//参数表单的名字（id）  input项目的个数
//append操作之后执行一次
//调用validity马上执行一次
//副作用 定义变量
var hideallerror = function(Form_name, Input_elems_length) {// 被调用的
	str_errorphone = Form_name + "_errorphone";
	$("#" + str_errorphone).hide();
	str_notmatchpw = Form_name + "_notmatchpw";
	$("#" + str_notmatchpw).hide();
	str_notarightage = Form_name + "_notarightage";
	$("#" + str_notarightage).hide();
	str_early = Form_name + "_early";
	$("#" + str_early).hide();
	
	// 有更改的话要在这里改
	
	// 全部隐藏一次
	for (i = 0; i <= Input_elems_length; i++) {
		str = Form_name + "_isEmpty_" + i;
		$("#" + str).hide();// 全部隐藏 每次点提交时候
	}
}

// 为每个input添加提醒isEmpty忘记填写
// 每个input按顺序地编上索引 用if条件跳过非input项目 count做编序号 用length属性判断的
// no_empty作为标记变量 返回变量
// 用if测试是否append过 用length属性判断的
// append的id跟Form_name关联保证不会id冲突
var Check_Required = function(Form_name) {// 被validity调用
	var Input_elems = $(":input", $("#" + Form_name));// 获取表单所有input元素

	// Input_elems.css("color", "red").css("color", "black");// 设置input的颜色css

	var no_empty = 1;// 非空 全部填写为1


	var count = 0;// 添加项目前置0 为input按顺序标上序号
	Form_items = $("#" + Form_name).children();// 表单的所有DIV

	Form_items.append(function(index, html) {
				//console.log("该子项含有input数"
				//		+ $(":input", $(Form_items[index])).length);// 看看有没有input

				// 为表单的每一项input加上错误消息
				if ( $(":input", $(Form_items[index])).length) {// 判断条件为有

					str = Form_name + "_isEmpty_" + count;// 必填项目+表单名字+input项的索引
					// 作为错误信息的id
					// 索引从0开始计算

					//console.log("id为" + str);
					//console.log("看看加过没" + $("#" + str).length);// 返回有没有这个id

					count++;
					if ($("#" + str).length == 0)// 判断有没有加过 加过为false
					{
						isEmpty = "<div id=\""
								+ str
								+ "\" style=\"color:red\"><li align=\"right\">这里忘了填喔</li></div>";
						// 增加子元素

						return isEmpty;// return 这个字符串表示append上的子元素
					}
				}
			});
	// $("#isEmpty_1").hide();

	hideallerror(Form_name, Input_elems.length);

	Input_elems.each(function(index, element) {
		if (element.value == "")// 空的
		{
			element.focus();// 聚焦
			str = Form_name + "_isEmpty_" + index;
			$("#" + str).show();// 显示错误信息
			// alert("该项没填写");
			no_empty = 0;// 有空元素为0
			return false;// break;//跳出整个遍历 也不能做下面的if no_empty 也不能请求服务器
		}

		no_empty = 1;// 都填了
	});

	return no_empty;
}

// 提交表单前直接被调用的函数
// 先隐藏掉所有的错误消息 因为每点一次提交表单都会执行函数一次 要把上次的检验错误隐藏掉
// all_valid作为标记变量 也是返回变量
// 执行主要部分的条件是 都是非空
// if else if 项目可以不断添加 提示消息errormsg根据需要添加 而且可以不止一条 命名规则见下面
// 提示消息的显示条件为 表单项目存在&&验证条件
// 显示提示消息并且聚焦填写框
var Form_Validity = function(Form_name)// 前段表单验证
{
	hideallerror(Form_name);

	var all_valid = 0;// 全部可行（非空且合法） 最终置1 返回变量

	if (Check_Required(Form_name))// 都填了 进一步判断
	{
		// Input_elems = $(":input", $("#" + Form_name));
		//Form_items = $("#" + Form_name).children();// 表单的所有DIV

		Form_items
				.append(function(index, html) {

					if ($("#contract", $(Form_items[index])).length) {// contract
						str = Form_name + "_errorphone";

						if ($("#" + str).length == 0)// 判断有没有加过 加过为false
						{
							errormsg = "<div id=\""
									+ str
									+ "\" style=\"color:red\"><li align=\"right\">手机号码不正确喔</li></div>";

							return errormsg;
						}
					}// 判断是手机号码
					
					else if ($("#age", $(Form_items[index])).length) {
						str = Form_name + "_notarightage";

						if ($("#" + str).length == 0)// 判断有没有加过 加过为false
						{
							errormsg = "<div id=\""
									+ str
									+ "\" style=\"color:red\"><li align=\"right\">这个不像是你的年龄</li></div>";

							return errormsg;
						}
					}
					
					else if ($("#service_time", $(Form_items[index])).length) {
						str = Form_name + "_early";

						if ($("#" + str).length == 0)// 判断有没有加过 加过为false
						{
							errormsg = "<div id=\""
									+ str
									+ "\" style=\"color:red\"><li align=\"right\">你选的时间比今天要早</li></div>";

							return errormsg;
						}
					}
					
					else if ($("#password2", $(Form_items[index])).length) {
						str = Form_name + "_notmatchpw";

						if ($("#" + str).length == 0)// 判断有没有加过 加过为false
						{
							errormsg = "<div id=\""
									+ str
									+ "\" style=\"color:red\"><li align=\"right\">两次输入的密码不匹配</li></div>";

							return errormsg;
						}
					}

					return false;// 什么都不添加 这句不写也一样
				});

		hideallerror(Form_name);// 隐藏所有错误append之后要执行

		// 以下项目按需添加 要用其属性
		_contract_item = $("#contract", $("#" + Form_name));
		_password_item = $("#password", $("#" + Form_name));
		_password2_item = $("#password2", $("#" + Form_name));
		_age_item = $("#age", $("#" + Form_name));
		_service_time_item = $("#service_time", $("#" + Form_name));

		//console.log(_service_time_item.val());
		//CompareDate(_service_time_item.val());
		if (_contract_item.length == 1
				&& !(/^1[3|4|5|8][0-9]\d{8}$/.test(_contract_item.val())))// 注册用的手机号码这个是正则表达式
		{

			// alert("手机号码不正确");
			$("#" + str_errorphone).show();
			_contract_item.focus();
		} else if (_password2_item.length == 1
				&& _password_item.val() != _password2_item.val()) {// 存在且不相等
			// alert("密码不匹配");
			$("#" + str_notmatchpw).show();

			_password2_item.focus();
		}
		else if (_age_item.length == 1 
				&& (_age_item.val() > 120 || _age_item.val() < 0 || !( /^[0-9]*$/.test(_age_item.val()) ))) {// 存在且范围不对
			// alert("密码不匹配");
			$("#" + str_notarightage).show();

			_age_item.focus();
		} else if (_service_time_item.length == 1
				&& !CompareDate(_service_time_item.val())) {// 存在且早
			//alert("填写日期不对");
			$("#" + str_early).show();

			_service_time_item.focus();
		}
		
		else {
			// elems[0].style.color="black";
			/*
			 * Input_elems.each(function(index, element) { element.style.color =
			 * "black"; });
			 */
			// alert("都对了");
			all_valid = 1;
		}
		return all_valid;
	}
}

var CompareDate = function(Inputdate) {// 被调用的
	currentdate = new Date();
	//today=currentdate.toLocaleDateString().replace("/", "").replace("/", ""); //获取当前日期不能这样做
	today_year=currentdate.getFullYear(); //获取完整的年份(4位,1970-????)
	today_month=currentdate.getMonth()+1; //获取当前月份(0-11,0代表1月)
	today_day=currentdate.getDate(); //获取当前日(1-31)
	if (today_month<10){today_month="0"+today_month;}
	if (today_day<10){today_day="0"+today_day;}
	today=today_year+today_month+today_day;
	//console.log("今天是"+today);
	input_date=Inputdate.replace("-", "").replace("-", "");
	//console.log("你所输入的是"+input_date);
	//console.log("判断结果"+(parseInt(input_date)<parseInt(today)))
	if ((parseInt(input_date)<parseInt(today)))
	{return false;}
	else
	{return true;}
}