import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SideBarRender from '../sidebar';
import DroppablePlace from '../droppablePlace';
import {reOrderWithInSampleArea} from '../../helpers/draggableFn';
import {generatedElements} from '../../helpers/generateUiElements';
import './main.css'

const initialElements = [{id:'100',content:<button>i'm button</button>},
                         {id:'101',content:<input defaultValue="i'm input"></input>},
                         {id:'102',content:<textarea defaultValue="i'm textarea"/>}
                        ]

const Main = ()=> { 
    const [sidebarElements,setSideBarElements] = useState(initialElements);
    const [droppedElements,setDroppedElements] = useState([])

   const onDragEnd = result => {
        const { source, destination } = result;
      
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if(source.droppableId==='droppable'){
                let reOrderedValue = reOrderWithInSampleArea(sidebarElements,source.index,destination.index)
                setSideBarElements(reOrderedValue);
            }
            else{
                let reOrderedValue = reOrderWithInSampleArea(droppedElements,source.index,destination.index)
                setDroppedElements(reOrderedValue);
            }
                  
        } else {
            let newHtmlElement = generatedElements(source.index,droppedElements.length);
            setDroppedElements(prevState => {
                return [...prevState, ...newHtmlElement];
            });
    };
}

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="aside-wrapper">

                <SideBarRender sidebarElements={sidebarElements}/>
                <DroppablePlace droppedElements={droppedElements}/>
                
                   
               
                    </div>
            </DragDropContext>
        );
    } 

 export default Main
