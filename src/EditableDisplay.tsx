import React, { useEffect, useState } from 'react'


type args = React.PropsWithChildren<{
  onStartEdit?: (e: any) => void,
  onEndEdit?: (e: any) => void,
  canEdit?: boolean
  startEditing?: boolean
}>

export default ({ onEndEdit, onStartEdit, canEdit, startEditing, children }: args) => {
  const [editing, setEditing] = useState(false)

  if (!canEdit || !editing) {
    return (
      <span onClick={(e) => {
        if (!editing && canEdit) setEditing(true)
        if (!editing && canEdit && onStartEdit) onStartEdit(e)
      }
      }>
        {children}
      </span>
    )
  } else {
    return <input style={{
      width: 30,
      height: 10,
      marginBottom: 0
    }}
      onKeyPress={(e: any) => {
        if (e.key === 'Enter' && onEndEdit) {
          onEndEdit(e.target.value)
          e.target.blur()
        }
      }}
      onBlur={(e) => {
        setEditing(false)
        if (onEndEdit) onEndEdit(e.target.value)
      }} type='number'></input>
  }
}