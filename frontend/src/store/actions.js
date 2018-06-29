import axios from 'axios'
import types from './mutation-types'
import {getContextPath} from '../utils/utils'

const actions = {
  [types.GET_CONTACT_LIST] ({commit}, params){
    let url = ""
    if (params.order === "descending") {
      url ='/users?page='+params.page+'&limit='+params.limit+'&sort='+params.sort+'&filter='+params.filter+'&descend=true'
    } else {
      url ='/users?page='+params.page+'&limit='+params.limit+'&sort='+params.sort+'&filter='+params.filter
    }
    axios.get(getContextPath()+url)
    .then(function(res){
      commit('SET_CONTACT_LIST', res.data);
    })
    .catch(function(err){
      console.log(err);
    })
  },
  [types.GET_CONTACT_DETAIL] ({commit}, UserID){
    axios.get(getContextPath()+'/users/'+UserID)
    .then(function(res){
      commit('SET_CONTACT_DETAIL', res.data);
      console.log(res.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }
}

export default actions
