/*字符处理函数*/

//打印输入字符
function Write(str)
{
	document.write(str);
}

//去除所有空格，依赖函数NotNull()
function Trim(str)
{ 
	if(NotNull(str))
		return str.replace(/(^\s*)|(\s*$)/g, ""); 
	else
		return str;
}

//获取成对标识符中的内容，逗号分隔，带原标识符
function GetPairCon(htmlstr,sign_l,sign_r)
{
	var msg_out="";
	eval("msg_out=htmlstr.match(/\\"+sign_l+"(.+?)\\"+sign_r+"/g)");
	if(msg_out!=""&&msg_out!=null)
		msg_out=msg_out.toString();
	return msg_out;
}

//替换所有内容
function RepAllStr(restr,fromstr,tostr){
	var msg_out;
	eval("msg_out=restr.replace(/"+fromstr+"/g,tostr);");
	//eval("msg_out=restr.replace(/("+fromstr+"){2,}/g,tostr);");
	return msg_out;
}

//获取指定子元素内容，输出竖线分隔的字符串，依赖函数jquery
//eg: FormatElCon("id_1","li")
function FormatElCon(fun_id,fun_el)
{
	var msg_out="",json = {},$childDiv;
	$childDiv = $("#"+fun_id).find(fun_el);
	$childDiv.each(function(a){
		var key = $(this).html();
		json[a] = key;
	});
	for(var key in json){
		if(msg_out!="")
			msg_out+="|";
		msg_out+=json[key];
	}
	return msg_out;
}

//获取指定子元素内容，输出竖线分隔的字符串，无重复，按长度升序输出，依赖函数jquery
//eg: FormatElCon("id_1","li")
function FormatElConNoRep(fun_id,fun_el)
{
	var msg_out="",json = {},$childDiv;
	$childDiv = $("#"+fun_id).find(fun_el);
	$childDiv.each(function(){
		var key = $(this).html();
		json[key] = key;
	});
	for(var key in json){
		if(msg_out!="")
			msg_out+="|";
		msg_out+=key;
	}
	return msg_out;
}

//清除指定标签内的格式
//sign:为空时去除所有样式为纯文本;html-保留空格、换行等;style-去除直接样式
//依赖函数GetID、RemoveHtml、RemoveStyle、RemoveHtmlAll
function ClearHtml(divid,sign)
{
	var a;
	a=GetID(divid).innerHTML;
	if(sign=="html")
		a=RemoveHtml(a);
	else if(sign=="style")
		a=RemoveStyle(a);
	else
		a=RemoveHtmlAll(a);
		
	GetID(divid).innerHTML=a;
}

//去除指定容器中内容的直接定义样式
function RemoveStyle(htmlstr)
{
	var b;
	b = htmlstr; 
	b=b.replace(/<\/?font[^>]*>/gi,""); 			  //去掉font标签
	b=b.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi,"");//去掉style标签
	b=b.replace(/size\s*=(['\"\s]?)[^'\"]*?\1/gi,""); //去掉size标签
	b=b.replace(/face\s*=(['\"\s]?)[^'\"]*?\1/gi,""); //去掉face标签
	b=b.replace(/lang\s*=(['\"\s]?)[^'\"]*?\1/gi,""); //去掉lang标签
	return b;
}

//去除指容器中内容所有样式，转化为纯文本
function RemoveHtmlAll(htmlstr)
{
	var div=document.createElement("div");
	var a;
	div.innerHTML=htmlstr;
	return div.innerText;
}

//去除段落中内容的格式，保留空格、换行符
function RemoveHtml(htmlstr) {
	html=htmlstr;
	html=html.replace(/<\/?span[^>]*>/gi,""); //去掉span标签
	html=html.replace(/<\/?strong[^>]*>/gi,""); //去掉strong标签
	html=html.replace(/<\/?font[^>]*>/gi,""); //去掉font标签
	html=html.replace(/<\/?img[^>]*>/gi,""); //去掉img标签
	html=html.replace(/<\/?a[^>]*>/gi,""); //去掉a标签
	
	html=html.replace(/<\/?p[^>]*>/gi,"<br>");
	html=html.replace(/<\/?div[^>]*>/gi,"<br>");
	
	html=ClearRepOrNull(html);
	return html;
}
//去除多次重复标签或空标签
function ClearRepHtml(divid)
{
	var html=GetID(divid).innerHTML;
	if(html!=null&&html!="")
	{
		html=ClearRepOrNull(html);
		GetID(divid).innerHTML=html;
	}
}
//去除重复或空值元素
function ClearRepOrNull(htmlstr)
{
	html="";
	if(htmlstr!=null && htmlstr!="")
	{
		html=htmlstr;
		html=RepAllStr(html,"<div> <\\/div>","<br>");
		html=RepAllStr(html,"<div><\\/div>","<br>");
		html=RepAllStr(html,"<p> <\\/p>","<br>");
		html=RepAllStr(html,"<p><\\/p>","<br>");
		html=RepAllStr(html,"<b> <\\/b>","<br>");
		html=RepAllStr(html,"<b><\\/b>","<br>");
		html=RepAllStr(html,"<br\\/>","<br>");
		html=RepAllStr(html,"<br>&nbsp;","<br>");//替换br和空格
		html=RepAllStr(html,"<br> ","<br>");	//替换br和空格
		html=RepAllStr(html,"<br>\\t","<br>"); //br和替换制表符
		html=RepAllStr(html,"<br>\\r\\n","<br>");//替换br和回车
		html=RepAllStr(html,"<br>\\n","<br>");//替换br和回车
		html=RepAllStr(html,"<br> <br>","<br>");
		html=RepAllStr(html,"<br><br>","<br>");
		if(html.indexOf("<br><br>")>-1||html.indexOf("<br> <br>")>-1)
		{
			html=ClearRepOrNull(html);
		}
	}
	return html;
}
//清除表格外部样式，依附函数jquery
function ClearTableCss(IdStr)
{
	//alert("line132");
	var fun_id="#"+IdStr;
	$(fun_id+" table,tr,td,tbody").removeAttr("style class lang");
	$(fun_id+" table COLGROUP").remove();
	$(fun_id+" td span,td p").removeAttr("style lang class");
}

//去除style中的特殊属性
function ClearStyle(IdStr)
{
	var fun_id="#"+IdStr;
	$(fun_id+" span,p").css({"line-height":"","mso-line-height-rule":""});
}

//解码C#中System.Web.HttpUtility.UrlEncode()加密内容
function DecodeUrlStr(fun_str)
{
	var msg_out="";
	msg_out=decodeURIComponent(fun_str.replace(/\+/g, '%20'));
	return msg_out;
}

//解码
function DecodeStr(fun_str)
{
	var msg_out="";
	msg_out=decodeURI(fun_str.replace(/\+/g, '%20'));
	//msg_out=decodeURIComponent(fun_str.replace(/\+/g, '%20'));
	return msg_out;
}

//随机生成4位的随机数
function RndNum(n){
 var rnd="";
 for(var i=0;i<n;i++)
   rnd+=Math.floor(Math.random()*10);
 return rnd;
}

//批量重设各类元素，路径设置为根目录，依附函数jquery
function reset_root()
{
	$("a,link").each(function(){
		var str_hrf=$(this).attr("href");
		if(str_hrf!="")
		{
			if(str_hrf.indexOf("/")==0||str_hrf.indexOf("http")==0){}
			else
			{
				var path_new="";
				path_new="/"+str_hrf;
				path_new=path_new.replace("//","/");
				$(this).attr("href",path_new);
			}
		}
	});
	$("img,embed").each(function(){
		var str_src=$(this).attr("src");
		if(str_src!="")
		{
			if(str_src.indexOf("/")==0||str_src.indexOf("http")==0){}
			else
			{
				var path_new="";
				path_new="/"+str_src;
				path_new=path_new.replace("//","/");
				$(this).attr("src",path_new);
			}
		}
	});
	$("script").each(function(){
		var str_src=$(this).attr("src");
		if(str_src!="")
		{
			if(str_src.indexOf("/")==0||str_src.indexOf("http")==0){}
			else
			{
				var path_new="";
				path_new="/"+str_src;
				path_new=path_new.replace("//","/");
				$(this).attr("src",path_new);
			}
		}
	});
}
