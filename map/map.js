/** ====== 百度地图 ========= **/

/**
 * 构造器
 */
function BaiduMap(id, point){
	if(!id) return;
	this.bmap = undefined;          // map实例化对象
	this.controls = {};              // 存放控件数组
	this.overlays = {};              // 存放覆盖物数组
	return this.init(id, point);
}

/**
 * 初始化
 * 
 * id  选择器
 * point   位置坐标
 */
BaiduMap.prototype.init = function(id, point){
	this.bmap = new BMap.Map(id, {enableMapClick:false});    
	this.bmap.centerAndZoom(point, 12);
	this.bmap.enableScrollWheelZoom(true); 
	return this;
};


// ===================  控件

/**
 * 添加控件
 * 
 * controls {name: 别名，control: 对象}  控件对象
 */
BaiduMap.prototype.addControls = function(controls) {
	var keys = Object.keys(controls);

	for (var i = 0, len = keys.length; i < len; i++) {
		var name = keys[i],
			control = controls[name];
		if(!(name in this.controls)) {
			this.bmap.addControl(control);
			this.controls[name] = control;
		}
	}
	return this;
};

/**
 * 删除控件
 * 
 * controls  控件名字的数组
 */
BaiduMap.prototype.removeControls = function(controls) {
	for (var i = 0, len = controls.length; i < len; i++) {
		var name = controls[i];
		if(name in this.controls) {
			this.bmap.removeControl(this.controls[name]);
			delete this.controls[name];
		}
	}
	return this;
};


// ===================  覆盖物

/**
 * 添加覆盖物
 * 
 * overlays {name: 别名，overlay: 对象}  覆盖物对象
 * callback 点击事件触发的回调函数
 */
BaiduMap.prototype.addOverlays = function(overlays, callback) {
	var keys = Object.keys(overlays);

	for (var i = 0, len = keys.length; i < len; i++) {
		var name = keys[i],
			overlay = overlays[name];
		if(!(name in this.overlays)) {
			this.bmap.addOverlay(overlay);
			this.overlays[name] = overlay;

			// 绑定点击事件
			if(typeof callback === 'function') (function(name, overlay){
				overlay.addEventListener("click", function(result){
					callback(name, overlay, result);
				});
			})(name, overlay);
		}
	}


	return this;
};

/**
 * 删除覆盖物
 * 
 * overlays  控件名字的数组
 */
BaiduMap.prototype.removeOverlays = function(overlays) {
	for (var i = 0, len = overlays.length; i < len; i++) {
		var name = overlays[i];
		if(name in this.overlays) {
			this.bmap.removeOverlay(this.overlays[name]);
			delete this.overlays[name];
		}
	}
	return this;
};

/**
 * 删除所有覆盖物
 * 
 */
BaiduMap.prototype.clearOverlays = function() {
	this.bmap.clearOverlays(); 
	this.overlays = {}; 
	return this;
};

/**
 * 显示覆盖物
 * 
 * overlays  控件名字的数组
 */
BaiduMap.prototype.showOverlays = function(overlays) {
	var keys = Object.keys(overlays || this.overlays);

	for (var i = 0, len = keys.length; i < len; i++) {
		var name = overlays[i];
		if(name in this.overlays) this.overlays[name].show();
	}
	return this;
};

/**
 * 隐藏覆盖物
 * 
 * overlays  控件名字的数组
 */
BaiduMap.prototype.hideOverlays = function(overlays) {
	var keys = Object.keys(overlays || this.overlays);

	for (var i = 0, len = keys.length; i < len; i++) {
		var name = overlays[i];
		if(name in this.overlays) this.overlays[name].hide();
	}
	return this;
};



// ==========================================================

var mapControl = {
	/**
	 * 根据IP定位
	 * 
	 * callback  回调函数
	 */
	getLocalCityByIp: function(callback) {
		var city = new BMap.LocalCity();
		city.get(callback);
		return this;
	},

	/**
	 * 地址解析
	 * 
	 * address   解析的地址
	 * callback  回调函数
	 * scope     解析的地址范围
	 */
	getPoint: function(address, callback, scope) {
		var geoc = new BMap.Geocoder();
		geoc.getPoint(address, callback, scope);
		return this;
	},

	/**
	 * 逆地址解析
	 * 
	 * address   解析的地址
	 * callback  回调函数
	 * scope     解析的地址范围
	 */
	getLocation: function(point, callback) {
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, callback);  
		return this;
	}
};




