import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {  getDraggableItemStyle } from '../../helpers/styleFn.js';
import './droppable.css'

const DroppablePlace = ({ droppedElements }) => {
  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          className="droppable-wrapper"
          ref={provided.innerRef}
          // style={getDraggableListStyle(snapshot.isDraggingOver)}
          >
          {droppedElements.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}>
              {(provided, snapshot) => (
                <div
                  className="droppable-element"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getDraggableItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}>
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  )
}

export default DroppablePlace;