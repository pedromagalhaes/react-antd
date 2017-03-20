import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Layout, Row, Col, Spin } from 'antd'

import { toggleMainDrawer } from '../../store/globalStore'
import { PROJECT_TITLE } from '../../constants/Config'

import './Header.scss'

const Header = props => (
  <div className='main-header'>
    <Helmet
      defaultTitle={PROJECT_TITLE}
      title={props.pageTitle}
      titleTemplate={`%s | ${PROJECT_TITLE}`}
    />

    <Layout.Header>
      <Row>
        <Col span={22}><h1>{props.pageTitle || PROJECT_TITLE}</h1></Col>
        <Col span={2}>{props.fetching ? <div className='main-header__spinner'><Spin size='large' /></div> : ''}</Col>
      </Row>
    </Layout.Header>
  </div>
)

Header.propTypes = {
  pageTitle: React.PropTypes.string, // eslint-disable-line react/require-default-props
  fetching: React.PropTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleOpenDrawer: () => {
    dispatch(toggleMainDrawer())
  }
})

const mapStateToProps = state => ({ ...state.global })

export default connect(mapStateToProps, mapDispatchToProps)(Header)
