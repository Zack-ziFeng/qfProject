define(function(){
	return {
		get: function(name){
			let cookies = document.cookie;
			let res = '';
			cookies = cookies.split('; ');
			for (let i=0; i<cookies.length; i++) {
				let arr = cookies[i].split('=');
				if (arr[0] === name) {
					res = arr[1];
				}
			}
			return res;
		},
		set: function(name, value, prop){
			let str = name + '=' + value;
			if(prop === undefined){
				prop = {};
			}
			if(prop.expires){
				str += ';expires=' + prop.expires;
			}
			if(prop.path){
				str +=';path=' + prop.path
			}
			if(prop.domain){
				str +=';domain=' + prop.domain
			}
			if(prop.secure){
				str += ';secure';
			}
			document.cookie = str;
		},
		remove: function(name){
			var now = new Date();
			now.setDate(now.getDate()-1);
			this.set(name,'x',{expires:now});
		}
	}
});