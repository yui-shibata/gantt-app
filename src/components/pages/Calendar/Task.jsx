import React from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../util/ItemTypes';

function Task({bar, index, stopDrag, mouseDownResize, mouseResize }) {
  const [{isDragging}, drag] = useDrag(()=> ({
    type: ItemTypes.TASK,
    item:bar,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      getClientOffset:monitor.getClientOffset()
    }),
  }), [bar])
  return (
    bar.list.cat === 'task' && (
      <div
        key={index}
        ref={drag}
        style={{ ...bar.style, opacity: isDragging ? 0.5 : 1, fontSize: 25, fontWeight: 'bold', cursor: 'move',}}
        className="rounded-lg absolute h-5 bg-yellow-100"
      >
        {bar.list.cat === 'task' && (
          <>
            <div className="w-full h-full" style={{ pointerEvents: 'none' }}></div>
            <div
              className="absolute w-2 h-2 bg-gray-300 border border-black"
              style={{ top: '6px', left: '-6px', cursor: 'col-resize' }}
              onMouseDown={(event) => {
                event.stopPropagation();
                mouseDownResize(event, bar, 'left')
              }}
              onMouseMove={(event) => {
                event.stopPropagation();
                mouseResize(event, index)
              }}
              onMouseUp={(event) => stopDrag(event, index)}
            ></div>
            <div
              className="absolute w-2 h-2 bg-gray-300 border border-black"
              style={{ top: '6px', right: '-6px', cursor: 'col-resize' }}
              onMouseDown={(event) => {
                event.stopPropagation();
                mouseDownResize(event, bar, 'right')
              }}
              onMouseMove={(event) => {
                event.stopPropagation();
                mouseResize(event, index)
              }}
              onMouseUp={(event) => stopDrag(event, index)}
            ></div>
          </>
        )}
      </div>
      )
  )
}

export default Task