// pages/chat/chat.js
const { urlOrigin } = require('../../utils/request.js')
const io = require('weapp.socket.io')
const socket = io(urlOrigin)

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    socket.on('connect', function () {
      console.log('connected')
    });

    socket.on('news', d => {
      console.log('received news: ', d)
    })

    socket.emit('news', {
      title: 'this is a news'
    })
  },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})