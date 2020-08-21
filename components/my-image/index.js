Component({
  options: {
    multipleSlots: true
  },
  properties: {
    src: {
      type: String,
      observer: function () {
        this.setData({
          error: false,
          loading: true
        })
      }
    },
    lazyLoad: Boolean, // 是否懒加载
    round: Boolean, // 是否显示为圆形
    square: Boolean, // 是否显示为正方形
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showError: {
      type: Boolean,
      value: true
    },
    showLoading: {
      type: Boolean,
      value: true
    },
    mode: {
      type: String,
      value: 'widthFix'
    }
  },
  data: {
    error: false,
    loading: true
  },
  methods: {
    _onLoad: function (event) {
      this.setData({
        loading: false
      })
    },
    _onError: function (event) {
      this.setData({
        loading: false,
        error: true
      })
    }
  }
})