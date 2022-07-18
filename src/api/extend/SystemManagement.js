// 获取表格数据列表
export function TableExampleList(data) {
    return request({
      url: `/api/extend/TableExample`,
      method: 'get',
      data
    })
  }