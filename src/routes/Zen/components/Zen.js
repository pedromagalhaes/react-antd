import React from 'react'
import { Table, Button, Popconfirm, Row, Col, Input } from 'antd'
import moment from 'moment'

const tableParams = {
  bordered: false,
  limit: 10,
  offset: 0,
  size: 'middle',
  sortKey: 'id',
  sortDirection: 'asc'
}

const Search = Input.Search

export default class Zen extends React.Component {

  static propTypes = {
    updatePageTitle: React.PropTypes.func.isRequired,
    zen: React.PropTypes.shape({
      fetching: React.PropTypes.bool,
      note: React.PropTypes.array,
      zens: React.PropTypes.array,
      count: React.PropTypes.number,
      currentPage: React.PropTypes.number
    }).isRequired,
    fetchZen: React.PropTypes.func.isRequired,
    deleteZen: React.PropTypes.func,
    router: React.PropTypes.shape({
      push: React.PropTypes.func
    })
  }

  constructor() {
    super()
    this.params = {
      order: `${tableParams.sortKey} ${tableParams.sortDirection}`,
      offset: tableParams.offset,
      limit: tableParams.limit,
      where: null
    }
    this.pagination = {
      defaultCurrent: 1,
      pageSize: tableParams.limit,
      showTotal: ((total, range) => `${range[0]}-${range[1]} of ${total} items`)
    }
    this.tableColumns = [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'ID',
        width: '10%',
        sorter: (a, b) => a.id - b.id
      },
      {
        key: 'title',
        dataIndex: 'title',
        title: 'Title',
        sorter: (a, b) => a.title.length - b.title.length,
        width: '30%'
      },
      {
        key: 'date',
        dataIndex: 'date',
        title: 'Date',
        sorter: (a, b) => a.date.length - b.date.length,
        width: '10%',
        render: text => (<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>)
      },
      {
        key: 'content',
        dataIndex: 'content',
        title: 'Content',
        sorter: (a, b) => a.content.length - b.content.length,
        width: '30%'
      },
      {
        key: 'featured',
        dataIndex: 'featured',
        title: 'Featured',
        width: '10%',
        sorter: (a, b) => a.featured - b.featured,
        render: (text, record) => (
          <span>
            {record.featured ? 'YES' : 'NO'}
          </span>
        )
      },
      { key: 'actions',
        title: 'Actions',
        width: '10%',
        render: (text, record) => (
          <span>
            <Button
              type='primary'
              onClick={() => this.props.router.push(`/zen/edit/${record.id}`)}
              icon='edit'
            />
            <span className='ant-divider' />
            <Popconfirm
              title='Sure to delete?'
              placement='topRight'
              cancelText={'Cancel'}
              okText={'Confirm'}
              onConfirm={() => this.onDelete(record.id)}
            >
              <Button type='danger' icon='delete' />
            </Popconfirm>
          </span>
        )
      }
    ]
  }

  componentWillMount() {
    this.props.fetchZen(this.params)
  }

  componentDidMount() {
    this.props.updatePageTitle('Zen')
  }

  componentWillReceiveProps(nextProps) {
    this.pagination = {
      current: nextProps.zen.currentPage,
      total: nextProps.zen.count
    }
  }

  onSearch = (value) => {
    this.params.where = value !== '' ? { title:  { like: `%${value}%` } } : null
    this.props.fetchZen(this.params)
  }

  onChange = (pagination, filters, sorter) => {
    // sort table options
    const sortBy = sorter.columnKey || tableParams.sortKey
    const sortDirection = sorter.order === 'descend' ? 'desc' : 'asc' || tableParams.sortDirection
    const sortOrder = sorter.order ? `${sortBy} ${sortDirection}` : this.params.order
    // fetch zen api params
    const limit = tableParams.limit
    const params = {
      offset: (pagination.current * limit) - limit,
      order: sortOrder,
      limit,
      current: pagination.current
    }
    this.props.fetchZen(params)
  }

  onDelete(id) {
    this.props.deleteZen(id)
  }

  render() {
    if (!this.props.zen.zens) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Row gutter={16}>
          <Col span={6} className='ant-form-item'>
            <Button type='primary' onClick={() => this.props.router.push('/zen/new')}>Add New</Button>
          </Col>
          <Col span={6} />
          <Col span={6} />
          <Col span={6}>
            <Row type='flex' justify='end'>
              <Col><Search placeholder='input search text' onSearch={this.onSearch} /></Col>
            </Row>
          </Col>
        </Row>
        <Row className='ant-row'>
          <Table
            rowKey='id'
            pageSize={tableParams.limit}
            size={tableParams.size}
            columns={this.tableColumns}
            dataSource={this.props.zen.zens}
            loading={this.props.zen.fetching}
            pagination={this.pagination}
            onChange={this.onChange}
            bordered={tableParams.bordered}
          />
        </Row>
      </div>
    )
  }
}
