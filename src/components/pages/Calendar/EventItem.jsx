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
  margin: 5px 0px;
  border-radius: 4px;
  width: ${({ howlong}) => `calc(${howlong / 60 * 100}% + ${howlong / 60}px)`};
  left: ${({ fromleft }) => fromleft / 60 * 100}%;
  position: absolute;
  height: 80%;
  text-transform: capitalize;
  cursor:move;
  z-index:1;
`;



export default EventItem
