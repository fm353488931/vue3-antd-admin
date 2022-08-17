const Constant = {
  map: {
    yesNo: { 0: '否', 1: '是' },
    sex: { 1: '男', 2: '女' },
  }, //字典常量
  options: {}, //下拉选项常量
}
Object.keys(Constant.map).forEach((key) => {
  const map = Constant.map
  const options = Constant.options
  options[key] = Object.entries(map[key]).map(([value, label]) => ({
    value,
    label,
  }))
})
export default Constant
