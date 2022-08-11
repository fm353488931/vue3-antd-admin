const Constant = {
  map: {
    yesNo: { 0: '否', 1: '是' },
    sex: { 1: '男', 2: '女' },
    teacherType: { 0: '业主', 1: '外聘' }, // 教师类别
    groupType: { 0: '已结束', 1: '招募中' }, // 跑组类型
    result: { 0: '驳回', 1: '通过' }, // 跑组类型
    upState: { 1: '已上架', 2: '未上架' }, // 上架状态
  }, //字典常量
  options: {}, //下拉选项常量
}
Object.keys(Constant.map).forEach((key) => {
  const map = Constant.map
  const options = Constant.options
  options[key] = Object.entries(map[key]).map(([value, label]) => ({
    value: Number(value),
    label,
  }))
})
export default Constant
