Page({
  data: {
    loadDone: false
  },
  onReachBottom () {
    console.log('onReachBottom')
  },
  jumpInfo (event) {
    console.log(event)
  }
})