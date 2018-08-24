jQuery(function($) {
	$('#header').load('../html/commonHTML.html header');
	$('#nav').load('../html/commonHTML.html nav', function(){
		$('.nav_block>li:first').mouseover(function(){
			$('.nav_list').css('display', 'block');
		}).mouseout(function(){
			$('.nav_list').css('display', 'none');
		});
		$('.nav_list li').mouseover(function(){
			$('.nav_list').css('display', 'block');
		}).mouseout(function(){
			$('.nav_list').css('display', 'none');
		});
	});
	$('#aside').load('../html/commonHTML.html .aside');
	$('#footer').load('../html/commonHTML.html footer');

	let page = {
		
	}
});