Component({
  properties: {
    loadingText: {
      type: String,
      value: '加载中...'
    },
    loadedText: {
      type: String,
      value: '没有更多数据啦'
    },
    noMore: {
      type: Boolean,
      value: false
    }
  }
})