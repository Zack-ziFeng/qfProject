require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1',
		'cookie':'cookie'
	},
	shim:{
		'commonHTML':['jquery', 'cookie']
	}
});

require(['jquery', 'cookie', 'commonHTML'], function($, cookie){
	//加载头部和尾部，侧边栏
	$('#header').load('../html/commonHTML.html header');
	$('#nav').load('../html/commonHTML.html nav');
	$('#aside').load('../html/commonHTML.html .aside');
	$('#footer').load('../html/commonHTML.html footer');
	$('.nav_list').css('display', 'block');

	let page = {
		
	}
});