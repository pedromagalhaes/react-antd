import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux'
import enUS from 'antd/lib/locale-provider/en_US'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory}>{routes}</Router>
          </div>
        </LocaleProvider>
      </Provider>
    )
  }
}

export default AppContainer
