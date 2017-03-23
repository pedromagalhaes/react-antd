import React from 'react'
import axios from 'axios'
import { message, Form, Input, Button, Checkbox, DatePicker, Select } from 'antd'
import moment from 'moment'

import { API_ENDPOINT_URL, DATE_FORMAT } from '../../../constants/Config'

const FormItem = Form.Item

class ZenEdit extends React.Component {

  static propTypes = {
    updatePageTitle: React.PropTypes.func.isRequired,
    form: React.PropTypes.shape({
      validateFields: React.PropTypes.func.isRequired,
      getFieldDecorator: React.PropTypes.func
    }).isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }).isRequired,
    category: React.PropTypes.array,
    params: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
    fetchZenEdit: React.PropTypes.func.isRequired,
    fetchZenCategory: React.PropTypes.func
  }

  componentWillMount() {
    this.props.fetchZenEdit(this.props.params.id)
    this.props.fetchZenCategory()
  }

  componentDidMount() {
    this.props.updatePageTitle('Edit Note')
  }

  handleGoBack = () => {
    this.props.router.push('/zen')
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { note } = this.props.note
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.date = moment(values.date).format(DATE_FORMAT)
        axios.put(`${API_ENDPOINT_URL}/api/notes/${note.id}`, values).then(() => {
          message.success('Note edited successfully!')
          this.handleGoBack()
        }).catch(() => {
          message.error('Error occured, please try again')
        })
      }
    })
  }

  render() {
    const { note } = this.props.note
    const category = this.props.note.category
    if (!note || !category) {
      return <div>Loading...</div>
    }
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 }
    }
    const { getFieldDecorator } = this.props.form
    const menu = (prop) => {
      const item = prop.map(i => (<Select.Option key={i.id} value={i.title}>{i.title}</Select.Option>))
      return (<Select>{item}</Select>)
    }

    return (
      <Form onSubmit={this.handleSubmit} className='new-note-form'>
        <FormItem {...formItemLayout} label='Title'>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the Title!' }],
            initialValue: note.title
          })(
            <Input placeholder='Title' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Thumbnail'>
          {getFieldDecorator('thumbnail', {
            rules: [{ required: true, message: 'Please input the Thumbnail!' }],
            initialValue: note.thumbnail
          })(
            <Input placeholder='Thumbnail' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Category'>
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please input the Category!' }],
            initialValue: note.category
          })(
            menu(category)
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Date'>
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please input the Title!' }],
            initialValue: moment(note.date)
          })(
            <DatePicker format={DATE_FORMAT} showTime />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Content'>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input your Content!' }],
            initialValue: note.content
          })(
            <Input type='textarea' placeholder='Content' autosize={{ minRows: 5, maxRows: 20 }} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('featured', {
            valuePropName: 'checked',
            initialValue: note.featured
          })(
            <Checkbox>Featured Content</Checkbox>
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

const ZenEditForm = Form.create()(ZenEdit)

export default ZenEditForm
