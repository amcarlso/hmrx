const initialState = {
  user: {},
  employees: {}
}

const GET_USER_DATA = 'GET_USER_DATA';
const CLEAR_USER_DATA = 'CLEAR_USER_DATA'

export function getUserData(userInfo) {
  return {
    type: GET_USER_DATA,
    payload: userInfo
  }
}

export function clearUserData(userInfo) {
  return {
    type: CLEAR_USER_DATA,
    payload: userInfo
  }
}


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_DATA:
    return Object.assign({}, state, {user: action.payload})
    case CLEAR_USER_DATA:
    return initialState;
    default: return state
  }
}