import React from 'react'
import axios from 'axios'
import { message, Form, Input, Button, Checkbox, DatePicker, Select } from 'antd'
import moment from 'moment'

import { API_ENDPOINT_URL, DATE_FORMAT } from '../../../constants/Config'

const FormItem = Form.Item

class ZenForm extends React.Component {
  static propTypes = {
    updatePageTitle: React.PropTypes.func.isRequired,
    form: React.PropTypes.shape({
      validateFields: React.PropTypes.func.isRequired,
      resetFields: React.PropTypes.func.isRequired,
      getFieldDecorator: React.PropTypes.func
    }).isRequired,
    zen: React.PropTypes.shape({
      category: React.PropTypes.array
    }),
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired,
    fetchZenCategory: React.PropTypes.func
  }
  componentWillMount() {
    this.props.fetchZenCategory()
  }

  componentDidMount() {
    this.props.updatePageTitle('Add New Zen')
  }

  handleGoBack = () => {
    this.props.router.push('/zen')
    this.props.form.resetFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.date = moment(values.date).format(DATE_FORMAT)
        axios.post(`${API_ENDPOINT_URL}/api/notes`, values).then(() => {
          message.success('New note added successfully!')
          this.props.form.resetFields()
        }).catch(() => {
          message.error('Error occured, please try again')
        })
      }
    })
  }

  render() {
    if (!this.props.zen.category) {
      return <div>Loading...</div>
    }

    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    const menu = (prop) => {
      const item = prop.map(i => (<Select.Option key={i.id} value={i.title}>{i.title}</Select.Option>))
      return (<Select placeholder='Select category'>{item}</Select>)
    }

    return (
      <Form onSubmit={this.handleSubmit} className='new-note-form'>
        <FormItem {...formItemLayout} label='Title'>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the Title!' }]
          })(
            <Input placeholder='Title' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Thumbnail'>
          {getFieldDecorator('thumbnail', {
            rules: [{ required: true, message: 'Please input the Thumbnail!' }]
          })(
            <Input placeholder='Thumbnail' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Category'>
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please input the Category!' }]
          })(
            menu(this.props.zen.category)
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Date'>
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please input the Title!' }]
          })(
            <DatePicker format={DATE_FORMAT} showTime />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Content'>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input your Content!' }]
          })(
            <Input type='textarea' placeholder='Content' autosize={{ minRows: 5, maxRows: 20 }} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('featured', {
            valuePropName: 'checked',
            initialValue: false
          })(
            <Checkbox>Featured Content</Checkbox>
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button type='primary' htmlType='submit'>Submit</Button>
          <Button
            className='form-reset-btn'
            type='danger'
            onClick={() => this.props.form.resetFields()}
          >Reset</Button>
        </FormItem>
      </Form>
    )
  }
}

const ZenNewForm = Form.create()(ZenForm)

export default ZenNewForm
