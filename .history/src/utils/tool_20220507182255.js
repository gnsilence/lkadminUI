/*
 * @Descripttion: 工具集
 * @version: 1.1
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-07 18:22:55
 */

import CryptoJS from 'crypto-js'

const tool = {}

/* localStorage */
tool.data = {
	evil(fn) {
		const Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
		return new Fn('return ' + fn)()
	},
	set(table, settings) {
		var _set = JSON.stringify(settings)
		return localStorage.setItem(table, _set)
	},
	get(table) {
		var data = localStorage.getItem(table)
		try {
			data = JSON.parse(data)
		} catch (err) {
			return null
		}
		return data
	},
	remove(table) {
		return localStorage.removeItem(table)
	},
	clear() {
		return localStorage.clear()
	}
}
// Demo: Circular reference
const o = {};
o.o = o;

// Note: cache should not be re-used by repeated calls to JSON.stringify.

let cache = [];

function stringifyCircularHandler(key, value) {
	if (typeof value === 'object' && value !== null) {
		if (cache.indexOf(value) !== -1) {
			// Circular reference found, discard key
			return;
		}
		// Store value in our collection
		cache.push(value);
	}
	return value;
};
/* sessionStorage*/
tool.session = {
	set(table, settings) {
		var _set = JSON.stringify(settings)
		return sessionStorage.setItem(table, _set)
	},
	get(table) {
		var data = sessionStorage.getItem(table)
		try {
			data = JSON.parse(data)
		} catch (err) {
			return null
		}
		return data
	},
	remove(table) {
		return sessionStorage.removeItem(table)
	},
	clear() {
		return sessionStorage.clear()
	}
}

/* Fullscreen */
tool.screen = function (element) {
	var isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)
	if (isFull) {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen()
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen()
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen()
		}
	} else {
		if (element.requestFullscreen) {
			element.requestFullscreen()
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen()
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen()
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen()
		}
	}
}

/* 复制对象 */
tool.objCopy = function (obj) {
	return JSON.parse(JSON.stringify(obj))
}

/* 日期格式化 */
tool.dateFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
	if (date) {
		date = new Date(date)
		var o = {
			'M+': date.getMonth() + 1, // 月份
			'd+': date.getDate(), // 日
			'h+': date.getHours(), // 小时
			'm+': date.getMinutes(), // 分
			's+': date.getSeconds(), // 秒
			'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
			'S': date.getMilliseconds() // 毫秒
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
			}
		}
		return fmt
	} else {
		return ''
	}
}

/* 千分符 */
tool.groupSeparator = function (num) {
	num = num + ''
	if (!num.includes('.')) {
		num += '.'
	}
	return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
		return $1 + ','
	}).replace(/\.$/, '')
}

/* 常用加解密 */
tool.crypto = {
	// MD5加密
	MD5(data) {
		return CryptoJS.MD5(data).toString()
	},
	// BASE64加解密
	BASE64: {
		encrypt(data) {
			return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
		},
		decrypt(cipher) {
			return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
		}
	},
	// AES加解密
	AES: {
		encrypt(data, secretKey) {
			const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return result.toString()
		},
		decrypt(cipher, secretKey) {
			const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return CryptoJS.enc.Utf8.stringify(result)
		}
	}
}
/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
tool.listToTree = (list, tree, parentId) => {
	list.forEach(item => {
		// 判断是否为父级菜单
		// eslint-disable-next-line eqeqeq
		if (item.pid == parentId) {
			const child = {
				...item,
				key: item.key || item.name,
				children: []
			}
			// 迭代 list， 找到当前菜单相符合的所有子菜单
			tool.listToTree(list, child.children, item.id)
			// 删掉不存在 children 值的属性
			if (child.children.length <= 0) {
				delete child.children
			}
			// 加入到树中
			tree.push(child)
		}
	})
}

tool.moneyFormat = (number, decimals, dec_point, thousands_sep) => {
	/*
	 * 参数说明：
	 * number：要格式化的数字
	 * decimals：保留几位小数
	 * dec_point：小数点符号
	 * thousands_sep：千分位符号
	 * */
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.ceil(n * k) / k;
		};

	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, "$1" + sep + "$2");
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

export default tool
