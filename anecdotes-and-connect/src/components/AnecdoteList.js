import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVoting }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVoting(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteForAnecdote(anecdote)
    props.setNotification(`you voted for '${anecdote.content}'`, 5)
  }

  return (
    <>
    {props.anecdotes
    .sort((f,s) => s.votes - f.votes)
    .map(anecdote =>
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleVoting={vote}
      />
    )}
    </>
  )
}

const mapStateToProps = (state) => {
  return{
    anecdotes: state.anecdotes
      .filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  } 
}

const mapDispatchToProps = {
  voteForAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList