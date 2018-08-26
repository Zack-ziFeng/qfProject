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
			let str = cookie.get('user');
			if (str !== '') {
				let obj = JSON.parse(str);
				$(this.sign).html(`<li><a href=#>${obj.username}</a></li><li class="out"><a href=#>退出</a></li>`)
			}
		},
		out(){},
		init(){
			this.login();
			setInterval(()=>{
				this.carNum();
			}, 500);
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