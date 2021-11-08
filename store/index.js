import { Store } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// import modules
import cartModule from './modules/cart'
import authModule from './modules/auth'

const createStore = () => {
  return new Store({
    state: () => ({
      pageTitle: '',
      innerMenuIsOpened: false,
      innerMenus: [],
      businessGroupMenu: [],
      // S E C U R I T Y - D E T A I L S
      appBootingErrors: null,
      authErrors: null,
    }),
    getters,
    mutations,
    actions,
    modules: {
      cartModule,
      authModule,
    },
  })
}

export default createStore
