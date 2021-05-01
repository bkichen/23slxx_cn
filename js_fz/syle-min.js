$(function(){
		   $('#banner3').myscroll({
            time:4000,
            effect: 'fade'
            });
		   $('.tab2').tabChange({
					name: '.tab2',
					invoke: 0,
					behavior: '',
					effect:''
			});
		  $(".pub_list h3 p a:first-child").css("background","none"); 
	
	      $(".pub_list").find(".bigable").show();
	      $("#lit_qie h3 strong").on("mouseenter",function(){ 
			 $(this).parent().siblings(".tablea").hide();
			 $(this).parent().siblings(".bigable").show();
			 $(this).siblings("p").children().removeClass("hover");
		  });  
	        
		  $("#oranger a").on("mouseover",function(){ //给a标签添加事件  
			 $(this).parent().parent().siblings(".bigable").hide();
			 $(this).parent().parent().siblings(".tablea").show();
			 var index=$(this).index();  //获取当前a标签的个数  
			 $(this).parent().parent().next().find(".box").hide().eq(index).show(); //返回上一层，在下面查找css名为box隐藏，
			 $(this).addClass("hover").siblings().removeClass("hover"); //a标签显示，同辈元素隐藏  
		  });
	
	
	      $(".children li:last-child").css("border-bottom","none");  
	      $('#nav-menu .menu > li').hover(function(){
				$(this).find('.children').animate({ opacity:'show', height:'show' },200);
		  }, function() {
				$('.children').stop(true,true).hide();

		  });
	});
	        