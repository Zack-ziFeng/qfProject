jQuery(function($) {
	$('#header').load('../html/header.html #header');
	$('#nav').load('../html/header.html #nav');
	$('#aside').load('../html/header.html .aside');
	$('#footer').load('../html/header.html #footer');
	$('.nav_list').css('display', 'block');
});