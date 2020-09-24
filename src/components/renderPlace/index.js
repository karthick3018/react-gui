import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SideBarRender from '../sidebar';
import DroppablePlace from '../droppablePlace';
import { reOrderWithInSameArea, reOrderWithOtherArea } from '../../helpers/reOrderFn';
import { generateElement } from '../../helpers/generateUiElements';
import './renderPlace.css'

const initialElements = [
    { id: 'button', element: "Button" },
    { id: 'input', element: "Input Box" },
    { id: 'textarea', element: "Textarea" },
    { id: 'box', element: "Box" },
    { id: 'heading', element: "Heading" }
]

const RenderPlace = () => {
    const [sidebarElements, setSideBarElements] = useState(initialElements);
    const [droppedElements, setDroppedElements] = useState([]);

    useEffect(() => {
        const previousElements = JSON.parse(localStorage.getItem("movedElements"));
        if (previousElements && previousElements?.length) {
            setDroppedElements(previousElements);
        }
    }, [])

    const onDragEnd = result => {
        const { source, destination, draggableId: selectedElementType } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            let reOrderedValue;
            if (source.droppableId === 'sidebar') { 
                //handle drop inside sidebar
                reOrderedValue = reOrderWithInSameArea(sidebarElements, source.index, destination.index)
                setSideBarElements(reOrderedValue);
            }
            else {
                reOrderedValue = reOrderWithInSameArea(droppedElements, source.index, destination.index)
                setDroppedElements(reOrderedValue);
            }

        } else { 
            //handle drop into droppable area
            const newHtmlElement = generateElement(selectedElementType, droppedElements.length);
            let valueAfterElementInsertion = reOrderWithOtherArea(droppedElements, destination.index, newHtmlElement);
            setDroppedElements(valueAfterElementInsertion);

        };
    }

    const handleSave = () => {
        if(droppedElements?.length){
            localStorage.setItem('movedElements', JSON.stringify(droppedElements))
            alert('Elements Saved!')
        }
       
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

export default RenderPlace
