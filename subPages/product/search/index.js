import Toast from '@vant/weapp/toast/toast'
import { getList, getIsCommandProductList } from '../../../api/product'
const app = getApp()
Page({
  data: {
    value: '', // search值
    searched: false, // 是否搜索完成
    _pageNum: 1,
    _pageSize: 30,
    orderBy: '', // 排序
    upOrdown: '', // 升序降序
    isNoMore: false, // 没有更多数据
    candidateList: [], // 候选列表
    historyList: [], // 历史搜索
    list: [],
    refresherTriggered: false, // 设置当前下拉刷新状态
  },
  onLoad () {
    this.setData({
      historyList: wx.getStorageSync('historyList') || [],//若无储存则为空
    })
  },
  onShow () {
    for (let key in app.globalData.cartCountObj) {
      const id = parseInt(key)
      const index = this.data.list.findIndex(item => item.id === id)
      if (typeof(index) === 'number' && index != -1) {
        this.setData({
          [`list[${index}].cartCount`]: app.globalData.cartCountObj[key]
        })
      }
    }
  },
  _getList () {
    const params = {
      keyword: this.data.value,
      pageNum: this.data._pageNum,
      pageSize: this.data._pageSize,
      orderBy: this.data.orderBy,
      upOrdown: this.data.upOrdown
    }
    if (this.data.value === '') {
      getIsCommandProductList({ pageNum: this.data._pageNum }, { showLoading: true }).then(({ data }) => {
        const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
        this.setData({
          list,
          isNoMore: data.isLastPage
        })
      }).finally(() => {
        this.setData({
          refresherTriggered: false
        })
      })
    } else {
      getList(params, { showLoading: true}).then(({data}) => {
        const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
        this.setData({
          list,
          isNoMore: data.isLastPage
        })
      }).finally(() => {
        this.setData({
          refresherTriggered: false
        })
      })
    }
  },
  _addSuccess ({ detail }) {
    Toast.success({
      duration: 1000
    })
    // console.log(detail)
    const targetItemIndex = this.data.list.findIndex(item => item.id === detail.id)
    if ((typeof(targetItemIndex) === 'number') && (targetItemIndex != -1)) {
      const key = `list[${targetItemIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    }
  },
  _addError ({ detail }) {
    // Toast.fail('添加失败请重试')
    const targetItemIndex = this.data.list.findIndex(item => item.id === detail.id)
    if ((typeof(targetItemIndex) === 'number') && (targetItemIndex != -1)) {
      const key = `list[${targetItemIndex}].cartCount`
      this.setData({
        [key]: detail.count
      })
    }
  },
  /**
   * TODO 候选词点击事件
   * @param {*} e 
   */
  onItemClick ({
    currentTarget: {
      dataset: { item }
    }
  }) {
    this.setData({
      value: item,
      searched: true
    })
    this._getList()
  },
  onSearch ({ detail }) {
    // console.log('search', detail)
    this.data._pageNum = 1
    const historyList = this.data.historyList
    if (detail !== '') {
      //将搜索值放入历史记录中,只能放前10条
      if (historyList.length < 10) {
        historyList.unshift(detail)
      }
      else {
        historyList.pop()//删掉旧的时间最早的第一条
        historyList.unshift(detail)
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('historyList', historyList)
    }
    this.setData({
      searched: true,
      value: detail,
      historyList: wx.getStorageSync('historyList') || []
    })
    this._getList()
  },
  onChange ({ detail }) {
    // const candidateList = _candidateList.filter(item => item.label.indexOf(detail) !== -1)
    this.setData({
      value: detail,
      // candidateList,
      searched: false
    })
  },
  onDelete (e) { // 删除历史记录
    wx.clearStorageSync('historyList')
    this.setData({
      historyList: []
    })
  },
  scrollRefresh (e) {
    // console.log('触发', e)
    this.data._pageNum = 1
    this._getList()
  },
  // scrollRestore (e) {
  //   console.log('复位', e)
  // },
  // scrollAbort (e) {
  //   console.log('中止', e)
  // },
  scrollLower (e) {
    // console.log('滚动到底部', e, this.data.isNoMore)
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  }
})