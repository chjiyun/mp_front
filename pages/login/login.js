// pages/login/login.js
const app = getApp()

Page({
  data: {

  },
  // 表单提交
  formSubmit: function(e) {
    const values = e.detail.value
    console.log('values', values)
  },
  // 微信登录逻辑, 需要用户授权才能拿到 unionid
  goWxlogin: function(data) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '失败了',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log('function getUserInfo', e)
    const userInfo = e.detail.userInfo
    if (!userInfo) {
      console.log(e.detail.errMsg)
      return;
    }
    app.globalData.userInfo = e.detail.userInfo
    this.goWxlogin(e.detail) // 含加密数据和密钥
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('userInfo', app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})