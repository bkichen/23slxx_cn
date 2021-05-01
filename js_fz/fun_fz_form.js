/*字符处理函数*/

//赋值给指定输入框
function ToText(toID,val)
{
	toID=document.getElementById(toID);
	if(toID!=null && val!=null)
	{
		toID.value=val;
	}
}

//设置一个input的placeholder属性：idstr=需要设置的id字串，逗号分隔
function placeholder(id,pcolor) {
  var self,placeholder;
  self = document.getElementById(id);
  placeholder = self.getAttribute('placeholder') || '';     
  self.onfocus = function(){
	  if(self.value == placeholder){
		 self.value = '';
		 self.style.color = "";
	  }
  }
  self.onblur = function(){
	  if(self.value == ''){
		  self.value = placeholder;
		  self.style.color = pcolor;
	  }
  }
  self.value = placeholder;  
  self.style.color = pcolor;              
}

//反向选择////////////////////////////////////////////////////////
function CheckOthers(form)
{
	for (var i=0;i<form.elements.length;i++)
	{
		var e = form.elements[i];
//		if (e.name != 'chkall')
			if (e.checked==false)
			{
				e.checked = true;// form.chkall.checked;
			}
			else
			{
				e.checked = false;
			}
	}
}

//选择所有/////////////////////////////////////////////////
function CheckAll(form)
{
	for (var i=0;i<form.elements.length;i++)
	{
		var e = form.elements[i];
//		if (e.name != 'chkall')
			e.checked = true// form.chkall.checked;
	}
}

//取消所有选择/////////////////////////////////////////////////
function CheckAllNo(form)
{
	for (var i=0;i<form.elements.length;i++)
	{
		var e = form.elements[i];
//		if (e.name != 'chkall')
			e.checked = false// form.chkall.checked;
	}
}
