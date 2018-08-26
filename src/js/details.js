require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1',
		'cookie':'cookie'
	}
});

require(['jquery', 'cookie'], function($, cookie){
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
		img: '.cg_left',
		nav: '.c_nav li:eq(1)',
		title: 'h2',
		price: '.cg_price .fl span',
		sell: '.sell li:eq(0) span',
		logo: '.goods_logo',
		collect: '.hot_collect',
		buy: '.hot_buy',
		hot: '.c2_left ul:eq(0)',
		self: '.cg_right li:eq(0)',
		buyBtn: '.buy',
		addCar: '.inShopCar',
		count: '.countNum',
		serve: '.serve li:eq(1) div',
		idx: location.search.slice(1),
		num: 0,
		//查找商品数据
		getData(){
			$.get('../api/details.php', `${location.search.slice(1)}`, (data)=>{
				this.datas = JSON.parse(data)[0];
				this.renderer(this.datas);
				this.countNum();
				this.addShopCar();
			});
		},
		//渲染页面
		renderer(data){
			this.inventory = data.inventory;
			$(this.nav).html(`<a href=#>${data.name}</a>`);
			$(this.title).text(`${data.name}`);
			$(this.price).html(`<span>￥ ${data.price}</span>`);
			$(this.sell).text(`${data.sell}瓶`);
			$(this.serve).html(`剩余<strong>${data.inventory}</strong>瓶`);

			if (data.self !== '1') {
				$(this.self).css('display', 'none');
				$('strong:eq(2)').text('中酒商家');
			} else {
				$(this.self).css('display', 'block');
				$('strong:eq(2)').text('中酒自营');
			}
			$(this.img + ' img').attr('src', `../img/lists/${data.imgurl}`);
		},
		//加入购物车
		addShopCar(){
			$(this.addCar).click(()=>{
				this.setCookie();
				$(this.count + ' input').val(0);
			});
			$(this.buyBtn).click(()=>{
				this.setCookie();
				this.num = 0;
				location.href='../html/shopCar.html';
			});
		},
		//发货终点
		sendGoods(){

		},
		//热门商品tab
		tabCut(){
			$(this.hot).mouseover((e)=>{
				$(this.hot + ' li').removeClass('active');
				$(e.target).addClass('active');
				if ($(e.target).text() === '热门销售') {
					$(this.buy).css('display', 'block');
					$(this.collect).css('display', 'none');
				} else if ($(e.target).text() === '热门关注') {
					$(this.buy).css('display', 'none');
					$(this.collect).css('display', 'block');
				}
			});
		},
		//图片切换
		imgCut(){
			$(this.img + ' .imgList li').mouseover((e)=>{
				$(this.img + ' .imgList li img').removeClass('act');
				$(e.target).addClass('act');
				$(this.img + ' .big').attr('src', $(e.target).attr('src'));
			});
		},
		//计算数量
		countNum(){
			$(this.count + ' .minu').click(()=>{
				if ($(this.count + ' input').val()*1 <= 0) {
					$(this.count + ' input').val(0);
				} else {
					$(this.count + ' input').val($(this.count + ' input').val() - 1);
				}
				this.num = $(this.count + ' input').val();
			});
			$(this.count + ' .add').click(()=>{
				if ($(this.count + ' input').val()*1 >= this.inventory) {
					$(this.count + ' input').val(this.inventory);
				} else {
					$(this.count + ' input').val($(this.count + ' input').val()*1 + 1);
				}
				this.num = $(this.count + ' input').val();
			});
		},
		//设置cookie
		setCookie(){
			let str = cookie.get('car');
			let id = this.idx.split('=')[1];
			if (str === '') {
				if (this.num !== 0) {
					let arr = [];
					let obj = {
						idx: id,
						num: this.num
					}
					arr.push(obj);
					document.cookie = 'car=' + JSON.stringify(arr);
				}
			} else {
				let arr = JSON.parse(cookie.get('car'));
				for (let i=0; i<arr.length; i++) {
					if (arr[i].idx === id) {
						arr[i].num = arr[i].num*1 + this.num*1;
						cookie.set('car', JSON.stringify(arr));
						return false;
					}
				}
				let obj = {
					idx: id,
					num: this.num
				}
				arr.push(obj);
				cookie.set('car', JSON.stringify(arr));
			}
		},
		init(){
			this.getData();
			this.imgCut();
			this.tabCut();
		}
	}

	page.init();
});