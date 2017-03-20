import React from 'react'
import { Layout } from 'antd'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Breadcumb from '../../components/Breadcumb'
import './CoreLayout.scss'
import '../../styles/core.scss'

const { Content, Footer } = Layout

class CoreLayout extends React.Component {

  static propTypes = {
    children : React.PropTypes.element.isRequired
  }

  state = {
    collapsed: false
  }

  render() {
    return (
      <Layout className='ant-layout ant-layout-has-sider'>
        <Sidebar className='core-sider' />
        <Layout>
          <Header />
          <Content>
            <Breadcumb />
            <div className='ant-layout-content__children'>{this.props.children}</div>
          </Content>
          <Footer>DMI International - Cambodia © 2017</Footer>
        </Layout>
      </Layout>
    )
  }

}

export default CoreLayout
