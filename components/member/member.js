Component ({
  properties: {
    memberInfo: {
      type: Object,
      value: {}
    }
  },
  lifetimes: {
    attached () {
      // console.log(this.data.memberInfo)
    }
  }
})