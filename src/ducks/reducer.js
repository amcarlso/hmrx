const initialState = {
  user: {}
}

const GET_USER_DATA = 'GET_USER_DATA';
const USER_LOGOUT = 'USER_LOGOUT'

export function getUserData(userInfo) {
  return {
    type: GET_USER_DATA,
    payload: userInfo
  }
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
    payload: initialState
  }
}


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_DATA:
    return Object.assign({}, state, {user: action.payload})
    case USER_LOGOUT:
    return Object.assign({}, initialState);
    default: return state
  }
}