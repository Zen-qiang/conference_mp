Component({
  properties: {
    size: {
      type: String,
      optionalTypes: [Number],
      value: '22px'
    }
  },
  methods: {
    onItemClick (e) {
      this.triggerEvent('add')
      this.clearAnimation('.add')
      this.animate('.add', [
        { opacity: 1, scale: [1, 1] },
        { opacity: 0, scale: [1.5, 1.5] }
      ], 400, () => {
        this.clearAnimation('.add')
      })
    }
  }
})