$(function(){
	//给注册按钮加事件
	$("#register").click(function(){
		//获取用户名和密码
		var usn = $("#username").val();
		var pwd = $("#password").val();
		var con = $("#conPwd").val(); //确认密码
		
		//用户不能为空
		if(!usn){
			alert("用户名不能为空！");
			return;
		}
		
		//检测密码是否相同
		//密码不能为空，密码规则
		if(pwd !== con){
			alert("两次输入的密码不相同，请重试!");
			return;
		}
		
		//检测一下用户是否已经存在
		//假设：'"test1":123,"test2":"abc","test3",888'
		/*转为对象
		 * {
		 * 	"test1":123,
		 *  "test2":"abc",
		 *  "test3":888
		 * }
		 */
		
		//获取cookie中的用户信息
		var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
		
		//将字符串转为对象
		users = convertStrToObj(users);
		if(usn in users){ //判断usn属性是否在users对象中。
			alert("用户名已经被注册");
			return;
		}else{
			//注册成功，设置用户信息的cookie
			//test1 123  test2 abc  test3 888
			//"test1":123,"test2":"abc","test3":888设置cookie的value值
			//registerUsers 设置cookie的name(key)值
			//将用户添加到已注册用户列表对象中
			users[usn] = pwd;
			//假设users[李涛] = 123
			
			
			//将用户信息对象转化回字符串，以便于设置cookie
			userStr = JSON.stringify(users);
			//设置用户信息cookie
			$.cookie("registerUsers",userStr,{expires:7,path:"/"});
//			console.log(decodeURIComponent(document.cookie))
			alert("注册成功！");
		}
	});
	
	//给增登录按钮添加点击事件
	$("#goLogin").click(function(){
		//转到登录页面
		location.href = "login.html";
	});
})
//将字符串转为对象
function convertStrToObj(str){
	if(!str){
		return {};
	}
	return JSON.parse(str);
}

/**
 * idcode 1.0 - validate user.
 * Version 1.0
 * @requires jQuery v1.2
 * author ehong[idehong@gmail.com]
 **/

/**
 * @example: $.idcode.setCode();	
 * @desc: Make a validate code append to the element that id is idcode.
 *
 * @example $.idcode.validateCode();	
 * @desc return true if user input value equal idcode. 
 **/
 
(function($){
	var settings = {
			e	 		: 'idcode',
			codeType 	: { name : 'follow', len: 5},//len是修改验证码长度的
			codeTip		: '换个验证码?',
			inputID		: 'Txtidcode'//验证元素的ID
		};
	
	var _set = {
		storeLable  : 'codeval',
		store		: '#ehong-code-input',
		codeval		: '#ehong-code'
	}
	$.idcode = {
		getCode:function(option){
			_commSetting(option);
			return _storeData(_set.storeLable, null);
		},
		setCode:function(option){
			_commSetting(option);
			_setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);
			
		},
		validateCode:function(option){
			_commSetting(option);
			var inputV;
			if(settings.inputID){
				inputV=$('#' + settings.inputID).val();
			}else{
				inputV=$(_set.store).val();
			}	
			if(inputV.toUpperCase() == _storeData(_set.storeLable, null).toUpperCase()){//修改的不区分大小写
				return true;
			}else{
				_setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);				
				return false;
			}
		}
	};
	
	function _commSetting(option){
		$.extend(settings, option);		
	}
	
	function _storeData(dataLabel, data){
		var store = $(_set.codeval).get(0);			
		if(data){
			$.data(store, dataLabel, data);			
		}else{
			return $.data(store, dataLabel);			
		}
	}
	
	function _setCodeStyle(eid, codeType, codeLength){
		var codeObj = _createCode(settings.codeType.name, settings.codeType.len);		
		var randNum = Math.floor(Math.random()*6);
		var htmlCode=''
		if(!settings.inputID){
			htmlCode='<span><input id="ehong-code-input" type="text" maxlength="4" /></span>';
		}
		htmlCode+='<div id="ehong-code" class="ehong-idcode-val ehong-idcode-val';
		htmlCode+=String(randNum);
		htmlCode+='" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false" onclick="$.idcode.setCode()">' + _setStyle(codeObj) + '</div>' + '<span id="ehong-code-tip-ck" class="ehong-code-val-tip" onclick="$.idcode.setCode()">'+ settings.codeTip +'</span>';
		$(eid).html(htmlCode);
		_storeData(_set.storeLable, codeObj);		
	}
	
	function _setStyle(codeObj){
		var fnCodeObj = new Array();
		var col = new Array('#BF0C43', '#E69A2A','#707F02','#18975F','#BC3087','#73C841','#780320','#90719B','#1F72D8','#D6A03C','#6B486E','#243F5F','#16BDB5');
		var charIndex;
	   	for(var i=0;i<codeObj.length;i++){		
			charIndex = Math.floor(Math.random()*col.length);
			fnCodeObj.push('<font color="' + col[charIndex] + '">' + codeObj.charAt(i) + '</font>');
		}
		return fnCodeObj.join('');		
	}
	function _createCode(codeType, codeLength){
	   var codeObj;
	   if(codeType=='follow'){
		   codeObj = _createCodeFollow(codeLength);
	   }else if(codeType=='calc'){
		   codeObj = _createCodeCalc(codeLength);
	   }else{
		   codeObj="";
	   }
	   return codeObj;   
	 }
	 
	 function _createCodeCalc(codeLength){
	   var code1, code2, codeResult;
	   var selectChar = new Array('0','1','2','3','4','5','6','7','8','9');	
	   var charIndex;
	   for(var i=0;i<codeLength;i++){		
		   charIndex = Math.floor(Math.random()*selectChar.length);
		   code1 +=selectChar[charIndex];
		   
		   charIndex = Math.floor(Math.random()*selectChar.length);
		   code2 +=selectChar[charIndex];		   
	   }
	   return [parseInt(code1), parseInt(code2) , parseInt(code1) + parseInt(code2)] ;
	 }
	 
	 function _createCodeFollow(codeLength){
	   var code = "";
	   var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		
	   for(var i=0;i<codeLength;i++){		
		   var charIndex = Math.floor(Math.random()*selectChar.length);
		   if(charIndex % 2 == 0){
			   code+=selectChar[charIndex].toLowerCase();
		   }else{
			   code +=selectChar[charIndex];
		   }	   
	   }
	   return code;
	 }
   
})(jQuery);


