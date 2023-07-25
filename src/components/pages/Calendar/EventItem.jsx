import React from 'react'
import { styled } from 'styled-components'
import { useDrag } from 'react-dnd'


const EventItem = ({event, hour_pix, onDragStart}) => {

  return (
    <Event
      howlong={event.howlong}
      hour_pix={hour_pix}
      fromleft={(event.date.getHours() - 8) * 60 + event.date.getMinutes()}
      bgcolor={event.color}
      onDragStart={() => onDragStart(event.id)}
      draggable
    >
    {event.text}
    </Event>
  )
}

const Event = styled.div`
  display:grid;
  text-align:left;
  background: ${({bgcolor}) => bgcolor || 'darkblue'};
  color: white;
  padding: 2px 5px;
  margin: 5px 0px;
  border-radius: 4px;
  width: ${({ howlong}) => (howlong / (60*24) * 100)}%;
  left: ${({ fromleft }) => fromleft / (60*24) * 100}%;
  position: absolute;
  /* opacity: ${({ isdragging }) => (isdragging ? 0.5 : 1)}; */
  height: 50%;
  text-transform: capitalize;
  cursor:move;
`;



export default EventItem
