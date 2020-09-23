import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './main.css'

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class Main extends Component {
    state = {
        items: [{id:'100',content:<button>i'm button</button>},{id:'101',content:<input defaultValue="i'm input"></input>},{id:'102',content:<textarea defaultValue="i'm textarea"/>}],
        checkValue : []
    };


    onDragEnd = result => {
     
        const { source, destination } = result;

        console.log('sourceeeee',source)
        console.log('destination',destination)
        
      

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if(source.droppableId==='droppable'){
                let existingState = [...this.state.items];
                const [movedElement] = existingState.splice(source.index,1)
                existingState.splice(destination.index, 0, movedElement);
                this.setState({
                    items: existingState
                })
            }
            else{
                let existingState = [...this.state.checkValue];
                const [movedElement] = existingState.splice(source.index,1)
                existingState.splice(destination.index, 0, movedElement);
                this.setState({
                    checkValue: existingState
                })
            }
                  
        } else {
            //index - 0 -> button
            //index - 1 -> input box
            //index - 2 -> text area
            let buffer = [];
            if(source.index === 0){
                buffer.push({id:'200',content:<button>I'm button</button>});
            }
            else if (source.index === 1){
                buffer.push({id:'201',content:<input defaultValue="I'm input"></input>});
            }
            else if (source.index === 2){
                buffer.push({id:'202',content:<textarea defaultValue="I'm text area"/>});
            }
             
            this.setState(prevState => ({ checkValue: prevState.checkValue.concat(buffer)}))
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="aside-wrapper">
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                               {this.state.items.map((item, index) => (
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

                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.checkValue.map((item, index) => (
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
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                    </div>
            </DragDropContext>
        );
    }
}

 export default Main
