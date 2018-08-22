jQuery(function($) {
	let sign_up = {
		user: '#username',
		psw: '#psw',
		psw_repeat: '#psw_repeat',
		code: '#code',
		show_code: '.show_code',
		protocol: '[name=protocol]',
		sign: '#sign_up',

		randomCode(){
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
		checkName(){
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
		checkPsw(){
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
		checkRepPsw(){
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
		check_code(){
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
		init(){
			$(this.sign).click(()=>{
				if (this.checkName()) {
					if (this.checkPsw()) {
						if (this.checkRepPsw()) {
							if (this.check_code()) {
								console.log('成功');
								return false;
							} else {
								return false;
							}
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			});
		}
	}
	sign_up.randomCode();
	$('#username').blur(function(){
		sign_up.checkName();
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