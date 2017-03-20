import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'zen/new',
  getComponent(nextState, next) {
    require.ensure([
      './containers/ZenNewContainer',
      './modules/zenNew'
    ], (require) => {
      const Zen = require('./containers/ZenNewContainer').default
      const zenReducer = require('./modules/zenNew').default

      injectReducer(store, {
        key: 'zen-new',
        reducer: zenReducer
      })

      next(null, Zen)
    })
  }
})
