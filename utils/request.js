// const urlPrefix = "https://mp.chjiyun.com"
const urlPrefix = "http://127.0.0.1:7001"
const request = function(params) {
  const url = `${urlPrefix}/${params.url}`
  delete params.url
  return wx.request({
    url,
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {},
    ...params,
  })
}

module.exports = {
  request,
}