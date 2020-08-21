Page({
  data: {
    titles: [
      { title: '配送问题（超时未到，修改地址）', url: 'peisongwenti' },
      { title: '配送范围问题', url: 'peisongfanwei' },
      { title: '订单问题（取消订单，订单信息有误）', url: 'dingdanwenti' },
      { title: '商品问题（不新鲜、少送漏送、退换货）', url: 'shangpinwenti' },
      { title: '优惠券问题（找不到、无法使用、退优惠券）', url: 'youhuiquanwenti' },
      { title: '支付问题（支付方式、支付失败）', url: 'zhifuwenti' },
      { title: '退款问题（到账时间、退款金额不符）', url: 'tuikuanwenti' },
      { title: '退换货问题', url: 'tuihuanhuowenti' },
      { title: '积分规则', url: 'jifenguize' }
    ]
  },
  _jump ({ currentTarget: { dataset: { url } } }) {
    // console.log(url)
    wx.navigateTo({
      url: `/subPages/other/web/index?url=${url}`
    })
  }
})