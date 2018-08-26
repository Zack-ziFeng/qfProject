require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1',
		'cookie':'cookie'
	}
});

require(['jquery', 'cookie'], function($, cookie){
	$('.sc_top header').load('../html/commonHTML.html header .top');

	let page = {
		car: '.content .container:eq(0)',
		empty: '.noGoods',
		delAll: '.delAll',
		sumNum: '.sumNum',
		goodsNum: '.goodsNum',
		numbers: '.nums',
		priceSum: '.price span',
		loca: '.shopList tbody',
		total: 0,
		renderer(){
			let arr = JSON.parse(cookie.get('car'));
			let idxArr = [];
			let numArr = [];
			for (let i in arr) {
				idxArr.push(arr[i].idx);
				numArr.push(arr[i].num);
			}
			$.get('../api/shopCar.php', `idxArr=${JSON.stringify(idxArr)}`, (data)=>{
				let goodsArr = [];
				for(let i in JSON.parse(data)) {
					new CreateTr(JSON.parse(data)[i], numArr[i]);
				}
				this.countNum();
				$(this.goodsNum).text($(this.loca).children('tr').length);
				this.delAllGoods();
			});
		},
		setCookie(){
			let arr = [];
			$.each($(this.loca + ' tr'), (i ,item)=>{
				let obj = {
					idx: $(item).attr('idx'),
					num: $(item).children().children().children('.nums').text()
				}
				arr.push(obj);
			});
			cookie.set('car', JSON.stringify(arr));
		},
		countNum(){
			this.total = 0;
			$.each($(this.priceSum), (i ,item)=>{
				this.total += $(item).text()*1 * $(item).parent().next().children().children('.nums').text();
			});
			$(this.sumNum).text(this.total.toFixed(2));
		},
		delAllGoods(){
			$(this.delAll).click(()=>{
				$(this.loca + 'li').remove();
				cookie.remove('car');
				$(this.car).css('display', 'none');
				$(this.empty).css('display', 'block');
			});
		},
		init(){
			if(cookie.get('car') !== '') {
				this.renderer();
				$(this.car).css('display', 'block');
				$(this.empty).css('display', 'none');
			} else {
				$(this.car).css('display', 'none');
				$(this.empty).css('display', 'block');
			}
		}
	}

	function CreateTr(obj, number){
		this.loca = '.shopList tbody';
		this.img = '.shopList tbody tr td:eq(1) img';
		this.goodsName = '.shopList tbody tr td:eq(1) p:eq(0)';
		this.idx = '.shopList tbody tr td:eq(1) p:eq(1)';
		this.price = '.price';
		this.num = '.num';
		this.del = '.del';
		this.goods = obj;
		this.startNum = number;
		this.init();
	}

	CreateTr.prototype.count = function(){
		this.tr.click((e)=>{
			$tar = $(e.target);
			$(document).bind("selectstart",function(){return false;});		//阻止默认行为
			if ($tar.hasClass('minus')) {
				let val = $tar.next().text()*1;
				if (val <= 1) {
					$tar.next().text(1);
				} else {
					$tar.next().text(val - 1);
				}
				page.countNum();
				page.setCookie();
			}
			if ($tar.hasClass('add')) {
				let val = $tar.prev().text()*1;
				if (val >= this.goods.inventory) {
					$tar.prev().text(this.goods.inventory);
				} else {
					$tar.prev().text(val + 1);
				}
				page.countNum();
				page.setCookie();
			}
			if ($tar.hasClass('del')) {
				$tar.parent().parent().remove();
				page.setCookie();
			}
		});
	}
	CreateTr.prototype.init = function(){
		$tr = $(`<tr idx=${this.goods.id}></tr>`);
		$tr.append($('<td><input type="checkbox"></td>'));
		$img = $(`<img src=../img/lists/${this.goods.imgurl} class="fl">`);
		$div = $('<div></div>').append($(`<p>${this.goods.name}</p><p>商品货号：${this.goods.id}</p>`));
		$tr.append($('<td class="goods"></td>').append($img).append($div));
		$tr.append($('<td class="price"></td>').html(`￥<span>${this.goods.price}</span>`));
		$count = $('<div></div>').append(`<span class="minus">-</span><span class="nums">${this.startNum}</span><span class="add">+</span>`);
		$tr.append($('<td class="num"></td>').append($count));
		$tr.append($('<td><span class="del">删除</span></td>'))
		this.tr = $tr;
		$(this.loca).append(this.tr);
		this.count();
	}

	page.init();
});