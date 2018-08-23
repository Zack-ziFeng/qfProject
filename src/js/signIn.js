require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1'
	}
});

require(['jquery'], function($){
	let page = {
		tab1: '.tab1',
		tab2: '.tab2',
		qr: '.QR',
		code: '.code',
		sub: '#sub',
		user: '#user',
		psw: '#psw',
		auto: '#auto',
		error: '.error',
		cut(){
			$(this.tab1).click(()=>{
				$(this.tab1).addClass('active');
				$(this.tab2).removeClass('active');
				$(this.qr).css("display", "block");
				$(this.code).css("display", "none");
			})
			$(this.tab2).click(()=>{
				$(this.tab2).addClass('active');
				$(this.tab1).removeClass('active');
				$(this.code).css("display", "block");
				$(this.qr).css("display", "none");
			})
		},
		login(){
			$.post('../api/signIn.php', `username=${$(this.user).val()}&password=${$(this.psw).val()}`, (result)=>{
				if (result === 'yes') {
					$(this.error).css('display', 'none');
					this.autoLogin();
					$(location).attr('href', '../index.html');
				} else {
					$(this.error).css('visibility', 'visible');
					return false;
				}
			})
		},
		autoLogin() {
			if ($(this.auto).is(':checked')) {
				$.cookie('user', JSON.stringify(`username:${$(this.user).val()},password:${$(this.psw).val()}`), {expires:999999});
			}
		},
		init(){
			this.cut();
			$(this.sub).click(()=>{
				this.login();
			})
		}
	}

	page.init();
});