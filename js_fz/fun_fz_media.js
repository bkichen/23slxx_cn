/*媒体操作函数 图片、视频等*/

//自动等比例变换缩放图片
function  DrawImage(ImgD,ImgW,ImgH){  
//调用示例：onload="javascript:DrawImage(this,160,120);"
var  flag=false;  
  var  image=new  Image();  
  image.src=ImgD.src;  
     if(image.width>0  &&  image.height>0){  
       flag=true;  
       if(image.width/image.height>=  ImgW/ImgH){  
         if(image.width>ImgW){      
         ImgD.width=ImgW;  
         ImgD.height=(image.height*ImgW)/image.width;  
         }else{  
         ImgD.width=image.width;      
         ImgD.height=image.height;  
         }  
         ImgD.alt=image.width+"×"+image.height;  
         }  
       else{  
         if(image.height>ImgH){      
         ImgD.height=ImgH;  
         ImgD.width=(image.width*ImgH)/image.height;            
         }else{  
         ImgD.width=image.width;      
         ImgD.height=image.height;  
         }  
         ImgD.alt=image.width+"×"+image.height;  
         }  
       }  
}

//调整图片尺寸，根据图片最小高宽截取中间区域，根据父元素标签的尺寸调整，依赖函数 InsertEleAfter
function ImgSize(img)
{
	var img_width,img_height,bdObj,bdObj_width,bdObj_height,jud_height=false;
	//bdObj=GetID(border);
	bdObj= img.parentNode; //父元素尺寸
	InsertEleAfter("i","",img);	//插入<i></i>标签，垂直居中，需css样式支持
	
	img_width=img.width;	//图片原始尺寸
	img_height=img.height;	
	
	bdObj_width=bdObj.offsetWidth;	//父元素外框尺寸
	bdObj_height=bdObj.offsetHeight;
	
	//判断是否依据高度截取
	if(img_width>img_height)
	{
		img.style.height="100%";
		if(img.width>=bdObj_width)
			jud_height=true;
	}
	
	if(jud_height)
	{
		img.style.height="100%";
		move_top=0;
		need_move_top=false;
		
		if(img.height>img_height)	//防止过度放大高度
			img.style.height=img_height+"px";
		
		move=(img.offsetWidth-bdObj.offsetWidth);  //外框尺寸
		move=move/2;
		img.style.marginLeft="-"+move+"px";
	}
	else
	{
		img.style.width="100%";
		
		if(img.width>img_width)	//防止过度放大
			img.style.width=img_width+"px";
		
		move=(img.offsetHeight-bdObj.offsetHeight)/2;
		img.style.marginTop="-"+move+"px";
	}
	
	//垂直居中
	if(bdObj.offsetHeight>img.height&&bdObj.offsetWidth<img.width)
	{
		move_top=(bdObj.offsetHeight-img.height)/2;
		move_top=Math.round(move_top);
		img.style.marginTop=move_top+"px";
	}
	
	//img.onerror=ImgErr();
	//setTimeout(function(){img.onerror=ImgErr();},0);
}

//图片出错处理 onerror="ImgErr()"
function ImgErr()
{
	var img=event.srcElement; 
	img.src="/up_load_fz/up_load_fz/lost.jpg"; 
	img.onerror=null;
}

//IE6.0中png图片透明函数 使用方法：<img src="xyz.png" width="10" height="20" onload="fixPNG(this)">
function fixPNG(myImage_1) 
{
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])
	var myImage = new Image();
	myImage.src="images/but08.png"
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
    {
       var imgID = (myImage.id) ? "id='" + myImage.id + "' " : ""
    var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : ""
    var imgTitle = (myImage.title) ? 
               "title='" + myImage.title + "' " : "title='" + myImage.alt + "' "
    var imgStyle = "display:inline-block;" + myImage.style.cssText
	var strNewHTML = "<span " + imgID + imgClass + imgTitle
                  + " style=\"" + "width:" + myImage.width 
                  + "px; height:" + myImage.height 
                  + "px;" + imgStyle + ";"
                  + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                  + "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>"
    myImage.outerHTML = strNewHTML   
    }
}

//删除img标签style属性中的maxWidth属性
//targid=指定容器id，为空时包含整个页面。
//依赖函数DelImgMaxWidth、GetEleAry、NotNull
function DelImgAryMaxWidth(tagid)
{
	var img_ary;
	if(NotNull(tagid))
	{
		img_ary=GetEleAry(tagid,"img");
	}
	else
	{
		//alert("11");
		img_ary=GetEleAryAll("img");
	}
	if(img_ary.length>0)
	{
		for(i=0;i<img_ary.length;i++)
		{
			DelImgMaxWidth(img_ary[i]);
		}
	}
}

//删除指定标签style属性中的maxWidth属性
function DelImgMaxWidth(obj)
{
	//var obj=GetID(fun_id);
	if(obj!=null)
		obj.style.maxWidth="";
}

//*视频播放函数 依存函数：
function playVideo(DivID,src,auto,width,height)
{
	var re_scr=src.toLowerCase();
	if(re_scr.match("</iframe"))
	{
		//iframe代码播放，支持优酷等通用代码
		var obj_div,obj_ifr;
		obj_div=document.getElementById(DivID);
		obj_div.innerHTML=src;
		obj_ifr=$("#"+DivID+" iframe");
		obj_ifr.width(width);
		obj_ifr.height(height);
	}
	else if(re_scr.match("</embed>"))
	{
		//embed代码播放，支持优酷等html代码
		var obj_div,obj_ifr;
		obj_div=document.getElementById(DivID);
		obj_div.innerHTML=src;
		obj_ifr=$("#"+DivID+" embed");
		obj_ifr.width(width);
		obj_ifr.height(height);
	}
	else if(re_scr.match(".flv"))
	{flashPlay(DivID,src,auto,width,height);}
	else if(re_scr.match(".rm")||re_scr.match(".rmvb"))
	{mediaPlayer_realone(DivID,src,auto,width,height);}
	else if(re_scr.match(".wmv")||re_scr.match(".wma")||re_scr.match(".avi")||re_scr.match(".mp3")||re_scr.match(".swf")||re_scr.match(".mp4"))
	{mediaPlayer(DivID,src,auto,width,height);}
	else
	{document.getElementById(DivID).innerHTML="播放失败，不支持的文件格式";}
}

function flashPlay(DivID,src,auto,width,height)
{	
	//var s5 = new SWFObject("FlvPlayerV2009.swf","mediaplayer",width,height,"6");
	var s5 = new SWFObject("/js_fz/images/FlvPlayerV2009.swf","mediaplayer",width,height,"6");
	s5.addParam("allowfullscreen","true");
	s5.addVariable("width",width);
	s5.addVariable("height",height);
	s5.addParam("allowfullscreen","true");
	s5.addParam("transparent","true");
	s5.addParam("wmode","transparent");
	
	s5.addVariable("image","");
	s5.addVariable("file",src);
	s5.addVariable("backcolor","0x000000");
	s5.addVariable("frontcolor","0xE2F0FE");
	if(auto=="Y")
	{
	s5.addVariable("autostart","true");
	}
	s5.write(DivID);
	//document.write(s5);
}	
   
function mediaPlayer(DivID,src,auto,width,height)
{
	if(auto=="Y")
	{
	var str="<EMBED height="+height+" type=application/x-shockwave-flash width="+width+" src="+src+" console='Clip1' controls='IMAGEWINDOW,ControlPanel,StatusBar' autostart='true'></EMBED>";
	}
	else
	{
	var str="<EMBED height="+height+" type=application/x-shockwave-flash width="+width+" src="+src+" console='Clip1' controls='IMAGEWINDOW,ControlPanel,StatusBar' autostart='false'></EMBED>";
	}
	document.getElementById(DivID).innerHTML=str;
}

function mediaPlayer_realone(DivID,src,auto,width,height)
{
	if(auto=="Y")
	{
	var str="<OBJECT classid=clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA height="+height+" id=video1 width="+width+" VIEWASTEXT><param name=_ExtentX value=5503><param name=_ExtentY value=1588><param name=AUTOSTART value=-1><param name=SHUFFLE value=0><param name=PREFETCH value=0><param name=NOLABELS value=0><param name=SRC value="+src+"><param name=CONTROLS value=Imagewindow,StatusBar,ControlPanel><param name=CONSOLE value=RAPLAYER><param name=LOOP value=0><param name=NUMLOOP value=0><param name=CENTER value=0><param name=MAINTAINASPECT value=><param name=BACKGROUNDCOLOR value=#000000></OBJECT>";
	}
	else
	{
	var str="<OBJECT classid=clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA height="+height+" id=video1 width="+width+" VIEWASTEXT><param name=_ExtentX value=5503><param name=_ExtentY value=1588><param name=AUTOSTART value=0><param name=SHUFFLE value=0><param name=PREFETCH value=0><param name=NOLABELS value=0><param name=SRC value="+src+"><param name=CONTROLS value=Imagewindow,StatusBar,ControlPanel><param name=CONSOLE value=RAPLAYER><param name=LOOP value=0><param name=NUMLOOP value=0><param name=CENTER value=0><param name=MAINTAINASPECT value=><param name=BACKGROUNDCOLOR value=#000000></OBJECT>";
	}
	document.getElementById(DivID).innerHTML=str;
}

/*视频播放函数*/
