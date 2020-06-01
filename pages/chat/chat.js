// pages/chat/chat.js
const { urlOrigin } = require('../../utils/request.js')
const io = require('weapp.socket.io')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // socket.on('connect', function () {
    //   console.log('connected', socket.connected)
    // });

    // socket.on('receive', d => {
    //   console.log('received news: ', d)
    // })
  },
  onChageMsg: function(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  sendMsg: function() {
    socket.emit('send', {
      title: this.data.content,
    })
  },
  // onUnload: function () {

  // },
  createConnect: function (e) {
    // this.amendMessage(createSystemMessage('正在加入群聊...'))
    const socket = (this.socket = io(urlOrigin))

    socket.on('connect', function () {
      console.log('connected', socket.connected)
    });

    socket.on('new message', d => {
      const { username, message } = d
      this.pushMessage(createUserMessage(message, username))
    })

    socket.on('user joined', (d) => {
      this.pushMessage(
        createSystemMessage(`${d.username} 来了，当前共有 ${d.numUsers} 人`)
      )
    })

    socket.on('user left', (d) => {
      this.pushMessage(
        createSystemMessage(`${d.username} 离开了，当前共有 ${d.numUsers} 人`)
      )
    })
    
    socket.on('typing', (d) => {
      wx.setNavigationBarTitle({
        title: `${d.username} is typing...`
      })
    })

    socket.on('stop typing', (d) => {
      wx.setNavigationBarTitle({
        title: '在线聊天室'
      })
    })

    socket.emit('add user', this.me.nickName)
  }
})