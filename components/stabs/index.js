Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  properties: {
    stabs: { type: Array, value: [] },
    // activeTab: { type: Number, value: 0 },
    defaultTab: { type: Number, value: 0 },
    animation: { type: Boolean, value: true }
  },
  data: {
    activeTab: 0,
    currentView: 0,
    contentScrollTop: 0,
    _heightRecords: [],
    _contentHeight: {}
  },
  observers: {
    defaultTab: function (_activeTab) {
    	// console.log(_activeTab)
    	this.setData({ activeTab: _activeTab, contentScrollTop: 0 })
    },
		activeTab: function (_activeTab) {
			// console.log(_activeTab)
			this.scrollTabBar(_activeTab)
		}
  },
  relations: {
		'../stabs-item/index': {
			type: 'child',
			linked: function linked(target) {
				// console.log(target)
				var _this = this
				target.calcHeight(function (rect) {
					// console.log(rect)
					_this.data._contentHeight[target.data.tabIndex] = rect.height
					if (_this._calcHeightTimer) {
						clearTimeout(_this._calcHeightTimer)
					}
					_this._calcHeightTimer = setTimeout(function () {
						_this.calcHeight()
					}, 100)
				})
			},
			unlinked: function unlinked(target) {
				delete this.data._contentHeight[target.data.tabIndex]
			}
		}
  },
  lifetimes: {
		attached: function attached() {}
  },
  methods: {
		add () {
			this.setData({
				currentView: this.data.currentView + 1
			})
		},
		reduce () {
			this.setData({
				currentView: this.data.currentView - 1
			})
		},
		random () {
			const n = Math.floor(Math.random() * 24)
			this.setData({
				currentView: n
			})
		},
		calcHeight: function calcHeight() {
			var length = this.data.stabs.length
			var _contentHeight = this.data._contentHeight
			var _heightRecords = []
			var temp = 0
			for (var i = 0; i < length; i++) {
				_heightRecords[i] = temp + (_contentHeight[i] || 0)
				temp = _heightRecords[i]
			}
			this.data._heightRecords = _heightRecords
		},
		scrollTabBar: function scrollTabBar(index) {
			var len = this.data.stabs.length
			if (len === 0) return
			// var currentView = index < 6 ? 0 : index - 5
			var currentView = index < 3 ? 0 : index - 2
			// var currentView = index
			if (currentView >= len) currentView = len - 1
			this.setData({ currentView: currentView })
		},
		handleTabClick: function handleTabClick(e) {
			var _heightRecords = this.data._heightRecords
			var index = e.currentTarget.dataset.index
			var contentScrollTop = _heightRecords[index - 1] || 0
			// console.log(index, contentScrollTop, this.data)
			this.triggerEvent('tabclick', { index: index })
			this.setData({
				activeTab: index,
				contentScrollTop: contentScrollTop
			})
		},
		handleContentScroll: function handleContentScroll(e) {
			var _heightRecords = this.data._heightRecords
			if (_heightRecords.length === 0) return
			var length = this.data.stabs.length
			var scrollTop = e.detail.scrollTop
			var index = 0
			if (scrollTop >= _heightRecords[0]) {
				for (var i = 1; i < length; i++) {
					if (scrollTop >= _heightRecords[i - 1] && scrollTop < _heightRecords[i]) {
						index = i
						break
					}
				}
			}
			if (index !== this.data.activeTab) {
				this.triggerEvent('change', { index: index })
				this.setData({ activeTab: index })
			}
		}
  }
})