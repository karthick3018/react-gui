import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getSidebarListStyle, getSidebarItemStyle } from '../../helpers/styleFn.js';
import {ReactComponent as Menu} from '../../menu.svg';
import './sidebar.css';

const SideBarRender = ({
    sidebarElements
}) => {
    return (
       <div className="sidebar-wrapper">
        <Droppable droppableId="sidebar">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getSidebarListStyle(snapshot.isDraggingOver)}>
                    {sidebarElements?.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => (
                                <div
                                   className="sidebar-element"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getSidebarItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                      <Menu/>
                                    {item.element}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </div> 
    )
}

export default SideBarRender;