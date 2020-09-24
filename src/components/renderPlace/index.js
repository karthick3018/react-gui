import React, { useEffect,useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SideBarRender from '../sidebar';
import DroppablePlace from '../droppablePlace';
import { reOrderWithInSameArea,reOrderWithOtherArea } from '../../helpers/reOrderFn';
import { generateElement } from '../../helpers/generateUiElements';
import './renderPlace.css'

const initialElements = [
{ id: 'button', content:"Button" },
{ id: 'input', content: "Input Box" },
{ id: 'textarea', content: "Textarea" },
{ id: 'box', content: "Box" },
{ id: 'heading', content: "Heading" }
]

const Main = () => {
    const [sidebarElements, setSideBarElements] = useState(initialElements);
    const [droppedElements, setDroppedElements] = useState([]);

    useEffect(()=>{
       const previousElements = JSON.parse(localStorage.getItem("movedElements"));
       if(previousElements && previousElements?.length){
           setDroppedElements(previousElements);
       }
    },[])

    const onDragEnd = result => {
        const { source, destination,draggableId: selectedElementType } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'sidebar') { //handle drop inside sidebar
                const reOrderedValue = reOrderWithInSameArea(sidebarElements, source.index, destination.index)
                setSideBarElements(reOrderedValue);
            }
            else {
                const reOrderedValue = reOrderWithInSameArea(droppedElements, source.index, destination.index)
                setDroppedElements(reOrderedValue);
            }

        } else { //handle drop into droppable area
            const newHtmlElement = generateElement(selectedElementType, droppedElements.length);
            let valueAfterElementInsertion = reOrderWithOtherArea(droppedElements,destination.index,newHtmlElement);
            setDroppedElements(valueAfterElementInsertion);
             
        };
    }
    
    const handleSave = () => {
      localStorage.setItem('movedElements',JSON.stringify(droppedElements))
    }

    const handleClear = () => {
         setDroppedElements([]);
         localStorage.removeItem('movedElements')
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="render-wrapper">
                <SideBarRender sidebarElements={sidebarElements} />
                <DroppablePlace droppedElements={droppedElements} />
            </div>

               <div className="btn-wrapper">
                 <button onClick={handleSave} className="save-btn">Save</button>
                 <button onClick={handleClear} className="clear-btn">Clear</button>
                </div>
                
        </DragDropContext>
    );
}

export default Main
