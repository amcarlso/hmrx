const initialState = {
  id: '',
  name: '',
  username: '',
  email: '',
  admin: ''
}

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(userInfo) {
  return {
    type: UPDATE_USER,
    payload: userInfo
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
    return Object.assign({}, state, {})
    default: return state
  }
}