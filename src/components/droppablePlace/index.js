import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {getListStyle,getItemStyle} from '../../helpers/styleFn.js';

const DroppablePlace = ({checkValue}) => {
  return (
    <Droppable droppableId="droppable2">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}>
          {checkValue.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
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