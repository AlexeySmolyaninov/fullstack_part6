const filterReducer = (state = '', action) => {
  switch(action.type){
    case 'CHANGE_FILTER':
      return action.data
    default:
      return state
  }
}

export const changeFilter = (value) => ({
  type: 'CHANGE_FILTER',
  data: value
})

export default filterReducer