/*对象获取操作函数*/

/*base function----------------------------------------------------------------------------*/
//获取页面中的ID，返回对象
function GetID(idstr){	return window.document.getElementById(idstr);}
//获取父页面中的ID，返回对象
function GetFID(idstr){return window.parent.document.getElementById(idstr);}
//获取页面中的指定标签数组，返回对象数组
function GetEleAryAll(EleName){return document.getElementsByTagName(EleName);}
//获取指定ID中的指定标签数组，返回对象数组
function GetEleAry(idstr,EleName){return document.getElementById(idstr).getElementsByTagName(EleName);}
//获取iframe,需设置iframe的Name值，返回对象
function GetIframe(namestr){return window.frames[namestr];}
//获取iframe,需设置iframe的Name值，返回字串
function GetIframeSrc(namestr){return GetIframe(namestr).location.href;}
/*base function----------------------------------------------------------------------------*/


//是否执行操作，例：onSubmit="return Sure(msg)"
function Sure(msg)
{
	if(confirm(msg))
	{return true;}
	else
	{return false;}
}

//跳转菜单 JumpMenu(this,'_blank')
function JumpMenu(SelID,target)
{
 if(SelID.options[SelID.selectedIndex].value!="")
 {
	 if(target=="_blank")
	 {
	  window.open(SelID.options[SelID.selectedIndex].value);
	 }
	 else
	 {
	  window.location=SelID.options[SelID.selectedIndex].value;
	 }
 }
}

//给Div、p、span等指定容器标签赋值,sign=parent,父页面标签，依赖函数GetFID()
function DivText(DivID,TextStr,sign)
{
	if(sign=="parent")
		GetFID(DivID).innerHTML=TextStr;
	else
		GetID(DivID).innerHTML=TextStr;
}

//复制标签中的内容到另一标签，依赖函数GetID
function CopyConToDiv(zd_from,zd_to)
{
	var id_from,id_to;
	id_from=GetID(zd_from);
	id_to=GetID(zd_to);
	
	if(id_from!=null &&id_to!=null)
	{
		id_to.innerHTML=id_from.innerHTML;
	}
}

//复制标签中的内容，追加到父标签，依赖函数
function CopyConToFDiv(zd_from,zd_to)
{
	var id_from,id_to;
	id_from=GetID(zd_from);
	id_to=GetFID(zd_to);
	
	if(id_from!=null &&id_to!=null)
	{
		con_from=id_from.innerHTML;
		con_from=con_from.replace("<li>暂无相关内容！</li>","");
		con_from=con_from.replace(" ","");
		
		if(con_from!=null && con_from!="")
			id_to.innerHTML=id_to.innerHTML+id_from.innerHTML;
	}
}

//复制标签中的内容，追加到父标签，依赖函数,GetID,GetFID
function CopyLiToFDiv(zd_from,zd_to,btn_more)
{
	var id_from,id_to,cnt_li_from,cnt_li_to,isCopy;
	
	id_from=GetID(zd_from);
	id_to=GetFID(zd_to);
	isCopy=false;
	
	cnt_li_from=$("#"+zd_from+">li").size();
	cnt_li_to=$('#'+zd_to, window.parent.document).find("li").size();
	if(id_from!=null &&id_to!=null)
	{
		con_from=id_from.innerHTML;
		con_from=con_from.replace("<li>暂无相关内容！</li>","");
		con_from=con_from.replace(" ","");
		if(cnt_li_from==cnt_li_to){}
		else
		{
			if(con_from!=null && con_from!="")
			{
				id_to.innerHTML=id_from.innerHTML;
				isCopy=true;
			}
		}
	}
	return isCopy;
}

//手机版，加载更多，适用ul-li框架，zd_name=ulid，btn_name=更多按钮id
//依赖函数 GetFID,CopyLiToFDiv,jquery
function fun_viewmore(zd_name,btn_name)
{
	var isCopy=false;
	isCopy=CopyLiToFDiv(zd_name,zd_name);
	
	if(isCopy){}
	else
	{
		$('#'+btn_name, window.parent.document).hide("slow");
		alert("没有更多了!");
	}
	GetFID(btn_name).innerHTML="点击查看更多>>";
}

//是否显示more按钮,适用于ul-li内容，依赖函数jquery
function show_moreBtn(id_chkul,id_btn,cnt_min,cnt_max)
{
	var cnt_li=0,$obj_btn;
	
	cnt_li=$("#"+id_chkul).find("li").size();
	$obj_btn=$('#'+id_btn, window.parent.document);
	//alert(cnt_li);
	if(cnt_li>=cnt_min && cnt_li<cnt_max)
	{
		$obj_btn.fadeIn();
	}
	else
		$obj_btn.hide();
}

//处理容器，删除子项中重复的元素项，依赖函数jquery,DelRepLi
//DelChildRepEl("id_1","li");
function DelChildRepEl(fun_id,fun_el)
{
	var $fun_obj=$("#"+fun_id);
	var fun_str=$fun_obj.html();
	fun_str=DelRepEl(fun_str,fun_el);
	$fun_obj.html(fun_str);
}

//处理字符串，删除重复的元素项，依赖函数jquery
//eg:DelRepEl("<li>11</li><li>11</li>","li")
function DelRepEl(fun_str,fun_el)
{
	var json = {},msg_out="",$div,$childDiv;
	
	$("body").append("<div id='div_tmp01'></div>");
	$div=$("#div_tmp01");
	$div.html(fun_str);
	$childDiv = $div.find(fun_el);
	$childDiv.each(function(){
		var key = $(this).html();
		json[key] = key;
	});
	$div.empty();
	for(var key in json){
		msg_out+=("<"+fun_el+">"+key+"</"+fun_el+">");
		//$div.append("<li>"+key+"</li>");
	}
	$div.remove();
	return msg_out;
}

//向目标元素后插入一个标签 insertAfter("div","2222222",this)
function InsertEleAfter(ElementType,con,targetElement)
{
   //alert(con);
   var parent = targetElement.parentNode;
   //alert(parent.id);
   var obj_newElement=document.createElement(ElementType);
   obj_newElement.innerHTML=con;
   if ( parent.lastChild == targetElement )
   {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild( obj_newElement );
   }
   else
   {
        //如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
        parent.insertBefore( obj_newElement, targetElement.nextSibling );
   }
}

//向body中添加元素，top-最前，end-最后
function body_addcon(fun_con,fun_sign)
{
	var div=document.createElement("div");
	div.innerText = fun_con;
	document.body.appendChild(div);
	
	if(fun_sign=="top")
		document.body.insertBefore(div, document.body.firstElementChild);	//插入到最前面
	else
		document.body.insertBefore(div, document.body.lastElementChild);	//插入到最后面
}

//iframe动态加载页面代码
function LoadIframe(url)
{
	try{  
   		var iframe = document.createElement('<iframe name="ifr"></iframe>');  
  	}catch(e){ 
    	var iframe = document.createElement('iframe');  
    	iframe.name = 'ifr';  
 	}
	iframe.style.display="none";
	iframe.src=url;
	
	document.body.appendChild(iframe);
}

//延迟载入iframe，地址需设置在longDesc属性，依存函数jquery
function LogIfrs()
{
	$(function(){	
		setTimeout(function(){
			$("iframe").each(function(){
				ifrm=this;
				if(ifrm.longDesc!=null&&ifrm.longDesc!="")
					ifrm.src=ifrm.longDesc;
			});
		},1);  //延迟0秒
	});
}

//加入收藏
function AddFavorite(sURL, sTitle) {
	sURL = encodeURI(sURL); 
	try{   
		window.external.addFavorite(sURL, sTitle);   
	}catch(e) {   
		try{   
			window.sidebar.addPanel(sTitle, sURL, "");   
		}catch (e) {   
			alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
		}   
	}
}
//设为首页
function SetHome(url){
	if (document.all) {
		document.body.style.behavior='url(#default#homepage)';document.body.setHomePage(url);
	}else{
		alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
	}
}

//显示Email提示，调用时用#代替@符号
function ShowEmail(fun_msg)
{
	if(fun_msg!="")
	{
		//fun_msg="111";
		fun_msg=RepAllStr(fun_msg,"#","@");
		alert(fun_msg);
	}
}

//窗口代码，依赖函数jquery，依赖样式MsgBox及子样式
function WinCode(fun_tit,fun_body)
{
	var str="";
	if(fun_tit!=null){}
	else
		fun_tit="";
	if(fun_body!=null){}
	else
		fun_body="";
	str+='<div id="id_Win" class="MsgBox">';
	str+='  <div class="close"><img src="/inc_fz/Images/Close.png" onclick="CloseWin(\'id_Win\');" width="15"/></div>';
	str+='	<h3>'+fun_tit+'</h3>';
	str+='	<div class="con">'+fun_body+'</div>';
	str+='</div>';
	$(str).appendTo("body");
}

//打开窗口，依赖函数WinCode，jquery，依赖样式sys_mask及子样式
function OpenWin(fun_con,fun_tit,win_width){
	var div_obj,posLeft,posTop;
	
	WinCode(fun_tit,fun_con);
	div_obj = $("#id_Win");
	if(win_width!="")
		div_obj.css("width",win_width);
	posLeft = ($(window).width() - div_obj.width()) / 2;
	posTop = ($(window).height() - div_obj.height()) / 2;
	
	$("<div id='sys_mask'></div>").addClass("sys_mask").appendTo("body").fadeIn();
	div_obj.css({ "top": posTop, "left": posLeft }).fadeIn();
	$("#sys_mask").click(function(){{CloseWin()}});
}

//关闭窗口，依赖函数WinCode
function CloseWin() {
	$("#id_Win").fadeOut();
	$("#sys_mask").fadeOut(function(){this.remove();$("#id_Win").remove();});
}

//快速调用js文件
function CallJsFile(js_file)
{
	var id="jsfile_"+RndNum(5);
	//document.write("<img id='"+id+"' src='/js_fz/images/loading.gif' width='10' border='0'/>");
	document.write("<scr"+"ipt src='"+js_file+"' id=\""+id+"\"></sc"+"ript>");
	/*
	setTimeout(function(){
		//document.getElementById(id).src="";
		//alert(document.getElementById(id).id)
		document.getElementById(id).src=js_file;
		//alert(id+"_ok");
		//document.write("<scr"+"ipt src=\""+js_file+"\"></sc"+"ript>");
	},3000);//延时3秒
	*/
}

//周期性执行函数(默认1秒内执行1次，可设置频率和次数)，eg：EvalFun("函数名称",执行频率（秒一次）,执行次数)，依赖子函数：EvalFun_C
function EvalFun(FunName,fun_timer,cnt_down)
{
	cnt_i=1;
	if(cnt_down!=null){}
	else
		cnt_down=1;
	if(fun_timer!=null){}
	else
		fun_timer=1;
	fun_obj = setInterval("EvalFun_C("+FunName+","+cnt_down+")",fun_timer*1000);
	return fun_obj;
}
//间隔执行函数——内层函数
function EvalFun_C(fun_name,cnt_down)
{
	if(cnt_i<cnt_down)
	{
		eval(fun_name);
		cnt_i++;
	}
	else
	{clearInterval(fun_obj);}
}
