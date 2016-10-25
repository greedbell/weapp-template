'use strict';

var _labrador = require('./../../weapp_modules/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp(); // 获取应用实例

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    _labrador2.default.navigateTo({
      url: '../mine/mine'
    });
  },

  onLoad: function onLoad() {
    console.log('onLoad');
    this.setData({
      appinfo: {
        name: 'weapp-template',
        desc: 'template of weapp'
      }
    });
  }
});