import types from './mutation-types'

const mutations = {
  [types.SET_CONTACT_LIST] (state, data) {
    state.contactListData = data;
  },
  [types.SET_CONTACT_DETAIL] (state, data) {
    state.contactDetailData = data;
  }
}

export default mutations
