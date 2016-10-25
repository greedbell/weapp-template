'use strict';

// 获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../index/index'
    });
  },
  onLoad: function onLoad() {
    this.setData({
      userInfo: {
        nickName: 'Bell',
        motto: 'to be greedy'
      }
    });
  }
});