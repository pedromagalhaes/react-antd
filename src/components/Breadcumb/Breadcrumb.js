import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Breadcrumb } from 'antd'
import { routeData } from '../../routes/routeData'

const itemRender = route =>
  (<span>{route.breadcrumbName}</span>)

const RenderNav = props =>
  (<Breadcrumb itemRender={itemRender} routes={props.routes} />)

RenderNav.propTypes = {
  routes: React.PropTypes.array.isRequired
}

class BreadcrumbNav extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  renderBreadcrumb = (child) => {
    const menuItems = child || routeData
    const template = menuItems.map((item) => {
      if (item.subMenus) {
        return (
          <Route key={item.key} breadcrumbName={item.menuLabel}>
            {this.renderBreadcrumb(item.subMenus)}
          </Route>
        )
      }
      return (
        <Route
          key={item.key}
          name={item.menuLabel}
          breadcrumbName={item.menuLabel}
          path={item.key}
          component={RenderNav}
        />
      )
    })
    return template
  }

  render() {
    return (
      <Router history={browserHistory}>
        {this.renderBreadcrumb()}
      </Router>
    )
  }
}

export default BreadcrumbNav
