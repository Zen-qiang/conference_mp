import { getBanner, getHomeCategoryList } from '../../api/common'
import { getIsCommandProductList, getSaleProductList } from '../../api/product'
import { getAreasList } from '../../api/address'
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({
  data: {
    bannerList: [], // 顶部轮播图
    category: [], // 分类
    list: [],
    saleList: [],
    topbarStyle: '#fff',
    isNoMore: false,
    _pageNum: 1,
    areaList: [],
    areaIndex: null,
    showPop: false, // 新人领取优惠券
    showLoginBtn: false // 底部登录提示
  },
  async onLoad () {
    try {
      // 获取轮播图 分类 推荐商品
      const [{ data: { list: bannerList } }, { data: category }, { data: { list: areaList } }, { data }] = await Promise.all([getBanner(), getHomeCategoryList(), getAreasList(), getSaleProductList(), this._getList()])
      this.setData({
        bannerList,
        category,
        areaList: [{ id: null, name: '目前已开放配送范围' }, ...areaList],
        saleList: data?.list || []
      })
    } catch(err) {
      console.log(err)
    }
    app.getUserInfo((err, res) => {
      // console.log(err, res)
      if (!err) {
        if (res.canGet) {
          this.setData({ showPop: true })
        }
        if (parseInt(res.cartCount)) {
          wx.setTabBarBadge({
            index: 2,
            text: res.cartCount + ''
          })
        } else {
          wx.removeTabBarBadge({
            index: 2
          })
        }
      }
    })
  },
  // onReady () {
  //   // 获取topbar高度
  //   wx.createSelectorQuery().in(this).select('.topbar').boundingClientRect(rect => {
  //     const { bottom: top } = rect
  //     this.observerContentScroll(-top)
  //   }).exec()
  // },
  onShow () {
    if (parseInt(app.globalData.cartCount)) {
      wx.setTabBarBadge({
        index: 2,
        text: app.globalData.cartCount + ''
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
    for (let key in app.globalData.cartCountObj) {
      const id = parseInt(key)
      const index = this.data.list.findIndex(item => item.id === id)
      if ((typeof(index) === 'number') && (index != -1)) {
        this.setData({
          [`list[${index}].cartCount`]: app.globalData.cartCountObj[key]
        })
      }
    }
    app.getUserInfo((err, res) => {
      // console.log(err, res)
      if(!err) {
        if (res.mobile) {
          if (this.data.showLoginBtn) {
            this.setData({
              showLoginBtn: false
            })
          }
        } else {
          this.setData({
            showLoginBtn: true
          })
        }
      } else {
        this.setData({
          showLoginBtn: true
        })
      }
    })
  },
  // observerContentScroll (top) {
  //   this.createIntersectionObserver().disconnect()
  //   // 设置参考区域减去tobbar高度
  //   // 收缩参照节点布局区域的边界
  //   this.createIntersectionObserver().relativeToViewport({ top })
  //     .observe('.swiper', ({ intersectionRect: { top: intersectionTop } }) => { // 相交区域的上边界坐标
  //       this.setData({
  //         topbarStyle: intersectionTop ? '' : '#fff'
  //       })
  //     })
  // },
  _pickerChange ({ detail: { value } }) {
    // console.log(value)
    this.setData({ areaIndex: value })
  },
  _getList () {
    getIsCommandProductList({ pageNum: this.data._pageNum }, { showLoading: true }).then(({ data }) => {
      const list = this.data._pageNum === 1 ? data.list : this.data.list.push(...data.list)
      this.setData({
        list,
        isNoMore: data.isLastPage
      })
    }).finally(() => {
      wx.stopPullDownRefresh()
    })
  },
  _switchClassify ({ currentTarget: { dataset: { id } } }) {
    // console.log(id)
    app.globalData.switchClassifyId = id
    wx.switchTab({
      url: '/pages/classify/index'
    })
  },
  _addSuccess ({ detail }) {
    Toast.success({
      duration: 1000
    })
    // console.log(detail)
    if (parseInt(app.globalData.cartCount)) {
      wx.setTabBarBadge({
        index: 2,
        text: app.globalData.cartCount + ''
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
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
  _toWebView ({ currentTarget: { dataset: { url } } }) {
    if (url) {
      if (/^(https|http)/.test(url)) {
        wx.navigateTo({ url: `/subPages/other/webPage/index?url=${url}`})
      } else {
        wx.navigateTo({ url })
      }
    }
  },
  _closePop () {
    this.setData({ showPop: false })
  },
  _toGetCoupon () {
    const _this = this
    wx.navigateTo({
      url: '/subPages/coupon/newPerson/index',
      success () {
        _this.setData({ showPop: false })
      }
    })
  },
  _toLogin () {
    wx.navigateTo({ url: '/subPages/login/login/index' })
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.pageNum = 1
    this._getList()
  },
  // 上拉触底事件
  onReachBottom () {
    if (this.data.isNoMore) return
    this.data._pageNum = this.data._pageNum + 1
    this._getList()
  },
  onShareAppMessage (res) {
    return {
      title: '大咖生鲜',
      path: '/pages/index/index'
    }
  }
})
