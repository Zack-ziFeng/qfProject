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
		brand: '.brand',
		origin: '.origin',
		odor: '.odor',
		kind: '.kind',
		apply: '.apply',
		alcohol: '.alcohol',
		sort: '.cb_sort .left',
		list: '.cb_goodslist',
		pages: '.pageInput',
		pageChoice: '.pageChoice',
		goodsNum: '#goodsNum',
		type: 'default',

		//获得数据库数据
		gainData(pageNum, qty){
			$.get('../api/goodsList.php', `page=${pageNum}&qty=${qty}&type=${this.type}`, (data)=>{
				let datas = JSON.parse(data);
				this.total = datas.total;
				this.nowPage = datas.page;
				this.qty = datas.qty;
				this.goods = datas.data;
				let $data = $(datas.data);
				$.each($data, function(i, item){
					new CreateItem(item);
				});
				$(this.goodsNum).text(this.total);
				this.createList();
				this.createPageNum();
			})
		},
		//生成列表
		createList(){
			let $list = $(this.list).children();
			let $child = $(this.list + ' li:eq(0)');
			let listHeight = $list.length%4;
			let $top = 0;
			let $left = 0;
			let idx = 0;
			if (listHeight !== 0) {
				listHeight = (Math.floor($list.length/4) + 1) * ($child.outerHeight() + 10);
			} else {
				listHeight = $list.length/4 * ($child.outerHeight() + 10);
			}
			$(this.list).height(listHeight);
			$.each($list, function(i, item){
				idx++;
				$item = $(item);
				$item.css({
					left: $left + idx*8 + 'px',
					top: $top + 'px'
				});
				if (idx%4 === 0) {
					$top += $item.outerHeight() + 10;
					$left = 0;
					idx = 0;
				} else {
					$left = idx*($item.outerWidth());
				}
			});
		},
		//排序
		listSort(){
			$(this.sort).click((e)=>{
				e = e || window.event;
				$e = $(e.target);
				switch($e.attr('value')) {
					case 'default':
						this.type = 'default';
						$('.cb_goodslist').html("");
						$(this.sort).children().removeClass('active');
						$(this.sort).children().eq(0).addClass('active');
						$(this.pageChoice).children('input').val(1);
						this.gainData(1, this.qty, this.type);
					break;
					case 'sell':
						this.type = 'sell';
						$('.cb_goodslist').html("");
						$(this.sort).children().removeClass('active');
						$(this.sort).children().eq(1).addClass('active');
						$(this.pageChoice).children('input').val(1);
						this.gainData(1, this.qty, this.type);
					break;
					case 'price':
						this.type = 'price';
						$('.cb_goodslist').html("");
						$(this.sort).children().removeClass('active');
						$(this.sort).children().eq(2).addClass('active');
						$(this.pageChoice).children('input').val(1);
						this.gainData(1, this.qty, this.type);
					break;
					case 'reg_time':
						this.type = 'reg_time';
						$('.cb_goodslist').html("");
						$(this.sort).children().removeClass('active');
						$(this.sort).children().eq(3).addClass('active');
						$(this.pageChoice).children('input').val(1);
						this.gainData(1, this.qty, this.type);
					break;
				}
			});
		},
		//筛选
		listSelect(){
			
		},
		//刷新页码
		createPageNum(){
			let sumPage = Math.floor(this.total/this.qty) + 1;
			$(this.pages).prev().text(`共有${sumPage}页`);
			$('.now').parent().html(`<span class="now">${this.nowPage}</span>/${sumPage}`);
			if (this.nowPage === '1') {
				$('.before').css('display', 'none')
			} else {
				$('.before').css('display', 'block');
			}
			if (this.nowPage*1 >= (sumPage - 5)) {
				$('.after').css('display', 'none');
			} else {
				$('.after').css('display', 'block');
			}
			$.each($(this.pages).children('ul').children(), function(i, item){
				if (page.nowPage*1 <= sumPage) {
					$(item).children().text(`${i + page.nowPage*1}`);
					if (page.nowPage*1 > (sumPage - 5)) {
						let num = sumPage - page.nowPage*1;
						$.each($(page.pages).children('ul').children(), function(i, item){
							if (i > num) {
								$(item).css('display', 'none');
							} else {
								$(item).css('display', 'block');
							}
						});
					} else {
						$.each($(page.pages).children('ul').children(), function(i, item){
							$(item).css('display', 'block');
						})
					}
				}
			});
		},
		//页码跳转
		junpPageNum(){
			$(this.pageChoice).children('button').click(()=>{
				let num = $(this.pageChoice).children('input').val();
				if (num*1 > (Math.floor(this.total/this.qty) + 1)) {
					$(this.pageChoice).children('input').val(Math.floor(this.total/this.qty) + 1);
					num = Math.floor(this.total/this.qty) + 1;
				} else if (num*1 < 1) {
					$(this.pageChoice).children('input').val('1');
					num = 1;
				}
				$('.cb_goodslist').html("");
				this.gainData(num, this.qty);
				this.createPageNum()
			});
		},
		init() {
			let pageNum = 1;
			let qty = 28;
			this.gainData(pageNum, qty);
			$(this.pages).children('ul').children().click(function(){
				pageNum = $(this).children().text();
				$('.cb_goodslist').html("");
				page.gainData(pageNum, qty);
			});
			$('.before').click(function(){
				pageNum = $(page.pages).children('ul').children(':eq(0)').text()*1 - 1;
				$('.cb_goodslist').html("");
				page.gainData(pageNum, qty);
			});
			$('.after').click(function(){
				pageNum = $(page.pages).children('ul').children(':eq(0)').text()*1 + 1;
				$('.cb_goodslist').html("");
				page.gainData(pageNum, qty);
			});
			this.listSort();
			this.junpPageNum();
		}
	}

	var CreateItem =  function (obj){
		this.loca = '.cb_goodslist';
		this.small = '.smallImg';
		this.addCar =  '.addCar';
		this.init(obj);
	}
	CreateItem.prototype.init = function(obj){
		$li = $('<li></li>').attr('idx', obj.id);
		$li.append($('<span class="addCar iconfont">&#xe641;</span>'));
		$li.append($($('<a></a>').attr('href', `details.html?idx=${obj.id}`)).append($('<img>').attr('src', `../img/lists/${obj.imgurl}`)));
		$div = $('<div class="clearFix"></div>');
		$div.append($('<p class="fl"></p>').html(`￥${obj.price}`));
		$div.append($('<p class="fr"></p>').html(`成交${obj.sell}笔`));
		$li.append($div);
		$li.append($('<p></p>').append($($('<a href="details.html"></a>').attr('href', `details.html?idx=${obj.id}`)).html(`${obj.name}`)));
		$li.append($('<p></p>').append($($('<a href="details.html"></a>').attr('href', `details.html?idx=${obj.id}`)).html(`${obj.brand}`)));
		$small = $('<ul class="smallImg"></ul>');
		$small.append($('<li></li>').append($('<img>').attr('src', `../img/lists/${obj.imgurl}`)));
		$small.append($('<li></li>').append('<img src="../img/goods/2.png" />'));
		$small.append($('<li></li>').append('<img src="../img/goods/3.png" />'));
		$small.append($('<li></li>').append('<img src="../img/goods/4.png" />'));
		$li.append($small);
		this.li = $li;
		$(this.loca).append($li);
		this.cut();
		this.addShop();
	}
	CreateItem.prototype.cut = function(){
		$(this.small).children().mouseover(function(){
			$(this).parent().parent().children().eq(1).children().attr("src", $(this).children().attr('src'));
		});
	}
	CreateItem.prototype.addShop = function(){
		this.li.click((e)=>{
			if ($(e.target).hasClass('addCar')) {
				let str = cookie.get('car');
				if (str === '') {
					let arr = [];
					let obj = {
						idx: this.li.attr('idx'),
						num: 1
					}
					arr.push(obj);
					document.cookie = 'car=' + JSON.stringify(arr);
				} else {
					let arr = JSON.parse(cookie.get('car'));
					for (let i=0; i<arr.length; i++) {
						if (arr[i].idx === this.li.attr('idx')) {
							arr[i].num = arr[i].num*1 + 1;
							cookie.set('car', JSON.stringify(arr));
							return false;
						}
					}
					let obj = {
						idx: this.li.attr('idx'),
						num: 1
					}
					arr.push(obj);
					cookie.set('car', JSON.stringify(arr));
				}
			}
		});
	}
	page.init();
});