import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'zen/view/:id',
  getComponent(nextState, next) {
    require.ensure([
      './containers/ZenViewContainer',
      './modules/zenView'
    ], (require) => {
      const Zen = require('./containers/ZenViewContainer').default
      const zenReducer = require('./modules/zenView').default

      injectReducer(store, {
        key: 'note',
        reducer: zenReducer
      })

      next(null, Zen)
    })
  }
})
