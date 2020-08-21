Page({
  data: {
    list: []
  },
  onLoad () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('orderItemListFromReviewOrder', async (list) => {
      // console.log(list)
      this.setData({ list })
    })
  }
})