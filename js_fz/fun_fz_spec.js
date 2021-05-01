/*特定用途的函数*/

//全站新闻搜索
function Search_News(zd_keyword,zd_bigclass){
	var SelID,val_keyword,val_bigclass,qrystr="";
	SelID=document.getElementById(zd_bigclass);
	if(zd_keyword!=""){
		val_keyword=document.getElementById(zd_keyword).value;
		qrystr+="KeyWord="+val_keyword;
	}
	if(SelID!=null){
		val_bigclass=SelID.options[SelID.selectedIndex].value;
		qrystr+="&BigClass="+val_bigclass;
	}
	window.location="NewsList.aspx?"+qrystr;
}


//更改表单submit为搜索表单
function SearchNews(formID)
{
	var keyword=document.getElementById("KeyWord").value;
	if(keyword!="")
		formID.onsubmit=Search_News('KeyWord','');
}


//刷新验证码
function reashcode(){
	document.getElementById ("CodePic").src="/inc_fz/getrencode.aspx?temp="+Math.random();
	return false;
}

//时钟功能
function clock(id_clock)
{
    setInterval(function(){
        $("#"+id_clock).html("");
        var date=new Date();
        var month,dates,hours,min,seconds;
        month=(date.getMonth()+1);
        dates=date.getDate();
        hours=date.getHours();
        min=date.getMinutes();
        seconds=date.getSeconds();
        if(month<10){
            month="0"+month;
        }
        if(dates<10){
            dates="0"+dates;
        }
        if(hours<10){
            hours="0"+hours;
        }
        if(min<10){
            min="0"+min;
        }
        if(seconds<10){
            seconds="0"+seconds;
        }
        week=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        var clocks=date.getFullYear()+"年"+month+"月"+dates+"日"+hours+":"+min+":"+seconds+" "+week[date.getDay()];
        $("#"+id_clock).append(clocks);
    },1000)
}
//检测是否显示缩略图，若显示则自动隐藏内容中的同名图片
function news_chkfstpic()
{
	var obj_fst,obj_fstimg,obj_con,fst_hide=false;
	obj_fst=$(".info_fst_pic").eq(0);
	obj_fstimg=$(".info_fst_pic a img,.info_fst_pic img").eq(0);
	obj_con=$("#ContentID img");
	
	if(obj_fst.length>0 && obj_fstimg.length>0)
	{
		if(obj_fstimg.attr("src").indexOf("None.jpg")>-1)
		{
			obj_fst.hide();
			fst_hide=true;
		}
		if(obj_fst.css('display')=="none")
			fst_hide=true;
	}
	if(obj_fstimg.length>0 && fst_hide==false)
	{
		var src_fst=obj_fstimg.attr("src");
		obj_con.each(function(){
			var src_this=$(this).attr("src");
			if(src_fst==src_this)
			{
				$(this).remove();
				//console.log("line81：removed");
				return false;
			}
		});
	}

}
