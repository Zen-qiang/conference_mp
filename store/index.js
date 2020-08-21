import { configure, observable, action } from 'mobx-miniprogram'

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' });

export default observable({
  // 数据字段
  numA: 1,
  numB: 2,

  // 计算属性
  get sum () {
    return this.numA + this.numB
  },
  get reduce () {
    return this.numB - this.numA
  },

  // actions
  update: action(function () {
    const sum = this.sum
    this.numA = this.numB
    this.numB = sum
  }),
  calc: action(function (numA, numB) {
    this.numA = numA
    this.numB = numB
  })
})