require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1',
		'cookie':'cookie'
	}
});

require(['jquery', 'cookie'], function($, cookie){
	let sign_up = {
		user: '#username',
		psw: '#psw',
		psw_repeat: '#psw_repeat',
		code: '#code',
		show_code: '.show_code',
		protocol: '[name=protocol]',
		sign: '#sign_up',

		randomCode(){		//随机数
			let arr = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			let code_len = 4;
			let arr_len = arr.length;
			let code = '';
			for (let i=0; i<code_len; i++) {
				code += arr[Math.floor(Math.random()*(arr_len - 1))];
				code += ' ';
			}
			$(this.show_code).html(code);
		},
		checkName(){		//检测用户名格式
			if ($(this.user).val() === '') {
				$(this.user).next().next().next().html('用户名不能为空').css('visibility', 'visible');
				return false;
			} else if (!/^[a-zA-Z][\w]{2,11}$/.test($(this.user).val())) {
				$(this.user).next().next().next().html('英文开头，3-12个字符').css('visibility', 'visible');
				return false;
			} else {
				$(this.user).next().next().next().css('visibility', 'hidden');
				return true;
			}
		},
		obtainName(){		//用户名是否已注册
			$.get('../api/check_username.php?username=' + $(this.user).val(), (data)=>{
				if (!(data === 'yes')) {
					$(this.user).next().next().next().html('用户名已注册').css('visibility', 'visible');
				} else {
					this.checkName();
				}
			});
		},
		checkPsw(){		//密码检测
			if ($(this.psw).val() === '') {
				$(this.psw).next().next().next().html('密码不能为空').css('visibility', 'visible');
				return false;
			} else if (!/^[\S]{6,20}$/.test($(this.psw).val())) {
				$(this.psw).next().next().next().html('密码要6到20位，禁止空格').css('visibility', 'visible');
				return false;
			} else {
				$(this.psw).next().next().next().css('visibility', 'hidden');
			}
			if ($(this.psw_repeat).val() !== '' && $(this.psw_repeat).val() !== $(this.psw).val()) {
				$(this.psw_repeat).next().next().next().html('密码不一致').css('visibility', 'visible');
				return false;
			}
			return true;
		},
		checkRepPsw(){		//重复密码检测
			if ($(this.psw_repeat).val() === '') {
				$(this.psw_repeat).next().next().next().html('重复密码不能为空').css('visibility', 'visible');
				return false;
			} else if ($(this.psw_repeat).val() !== $(this.psw).val()) {
				$(this.psw_repeat).next().next().next().html('密码不一致').css('visibility', 'visible');
				return false;
			} else {
				$(this.psw_repeat).next().next().next().css('visibility', 'hidden');
				return true;
			}
		},
		check_code(){		//验证码检查
			$(this.show_code).bind("selectstart",function(){return false;});	//禁止文本选择功能
			this.checkCode = $(this.show_code).html().split(' ').join('').toLowerCase();
			if (($(this.code).val()).toLowerCase() === this.checkCode) {
				$(this.code).next().next().next().css('visibility', 'hidden');
				return true;
			} else {
				this.randomCode();
				$(this.code).next().next().next().css('visibility', 'visible');
				return false;
			}
		},
		init() {
			$(this.sign).click(()=>{
				if (this.checkName() && this.checkPsw() && this.checkRepPsw() && this.check_code() && $(this.protocol).is(':checked')) {
					$.post('../api/signUp.php', `username=${$(this.user).val()}&password=${$(this.psw).val()}`, (result)=>{
						$(location).attr('href', '../html/signIn.html');
					});
				}
			});
		}		
	}
	
	
	
	sign_up.randomCode();
	$('#username').blur(function(){
		sign_up.obtainName();
	});
	$('#psw').blur(function(){
		sign_up.checkPsw();
	});
	$('#psw_repeat').blur(function(){
		sign_up.checkRepPsw();
	});
	$('#code').blur(function(){
		sign_up.check_code();
	});
	$('.show_code').click(function(){
		sign_up.randomCode();
	});

	sign_up.init();
});

