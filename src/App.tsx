import React, { Ref, RefObject, useReducer, useState } from 'react';
import Row from './Row'

type PlayerState = Record<string, number[]>
type Action<T extends any> = {
  type: string,
  payload: T
}

function App() {
  const nameInputRef = React.useRef<HTMLInputElement>()
  const [state, dispatch] = useReducer((state: PlayerState, action: Action<any>) => {
    console.log(action, state)
    switch (action.type) {
      case "ADD_PLAYER": {
        return Object.assign({}, state, { [action.payload]: [] }) as PlayerState
      }
      case "SET_PLAYER_SCORES": {
        return Object.assign({}, state, { [action.payload.name]: action.payload.scores })
      }
      case "RESET": {
        return {}
      }
      default: {
        return state
      }
    }
  }, {
  })

  const AddPlayerHandler: React.FormEventHandler<HTMLFormElement> = React.useCallback((e) => {
    e.preventDefault()
    if (nameInputRef.current?.value !== '') dispatch({
      type: "ADD_PLAYER",
      payload: nameInputRef.current?.value
    })
    if (nameInputRef.current) nameInputRef.current.value = ''
  }, [])

  return (
    <>

      <main>
        <header>Simple Scorecard</header>
        <form onSubmit={AddPlayerHandler}>
          <input ref={nameInputRef as any} type='text'></input>
          <button type='submit'>Add A Player</button>
        </form>
        <br />
        <form style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: 30
        }}>
          {Object.entries(state).map(([player, scores]) => (<Row name={player} scores={scores} dispatch={dispatch} />))}
        </form>
        <button onClick={() => dispatch({ type: "RESET", payload: null })}>Reset</button>
      </main>
    </>
  );
}

export default App;
