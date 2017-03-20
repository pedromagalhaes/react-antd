import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'zen/edit/:id',
  getComponent(nextState, next) {
    require.ensure([
      './containers/ZenEditContainer',
      './modules/zenEdit'
    ], (require) => {
      const Zen = require('./containers/ZenEditContainer').default
      const zenReducer = require('./modules/zenEdit').default

      injectReducer(store, {
        key: 'note',
        reducer: zenReducer
      })

      next(null, Zen)
    })
  }
})
