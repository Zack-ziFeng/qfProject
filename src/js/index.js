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
		banner: '.banner',
		btn: '.banner .btn',
		idx: 0,
		timer: null,
		moveLi(){
			$(this.banner).children('ul').children(`li:not(:eq(${this.idx}))`).animate({opacity: '0'}, 2300);
			$(this.banner).children('ul').children(`li:eq(${this.idx})`).animate({opacity: '1'}, 2300);
		},	
		auto(){
			this.timer = setInterval(()=>{
				let num = this.idx;
				num += 1;
				let length = this.len;
				if (num >= length) {
					num = 0;
				}
				this.idx = num;
				this.moveLi();
				this.dotColor();
			}, 2300)
		},
		dotColor(){
			$(this.btn).children('span').removeClass('active');
			$(this.btn).children(`span:eq(${this.idx})`).addClass('active');
		},
		stop(){
			$(this.banner).mouseover(()=>{
				clearInterval(this.timer);
			});
			$(this.banner).mouseout(()=>{
				this.auto();
			});
		},
		dotMouse(){
			$(this.btn).mouseover((e)=>{
				if (e.target.tagName === 'SPAN') {
					this.idx = $(e.target).attr('idx');
					this.dotColor();
					this.moveLi();
				}
			});
		},
		init(){
			this.len = $(this.banner).children('ul').children('li').length - 1;
			this.auto();
			this.stop();
			this.dotMouse();
		}
	}

	page.init();
});