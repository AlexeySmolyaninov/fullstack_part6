const initialState = {
  msg: '',
  timerID: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'MSG_CREATE':
      return {...state, msg: action.data}
    case 'MSG_CLEAR':
      return {msg: '', timerID: null}
    case 'SET_TIMERID':
      if(state.timerID){
        clearTimeout(state.timerID)
      }
      return {...state, timerID: action.data}
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
    const timerID = setTimeout(
      () => dispatch({type: 'MSG_CLEAR'}),
      durationInSec * 1000
    )
    dispatch({
      type: 'SET_TIMERID',
      data: timerID
    })
  }
}

export default notificationReducer