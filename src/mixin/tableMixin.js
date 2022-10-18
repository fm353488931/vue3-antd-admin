//vue2用的列表mixin
import _ from 'lodash'

export default {
  data() {
    return {
      loading: false,
      dataSource: [],
      searchEmpty: {},
      search: {},
      searchModel: {},
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        total: 0,
        showTotal: (total) => `共有${total}条数据`,
        pageSizeOptions: ['10', '20', '30', '50'],
      },
    }
  },
  created() {
    this.search = _.cloneDeep(this.searchEmpty)
    this.searchModel = _.cloneDeep(this.searchEmpty)
  },
  methods: {
    //重置
    reset() {
      this.search = _.cloneDeep(this.searchEmpty)
      this.searchModel = _.cloneDeep(this.searchEmpty)
      this.pagination.current = 1
      this.pagination.pageSize = 10
      this.getList()
    },
    //查询
    onSearch() {
      this.pagination.current = 1
      this.pagination.pageSize = 10
      this.searchModel = _.cloneDeep(this.search)
      this.getList()
    },
    //分页
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getList()
    },
    getList() {},
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
  },
}
