import React, { useEffect,useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SideBarRender from '../sidebar';
import DroppablePlace from '../droppablePlace';
import { reOrderWithInSampleArea } from '../../helpers/draggableFn';
import { generatedElements } from '../../helpers/generateUiElements';
import './main.css'

const initialElements = [{ id: 'button', content:"Button" },
{ id: 'input', content: "Input Box" },
{ id: 'textarea', content: "Textarea" }
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
        const { source, destination,draggableId } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'sidebar') {
                const reOrderedValue = reOrderWithInSampleArea(sidebarElements, source.index, destination.index)
                setSideBarElements(reOrderedValue);
            }
            else {
                const reOrderedValue = reOrderWithInSampleArea(droppedElements, source.index, destination.index)
                setDroppedElements(reOrderedValue);
            }

        } else {
            const newHtmlElement = generatedElements(draggableId, droppedElements.length);
            setDroppedElements(prevState => {
                return [...prevState, ...newHtmlElement];
            });
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
            <div className="aside-wrapper">
                <SideBarRender sidebarElements={sidebarElements} />
                <DroppablePlace droppedElements={droppedElements} />
            </div>

               <div className="btn-wrap">
                 <button onClick={handleSave} className="save-btn">Save</button>
                 <button onClick={handleClear} className="clear-btn">Clear</button>
                </div>
                
        </DragDropContext>
    );
}

export default Main
