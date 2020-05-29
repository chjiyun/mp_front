// pages/login/login.js
const app = getApp()
const { request } = require("../../utils/request.js")

Page({
  data: {

  },
  // 表单提交
  formSubmit: function(e) {
    const values = e.detail.value
    console.log('values', values)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  checkSession: function(detail) {
    let isValid = false
    const uid = wx.getStorageSync("uid")
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        request({
          url: "/api/wx/login",
          method: "POST",
          data: {
            detail,
            uid,
          },
          success: (res1) => {
            if (res1.data.code === 200) {
              wx.setStorageSync('uid', res1.data.uid)
            }
            console.log('login res:', res1.data)
          }
        })
        // this.goWxlogin(detail) // 验证未过期情况下数据解密是否成功
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        this.goWxlogin(detail, uid)
      }
    })
  },
  // 微信登录逻辑, 需要用户授权才能拿到 unionid
  goWxlogin: function (detail, uid) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        request({
          url: "/api/wx/login",
          method: "POST",
          data: {
            code: res.code,
            detail,
            uid,
          },
          success: (res1) => {
            if (res1.data.code === 200) {
              wx.setStorageSync('uid', res1.data.uid)
            }
            console.log('login res:', res1.data)
          }
        })
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
    console.log(JSON.stringify(e.detail))
    const userInfo = e.detail.userInfo
    if (!userInfo) {
      console.log(e.detail.errMsg)
      return;
    }
    app.globalData.userInfo = e.detail.userInfo
    this.checkSession(e.detail) // 含加密数据和密钥
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('uid: ', wx.getStorageSync("uid"))
    wx.checkSession({
      success: res => {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('session_key ok:', res)
      },
      fail: res => {
        // session_key 已经失效，需要重新执行登录流程
        console.log('session_key failed:', res)
        // wx.login() //重新登录
      }
    })
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