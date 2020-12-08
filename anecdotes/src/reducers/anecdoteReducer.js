import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      return state.map(anecdote => {
        if(anecdote.id !== action.data.id) {
          return anecdote
        }
        return action.data
      })
    case 'NEW_ANECDOTE':
      const {content, votes, id} = action.data
      return state.concat({
        content,
        votes,
        id
      })
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.increaseAnecdoteVotesByOne(anecdote.id, anecdote.votes)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
  
}

export default anecdoteReducer