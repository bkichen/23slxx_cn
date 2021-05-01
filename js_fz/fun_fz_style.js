/*样式操作函数*/

//
function ShowPic_Style(ShowPicID,ShowPicSrc,HidPicStrID,HidPicStrSrc,ShowStyle,HidStyleStr,HrefID,HrefAddr)
{
 var str_PicID=HidPicStrID.split(",");
 var str_PicSrc=HidPicStrSrc.split(",");
 var str_Style=HidStyleStr.split(",");
 var tmp_1;
 
 ShowPicID.src=ShowPicSrc;
 ShowStyle.style.display='block';
 
 //分别取得ID地址和Src地址，并进行赋值
 for(a=0;a<str_PicID.length;a++)
 {
  for(b=0;b<str_PicSrc.length;b++)
  {
   tmp_1=str_PicID[a]+".src='"+str_PicSrc[b]+"'";
   eval(tmp_1);
   a=a+1;
  }
 }
 //隐藏相关数据
 for(c=0;c<str_Style.length;c++)
 {
	 tmp=str_Style[c]+".style.display='none';"
	 eval(tmp);
 }
 
 //改变超链接
 HrefID.href=HrefAddr;
}

//逆转display
function ShowID(ID)
{
 if(ID.style.display=='none')
 {
  ID.style.display='block'; 
 }
 else
 {
  ID.style.display='none';
 }
}

//点击切换效果,序号从1开始编号 onClick="changeDis(3,'line1','line');"
function changeDis(sum,showID,IDName)
{
 var str,i,getID;
 for(i=1;i<sum+1;i++){
 getID=document.getElementById(IDName+i);
 getID.style.display='none';
 
 }
 var mainID=document.getElementById(showID);
 mainID.style.display='block';
}

//点击切换CSS,序号从1开始编号 onClick="ChangeCss(3,'line1','line','css01','css02','css03');"
function ChangeCss(sum,showID,IDName,Css_main,Css_else,Css_First)
{
 var str,i;
 for(i=1;i<sum+1;i++){
 getID=document.getElementById(IDName+i);
 getID.className=Css_else;
 }
 var mainID=document.getElementById(showID);
 mainID.className=Css_main;
 if(showID==IDName+"1")
 {
 mainID.className=Css_First;
 }
}

//一组序列中只显示选中序列 Show_One('id_1','id_',5)
function Show_One(id,sign,id_all)
{
	for(i=1;i<id_all+1;i++)
	{
		document.getElementById(sign+i).style.display='none';
	}
	document.getElementById(sign+id).style.display='block';
}

//隐藏一个层,显示一个层,可以实现在同一页面的翻页效果
function changePage(HidPage,ShowPage)
{
 eval(HidPage+".style.display='none';");
 eval(ShowPage+".style.display='';");
}


