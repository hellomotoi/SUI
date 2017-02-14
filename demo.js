define(function(require, exports) {
	'use strict';
    var $ = require('../../mlib/zepto.new.min.js'),
    	Tool = require('../../lib/tool.js'),
    	Jquery = require('../../lib/jquery.js'),
        Fastclick = require("../../mlib/fastclick"),
		wx = require('../../mlib/wxshare');

    require('../../mlib/sui-min.js');
    require('../../mlib/sm-city-picker.js');
    Fastclick.attach(document.body);
    /* cookie判断 */
    // if (Tool.cookie('hello')) {
    	// console.log('test');
    	// console.log(Tool.cookie('hello'));
    	// location.href = 'http://www.baidu.com';
    // }
    // Tool.cookie('hello','mimamimamimamimamimamimamimamimamima');
    //微信分享
    if (Tool.browser.isWX) {
        var wxdata = window.data;
        wxdata.jsapi = (typeof(PHP_OBJECT_VALUES) !== "undefined" ? (PHP_OBJECT_VALUES.wechatkey || window.data.jsapi) : window.data.jsapi);
        wx.config(wxdata);
    }

    $('.start-sign').on('touchend',function() {
    	var h = $('.coverImg').height();
    	Jquery('.content').animate({'scrollTop':h},1000)
    })
    // 星座
    $("#picker-constellation").picker({
	  toolbarTemplate: '<header class="bar bar-nav">\
	  <button class="button button-link pull-right close-picker">确定</button>\
	  <h1 class="title">星座</h1>\
	  </header>',
	  cols: [
	    {
	      textAlign: 'center',
	      values: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座']
	    }
	  ]
	});
	// 婚期
	$("#picker-day").picker({
	  toolbarTemplate: '<header class="bar bar-nav">\
	  <button class="button button-link pull-right close-picker">确定</button>\
	  <h1 class="title">请选择婚期</h1>\
	  </header>',
	  cols: [
	    {
	      textAlign: 'center',
	      values: ['2000年','2001年','2002年', '2003年', '2004年','2005年','2006年', '2007年', '2008年', '2009年', '2010年', '2011年', '2012年', '2013年','2014年','2015年','2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年','2024年','2025年']
	      //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
	    },
	    {
	      textAlign: 'center',
	      values: ['01月', '02月', '03月', '04月', '05月', '06月', '07月','08月','09月','10月','11月','12月']
	    },
	    {
	      textAlign: 'center',
	      values: ['01日', '02日', '03日', '04日', '05日', '06日', '07日','08日','09日','10日','11日','12日','13日','14日','15日','16日',
                    '17日','18日','19日','20日','21日','22日','23日','24日','25日',
                    '26日','27日','28日','29日','30日','31日']
	    }
	  ]
	});
	// 城市
	$("#picker-loveCity").cityPicker({
        toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择邂逅城市</h1>\
    </header>'
    });
    $.init();

    // 获取数据
    var sendData = {};
    var sendflag = true;
    var teg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    $('.pages-submit').on('click',function() {
    	sendData.horoscope = $('#picker-constellation').val();
    	sendData.city = $('#picker-loveCity').val();
    	sendData.name = $('#picker-name').val();
    	sendData.phone = $('#picker-phoneNum').val();
    	if (!sendData.name) {
    		$('#picker-name').addClass('error');
    		return;
    	}else if(!teg.test(sendData.phone) || sendData.phone == '') {
    		$('#picker-phoneNum').val('').attr('placeholder','请填写正确的手机号码').addClass('error');
            return;
    	}
    	// 防止重复提交
    	if (!sendflag) {
    		return;
    	}
		sendflag = false;
        /*发送数据*/
    	console.log(sendData);
    	$.post('/act/valentine2017',sendData,function(data) {
            /*返回数据*/
    		console.log(data);
            if (data.code == 200) {
                sendflag = true;
                location.href = data.href;
            }
            if (data.code == 205) {
            	sendflag = true;
                $('#picker-phoneNum').val('').attr('placeholder','请勿重复提交手机号码').addClass('error');
            }
        })
    })
    $(document).on('touchmove','.picker-modal',function(event) {
    	event.stopPropagation();
    	return false;
    })

})
