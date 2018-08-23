require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1'
	}
});

require(['jquery'], function($){
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

		//获得数据库数据
		gainData(){
			$.get('../api/goodsList.php', (data)=>{
				this.data = data;
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
		//生成类别选择
		createSelect(){},
		//排序
		listSort(){},
		//筛选
		listSelect(){},
		init() {
			this.gainData();
			this.createList();
		}
	}

	function createItem(obj){

	}

	page.init();
});