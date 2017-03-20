import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
import { routeData } from '../../routes/routeData'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  }

  state = {
    collapsed: false,
    mode: 'inline'
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed, mode: collapsed ? 'vertical' : 'inline' })
  }

  activeMenu() {
    const parentKey = []
    routeData.forEach((item) => {
      if (item.subMenus) {
        item.subMenus.forEach((i) => {
          if (i.key === this.context.router.location.pathname) {
            parentKey.push(item.key)
          }
        })
      }
    })
    return parentKey
  }

  renderMenu = (prop) => {
    const menuItems = prop || routeData
    const menu = menuItems.map((item) => {
      if (item.hide === true) {
        return false
      }
      const ItemIndex = item.index ? IndexLink : Link
      const hasSubmenu = item.subMenus
      const menuLabel = item.menuIcon ? (
        <span>
          <Icon type={item.menuIcon} />
          <span className='nav-text'>{item.menuLabel}</span>
        </span>) : item.menuLabel
      if (hasSubmenu) {
        return (
          <SubMenu key={item.key} title={menuLabel}>{this.renderMenu(hasSubmenu)}</SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <ItemIndex to={item.key}>
            {menuLabel}
          </ItemIndex>
        </Menu.Item>
      )
    })
    return menu
  }

  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode={this.state.mode}
          selectedKeys={[this.context.router.location.pathname]}
          defaultOpenKeys={this.activeMenu()}
        >
          {this.renderMenu()}
        </Menu>
      </Sider>
    )
  }

}

export default Sidebar
