/*检测函数*/

//判断字串是否为空
function NotNull(str)
{
	if(str==""||str==null)
		return false;
	try
	{
		str.replace(/(^\s*)|(\s*$)/g, "");
		return true;
	}
	catch(e)
	{
		//alert(e.description);
		return false;
	}
}

//检测字串中是否包含指定的内容 forbiddenArray =['xx','颜色'];
function chk_InStr(str,forbiddenArray){
	var re = '';
	
	for(var i=0;i<forbiddenArray.length;i++){
		if(i==forbiddenArray.length-1)
			re+=forbiddenArray[i];
		else
			re+=forbiddenArray[i]+"|";
	}
	//定义正则表示式对象
	//利用RegExp可以动态生成正则表示式
	var pattern = new RegExp(re,"g");
	if(pattern.test(str)){
		return false;
	}else{
		return true;
	}
}	

//检测用户输入是否包含敏感字段，依赖函数chk_InStr
function ChkSafe(zdstr)
{
	//例：zdstr="zd1,zd2,zd3";
	var dict,zdAry,msg_out=true;
	dict=["'","\"","create","drop","select","exec","insert","update","delete","script","set","or","and","count"];
	if(zdstr!=null){
		zdAry=zdstr.split(",");
		for(var i=0;i<zdAry.length;i++){
			var tmp_val="";
			tmp_val= document.getElementById(zdAry[i]).value;
			//alert(tmp_val);
			msg_out=chk_InStr(tmp_val,dict);
			if(msg_out==false){
				alert("填写的内容中包含非法字符，请不要包含以下词汇(竖线分隔)：\n'｜\"｜create｜drop｜select｜exec｜insert｜update｜delete｜script｜set｜or｜and｜count");
				return false;
			}
		}
	}
	return true;
}

//检测IE浏览器版本是否过低，需调用,依赖函数 body_addcon
function ie_chklow() { 
	var b_name,b_version,version,trim_version,id_float;
	var is_low=false;
	b_name = navigator.appName; 
	b_version = navigator.appVersion; 
	version = b_version.split(";"); 
	trim_version = version[1]; 
	if(trim_version!=null)
		trim_version = trim_version.replace(/[ ]/g, ""); 
	
	id_float=GetID("id_float_r_b");
	if (b_name == "Microsoft Internet Explorer" && id_float!=null) { 
		//ie9以下为版本过低
		if (trim_version == "MSIE6.0") { 
			
			window.onscroll = function(){
				id_float.style.top = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop) - 110 +'px' 
			}
			is_low=true;
		}
		else if(trim_version == "MSIE8.0" ||trim_version == "MSIE7.0")
		{
			is_low=true;
		}
		if(is_low==true)
		{
			id_float.innerHTML="<p>温馨提示：</p><div>您当前使用的IE浏览器版本过低，可能无法完美显示本站内容，请升级到IE9以上！</div>";
			id_float.style.display="block";
		}
	}
}

//判断当前是否微信浏览器
function isWeiXin(){ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	}
}

/*是否带有小数*/
function isDecimal(strValue )  {  
   var  objRegExp= /^\d+\.\d+$/;
   return  objRegExp.test(strValue);  
}  

/*校验是否中文名称组成 */
function ischina(str) {
    var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验是否全由8位数字组成 */
function isStudentNo(str) {
    var reg=/^[0-9]{8}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验电话码格式 */
function isTelCode(str) {
    var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}

/*校验邮件地址是否合法 */
function IsEmail(str) {
    var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
}

/*是否数字*/
function isNum(val){
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}