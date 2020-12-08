const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'MSG_CREATE':
      return action.data
    case 'MSG_CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (msg, durationInSec) => {
  return async dispatch => {
    dispatch({
      type: 'MSG_CREATE',
      data: msg
    })
    setTimeout(
      () => dispatch({type: 'MSG_CLEAR'}),
      durationInSec * 1000
    )
    
  }
}

export default notificationReducer