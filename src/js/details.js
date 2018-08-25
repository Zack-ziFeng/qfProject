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
		Img: '.cg_left',
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
		//查找商品数据
		getData(){
			$.get('../api/details.php', `${location.search.slice(1)}`, (data)=>{
				this.datas = JSON.parse(data)[0];
				this.renderer(this.datas);
			});
		},
		//渲染页面
		renderer(data){
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
			$(this.Img + ' img').attr('src', `../img/lists/${data.imgurl}`);
		},
		//加入购物车
		addShopCar(){},
		//发货终点
		sendGoods(){},
		//热门商品tab
		tabCut(){},
		//图片切换
		imgCut(){},
		init(){
			this.getData();
		}
	}

	page.init();
});