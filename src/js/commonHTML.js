require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1',
		'cookie':'cookie'
	},
	shim:{
		'commonHTML':['jquery', 'cookie']
	}
});

require(['jquery', 'cookie'], function($, cookie){
	let page = {
		sign: '.sign',
		shopCar: '.shopCar',
		carGoodsNum: '.carGoodsNum',
		goShopCar: '.goShopCar',
		nav_list: '.nav_list',
		out: '.out',
		carNum(){
			let str = cookie.get('car');
			if (str !== '') {
				let arr = JSON.parse(str);
				$(this.carGoodsNum).text(arr.length);
			}
		},
		close(){},
		login(){
			let username = cookie.get('user');
			if (username !== '') {
				$(this.sign).html(`<li><a href=#>${username}</a></li><li class="out"><a href=#>退出</a></li>`);
				this.out();
			}
		},
		out(){
			$(this.out).click(()=>{
				cookie.remove('user');
				this.login();
				window.location.reload();
			});
		},
		addType(){
			
		},
		init(){
			this.login();
			this.carNum();
			$('body').click(()=>{
				this.carNum();
			});
			$(this.goShopCar).click(()=>{
				location.href = '../html/shopCar.html';
			});
			$(this.shopCar).click(()=>{
				location.href = '../html/shopCar.html';
			});
			$(this.nav_list).click(()=>{
				location.href = '../html/goodsList.html';
			});
		}
	}

	page.init();
})