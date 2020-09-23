import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SideBarRender from '../sidebar';
import DroppablePlace from '../droppablePlace';
import {reOrderWithInSampleArea} from '../../helpers/draggableFn';
import {generatedElements} from '../../helpers/generateUiElements';
import './main.css'


class Main extends Component {
    state = {
        items: [{id:'100',content:<button>i'm button</button>},{id:'101',content:<input defaultValue="i'm input"></input>},{id:'102',content:<textarea defaultValue="i'm textarea"/>}],
        checkValue : []
    };

    onDragEnd = result => {
     
        const { source, destination } = result;

        console.log('sourceeeee',source)
        console.log('destination',destination)
      
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if(source.droppableId==='droppable'){
                let reOrderedValue = reOrderWithInSampleArea(this.state.items,source.index,destination.index)
                this.setState({
                    items: reOrderedValue
                })
            }
            else{
                let reOrderedValue = reOrderWithInSampleArea(this.state.checkValue,source.index,destination.index)
                this.setState({
                    checkValue: reOrderedValue
                })
            }
                  
        } else {
            let newHtmlElement = generatedElements(source.index,this.state.checkValue.length);
 
            this.setState(prevState => ({ checkValue: prevState.checkValue.concat(newHtmlElement)}))
        }
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="aside-wrapper">

                <SideBarRender items={this.state.items}/>
                <DroppablePlace checkValue={this.state.checkValue}/>
                
                   
               
                    </div>
            </DragDropContext>
        );
    }
}

 export default Main
