import * as React from 'react';
import EditableDisplay from './EditableDisplay'

type args = {
  name: string
  scores: number[]
  dispatch: (...args: any[]) => void
}
export default ({ name, scores, dispatch }: args) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 35
  }}>
    <EditableDisplay>
      {name}
    </EditableDisplay>
    {scores.map((s, i) => (
      <EditableDisplay
        canEdit
        onEndEdit={(e: string) => {
          const nextScores = [...scores]
          nextScores[i] = Number.parseFloat(e)

          dispatch({
            type: "SET_PLAYER_SCORES",
            payload: {
              name,
              scores: nextScores.filter((f) => !Number.isNaN(f))
            }
          })
        }}
      >
        {s}
      </EditableDisplay>
    ))}
    <input
      style={{
        width: 30,
        height: 10,
        marginBottom: 0
      }}
      onKeyPress={(e: any) => {
        if (e.key === 'Enter') {
          const nextScores = [...scores, Number.parseFloat(e.target.value)]
          e.target.value = ''
          dispatch({
            type: "SET_PLAYER_SCORES",
            payload: {
              name,
              scores: nextScores.filter((f) => !Number.isNaN(f))
            }
          })
        }
      }}
      onBlur={(e) => {
        const nextScores = [...scores, Number.parseFloat(e.target.value)]
        e.target.value = ''
        dispatch({
          type: "SET_PLAYER_SCORES",
          payload: {
            name,
            scores: nextScores.filter((f) => !Number.isNaN(f))
          }
        })
      }} type='number'></input>
    <hr style={{ marginTop: -30, marginBottom: 5, backgroundColor: 'black' }}></hr>
    <EditableDisplay>{scores.reduce((acc, n) => acc + n, 0)}</EditableDisplay>
  </div>
)